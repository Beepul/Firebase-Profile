import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const initialState = {
    fullName : '',
    email: '',
    password:'',
    c_password: ''

}
const Sign = () => {
    const [data,setData] = useState(initialState);
    const [errors,setErrors] = useState({})

    const navigate = useNavigate();
   

    const {fullName,email,password,c_password} = data;

    const handleChange = (e) => {
        setData({...data,[e.target.name]: e.target.value})
    }

    const validate = () => {
		let errors = {};
		if (!fullName) {
			errors.fullName = 'please fill name';
		}
		if (!email) {
			errors.email = 'please fill email';
		}
		if (!password) {
			errors.password = 'please fill info';
		}
		if (!c_password) {
			errors.c_password = 'please fill contact';
		}
        if (c_password !== password) {
			errors.pass_match = 'password is not matching';
		}
		return errors;
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = validate();
        if(Object.keys(error).length){
            setErrors(error)
        }else{
            try{
                createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate('/login')
    // ...
  })
  .catch((err)=> {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode,errorMessage)
  })
            }catch(error){
                console.log(error)
            }
        }
    }
  return (
    <Container>
        <div className='title'>
        <h2>Sing Up</h2>
        </div>
        <div className='form__con'>
         <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Enter Full Name" 
        name='fullName'
        onChange={handleChange}
        />
        <Form.Text className="text-muted">{errors.fullName ? errors.fullName : null}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        name='email'
        onChange={handleChange}
        />
        <Form.Text className="text-muted">{errors.email ? errors.email : null}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password"
        name='password' 
        onChange={handleChange}
        />
        <Form.Text className="text-muted">{errors.password ? errors.password : null}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Confirm Password" 
        name='c_password'
        onChange={handleChange}
        />
        <Form.Text className="text-muted">{errors.c_password || errors.pass_match ? errors.c_password || errors.pass_match : null}</Form.Text>
      </Form.Group>
      <Button className='mt-3' variant="secondary" type="submit">
        Register
      </Button>
    </Form>
        </div>
    </Container>
  )
}

export default Sign