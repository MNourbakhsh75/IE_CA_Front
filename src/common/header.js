import React, { Component } from 'react';
import '../style/header.scss'
import { Navbar,Nav } from 'react-bootstrap';
import logo from '../assets/logo/logo v2.png'

const message = {
    account : 'حساب کاربری',
    exit : 'خروج'
}

class Header extends Component {
    render(){
        return(
            <Navbar className="navbar" expand="md" sticky="top">
                <Navbar.Brand className="logo" href="home"><img alt="logo icon" src={logo}/></Navbar.Brand>
                <Nav className="nav">
                    <Nav.Link className="navObject account" href="#home">{message.account}</Nav.Link>
                    <Nav.Link className="navObject exit" href="#link">{message.exit}</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Header