import React, { Component } from 'react';
import '../style/home.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {Jumbotron ,Container, Row ,Col,Image,Button} from 'react-bootstrap'

const vars = {
    title : 'جاب‌اونجا خوب است!'
}

class TopBar extends Component {
    render(){
        return(
            <div className="blueLine"></div>
        );
    }
}

class Title extends Component{
    render(){
        return(
            <Row className="home-title">
                {vars.title}
            </Row>
        );
    }
}
class TitleDesc extends Component{
    render(){
        return(
            <Row className="home-title-desc">
                {vars.title}
            </Row>
        );
    }
}
class SearchBar extends Component{
    render(){
        return(
            <div className="">

            </div>
        );
    }
}


class Home extends Component {
    render(){
        return(
            <div className="home">
            <Header/>
            <div className="content">
                <div className="blueLine">
                    <Title/>

                </div>
            </div>
            <Footer/>
            </div>
        );
    }
}

export default Home