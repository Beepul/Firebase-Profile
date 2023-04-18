import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { db, storage } from '../firebase';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"; 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams } from 'react-router-dom';

const initialState = {
	name: '',
	email: '',
	info: '',
	contact: ''
};

const AddEditUser = () => {
	const [ data, setData ] = useState(initialState);
	const { name, email, info, contact } = data;
	//to check file uploaded or not
	const [ file, setFile ] = useState(null);
	const [ progress, setProgress ] = useState(null);
	const [ error, setError ] = useState({});
	const [ isSubmit, setIsSubmit ] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        id && getSingleUser();
    },[id])
	
    const getSingleUser = async () => {
        const docRef = doc(db,'users',id);
        const snapshot = await getDoc(docRef);
        console.log(snapshot)
        if(snapshot.exists){
            setData({...snapshot.data()});
        }
    }
    useEffect(()=>{
       const uploadFile = () => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',(snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
            },(error)=> {
                console.log(error);
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setData((prev)=> ({...prev, img:downloadURL}));
                  });
            })
       }
       file && uploadFile()
    },[file])

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let errors = {};
		if (!name) {
			errors.name = 'please fill name';
		}
		if (!email) {
			errors.email = 'please fill email';
		}
		if (!info) {
			errors.info = 'please fill info';
		}
		if (!contact) {
			errors.contact = 'please fill contact';
		}
		return errors;
	};
	const handleSubmit =  async (e) => {
		e.preventDefault();
		let errors = validate();
		if (Object.keys(errors).length){
            setError(errors);
        } 
        if(!id){
            try{
                setIsSubmit(true);
                    await addDoc(collection(db, "users"),{
                        ...data,
                        timestamp: serverTimestamp()
                    })
                setIsSubmit(false);
                setData(initialState);
            }catch(error){
                console.log(error);
                setIsSubmit(false)
            }
        }else{
            try{
                setIsSubmit(true);
                    await updateDoc(doc(db, "users", id),{
                        ...data,
                        timestamp: serverTimestamp()
                    })
                setIsSubmit(false);
                setData(initialState);
            }catch(error){
                console.log(error);
                setIsSubmit(false)
            }
            navigate('/')
        }
        
	};
	return (
		<Container>
			{isSubmit ? (
				<div className='loader__con'>
                <div class="custom-loader"></div>
              </div>
			) : (
                <>
                <div className='title'>
                <h2>{id ? "Update User" : "Add User"}</h2>
                </div>
                <div className='form__con'>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Name </Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Your Name"
							autoFocus
							name="name"
							value={name}
							onChange={handleChange}
						/>
						<Form.Text className="text-muted">{error.name ? error.name : null}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							name="email"
							value={email}
							onChange={handleChange}
						/>
						<Form.Text className="text-muted">{error.email ? error.email : null}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Information </Form.Label>
						<Form.Control
                        as="textarea"
							type="text"
							placeholder="Enter Your Description"
							name="info"
							value={info}
							onChange={handleChange}
						/>
						<Form.Text className="text-muted">{error.info ? error.info : null}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Contact </Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter Your Contact Number"
							name="contact"
							value={contact}
							onChange={handleChange}
						/>
						<Form.Text className="text-muted">{error.contact ? error.contact : null}</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Upload </Form.Label>
						<Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
					</Form.Group>
					<Button className='mt-3' variant="secondary" type="submit" disabled={progress !==null && progress <100}>
						Submit
					</Button>
				</Form>
                </div>
                </>
			)}
		</Container>
	);
};

export default AddEditUser;
