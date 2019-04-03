import React, { Component } from 'react';
import '../style/header.scss'
import { Navbar } from 'react-bootstrap';
import logo from '../assets/logo/logo v2.png'

const message = {
    account : 'حساب کاربری',
    exit : 'خروج'
}
// class Logo extends Component {
//     render(){
//         return(
//             <div className="logo">
//                 <a href="/"><img src={logo} alt="LOGO" className="logoPic"/></a>
//             </div>
//         );
//     }
// }

class Header extends Component {
    render(){
        return(
            <Navbar className="nav" expand="lg">
                <Navbar.Brand href="#home"><img alt="logo icon" src={logo}/></Navbar.Brand>
                <Navbar.Brand href="#account">{message.account}</Navbar.Brand>
                <Navbar.Brand href="#exit">{message.exit}</Navbar.Brand>
            </Navbar>
        );
    }
}

export default Header