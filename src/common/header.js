import React, { Component } from 'react';
import '../style/header.scss'
import { Navbar,Nav } from 'react-bootstrap';
import logo from '../assets/logo/logo v2.png'

const message = {
    account : 'حساب کاربری',
    exit : 'خروج'
}

class Header extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }
    handleClick = () =>{
        console.log('clicked')
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUser")
    }
    render(){
        let href = `../user?id=${localStorage.getItem("loggedInUser")}`
        return(
            <Navbar className="navbar" expand="md" sticky="top">
                <Navbar.Brand className="logo" href="../home"><img alt="logo icon" src={logo}/></Navbar.Brand>
                <Nav className="nav">
                    <Nav.Link className="navObject account" href={href}>{message.account}</Nav.Link>
                    <Nav.Link className="navObject exit" onClick={this.handleClick} href="../login">{message.exit}</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default Header