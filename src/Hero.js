import React, { useState } from 'react'
import fire from 'firebase'
import FlatList from 'flatlist-react'
import Profile from './Profile'
import {Button, Navbar, NavDropdown, Nav, Form, FormControl, ListGroup, ListGroupItem} from "react-bootstrap"
import Users from './Users'
import Home from './Home'
import "./Hero.css"
function Hero({handleLogout}) {

    const [users, setUsers] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const [showUserAd, setShowUserAdd] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const [uid, setUid] = useState("")
     
    function renderProfile() {
        
        setShowComponent(true)
    }

    const fetchUsers = (search) => {
        
        fire.firestore()
        .collection('users')
        .where('first_name', '==', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{
                    id, ...data
                }
            });
            console.log(users)
            setUsers(users);
        })
    }
    return (
        <div className="heroDiv">
        <div>
            <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
                <Navbar.Brand href="#home">Admin Section</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home" onClick={() => {
                        setShowHome(true);
                        setShowComponent(false);
                        setShowUserAdd(false);
                        setUsers([])
                    }}>Home</Nav.Link>
                    <Nav.Link href="#link" onClick={() => {
                        setShowHome(false)
                        setShowComponent(false);
                        setUsers([])
                        setShowUserAdd(true)
                    }}>User-Adjustments</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl style={{paddingRight: 10}} type="text" placeholder="Search User Details" onChange={(e) => fetchUsers(e.target.value)} className="mr-sm-2 form-control" />
                    
                    
                    <ListGroup className="list-group">
                    {users.map((user)=> <ListGroupItem  style={{marginRight: 20}} className="li" onClick={() => {
                        setUid(user.id);
                        setShowUserAdd(false)
                        setShowHome(false)
                        renderProfile()
                    }}>{user.first_name} {user.last_name}</ListGroupItem>)}
                    </ListGroup>
                    </Form>
                    <Button variant="primary" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Navbar>
                
            {showHome ? <Home /> : null}
            {showUserAd ? <Users/> : null}
            {showComponent ? <Profile uid={uid}/> : null}
            
        </div>
        </div>
    )
}

export default Hero;
