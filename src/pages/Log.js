import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducer/authSlice';
import { useNavigate } from 'react-router-dom';

const Log = () => {
	const [ data, setData ] = useState({
		email: '',
		password: ''
	});
	const [ errors, setErrors ] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const validate = () => {
		let errors = {};
		if (!data.email) {
			errors.email = 'please fill email';
		}
		if (!data.password) {
			errors.password = 'please fill password';
		}
		return errors;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let errors = validate();
		if (Object.keys(errors).length) {
			setErrors(errors);
		} else {
			try {
				signInWithEmailAndPassword(auth, data.email, data.password)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
            console.log(user)
            const uid = user.uid;
            const email = user.email;
            const password = user.reloadUserInfo.passwordHash;
            const accessToken = user.stsTokenManager.accessToken;
            const refreshToken = user.stsTokenManager.refreshToken;
            const userData = {uid,email,password,accessToken,refreshToken};

            // const {reloadUserInfo,stsTokenManager} = user;
						// console.log(reloadUserInfo,stsTokenManager);
            // const userData = {reloadUserInfo,stsTokenManager};
            dispatch(login(userData))
            navigate('/')
          
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log(errorCode, errorMessage);
					});
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Container>
			<div className='title'>
				<h2>Log In</h2>
			</div>
			<div className='form__con'>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
					<Form.Text className="text-muted">{errors.email ? errors.email : null}</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
					<Form.Text className="text-muted">{errors.password ? errors.password : null}</Form.Text>
				</Form.Group>
				<Button className='mt-3' variant="secondary" type="submit">
					Log In
				</Button>
			</Form>
			</div>
		</Container>
	);
};

export default Log;
