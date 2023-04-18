import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const ModalComp = ({show,setShow,handleClose,user,setUsers,users}) => {
  const {img,name,info,email,contact,id} = user;
  const isLoggedin = useSelector(state => state.auth.isLoggedin);
  const currentUser = useSelector(state => state.auth.user);
  
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure?')){
      try{
        setShow(false)
        await deleteDoc(doc(db, "users", id));
        setUsers(users.filter((u) => u.id !== id));
      }catch(err){
        console.log(err)
      }
    }
  }
 
  return (
   <>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>{name}'s Detail</Modal.Title>
    </Modal.Header>
    <Card.Img variant="top" src={img} />
    <Modal.Body>
    <Card.Title>{name}</Card.Title>
        <Card.Text>
          {email}
        </Card.Text>
        <Card.Text>
          {info}
        </Card.Text>
        <Card.Text>
          {contact}
        </Card.Text>
    </Modal.Body>
    <Modal.Footer>
      {isLoggedin && currentUser ? 
      <Button variant="danger" onClick={()=>handleDelete(id)}>Delete</Button>
    : null  
    }
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
   </>
  )
}

export default ModalComp