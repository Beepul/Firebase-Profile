import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducer/authSlice'
import { LinkContainer } from 'react-router-bootstrap'

const NavBar = () => {
  const {isLoggedin, user} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <LinkContainer to={'/'}>
        <Navbar.Brand >CRUD-Profile</Navbar.Brand>
    </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mx-auto">
        {isLoggedin && user ? 
        <>
        <LinkContainer to={'/'}>
            <Nav.Link>Home</Nav.Link>
        </LinkContainer>
            <LinkContainer to={'/add'}>
              <Nav.Link >Add User</Nav.Link>
            </LinkContainer>
            </>
            :
           null
          }
        </Nav>
        <Nav>
          {isLoggedin && user ?
          <>
          <Navbar.Text>
            Mr.{user.email}
          </Navbar.Text>
          <LinkContainer to={'/'} onClick={handleLogout}>
          <Nav.Link >Log Out</Nav.Link>
          </LinkContainer> 
          </>
          : 
          <>
          <LinkContainer to={'/signup'}>
          <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
          <LinkContainer to={'/login'}>
          <Nav.Link  >Log In</Nav.Link>
          </LinkContainer>
          </>
        }
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    // <Navbar bg="light" expand="lg">
    //   <Container>
    //     <LinkContainer to={'/'}>
    //     <Navbar.Brand >CRUD-Profile</Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="mx-auto">
    //         <LinkContainer to={'/'}>
    //         <Nav.Link>Home</Nav.Link>
    //         </LinkContainer>

    //         {isLoggedin && user ? 
    //         <>
    //         <LinkContainer to={'/add'}>
    //           <Nav.Link >Add User</Nav.Link>
    //         </LinkContainer>
    //         <LinkContainer to={'/'} onClick={handleLogout}>
    //         <Nav.Link >Log Out</Nav.Link>
    //         </LinkContainer>
    //         </>
    //         :
    //         <>
    //         <LinkContainer to={'/signup'}>
    //         <Nav.Link>Sign Up</Nav.Link>
    //         </LinkContainer>
    //         <LinkContainer to={'/login'}>
    //         <Nav.Link  >Log In</Nav.Link>
    //         </LinkContainer>
    //         </>
    //       }
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  )
}

export default NavBar