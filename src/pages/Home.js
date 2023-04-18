import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalComp from '../components/ModalComp';

const Home = ({isLoggedin,user}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () =>{
    setSelectedUser(null)
    setShow(false);
  }
  const handleShow = (user) => {
    setSelectedUser(user)
    setShow(true);
  }

    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);
           const unsub = onSnapshot(collection(db, 'users'),(snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc)=> {
                list.push({id: doc.id , ...doc.data()})
            })
            setUsers(list);
            setLoading(false);
           },(error)=> {
            console.log(error);
           });
           return () => {
            unsub();
           }
    },[])
  return (
    <>
    {loading ?
    <div className='loader__con'>
      <div class="custom-loader"></div>
    </div>
    :
    <Container className='d-flex flex-wrap gap-5 my-5'>
        {users.map((item, index) => (
        <Card key={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={item.img} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Button className='me-3' variant="dark" onClick={()=>handleShow(item)}>View</Button>
        {isLoggedin && user ?
        <Button variant="dark" onClick={()=> navigate(`/update/${item.id}`)}>Update</Button>
        : null
        }
      </Card.Body>
    </Card>
        ))}
        {selectedUser && (
                <ModalComp show={show} setShow={setShow}  handleClose={handleClose} setUsers={setUsers} users={users} user={selectedUser}/>
        )}
    </Container>
    }
    </>
  )
}

export default Home