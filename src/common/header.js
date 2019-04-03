import React, { Component } from 'react';
import '../style/header.scss'
import { Navbar } from 'react-bootstrap';

const message = {
    account : 'حساب کاربری',
    exit : 'خروج'
}

class Header extends Component {
    render(){
        return(
            <Navbar className="nav" expand="lg">
                <Navbar.Brand href="#home">{message.account}</Navbar.Brand>
                <Navbar.Brand href="#exit">{message.exit}</Navbar.Brand>
            </Navbar>
        );
    }
}

export default Header