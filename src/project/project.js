import React, { Component } from 'react';
import '../style/project.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {Jumbotron ,Container, Row ,Col,Image} from 'react-bootstrap'

const vars = {
    projectImage : 'https://cdn4.vectorstock.com/i/1000x1000/31/48/software-developer-and-programmer-vector-10673148.jpg',
    title : 'پروژه طراحی سایت جاب‌اونجا'
}
class TopBar extends Component {
    render(){
        return(
            <div className="blueLine"></div>
        );
    }
}

class ProjectContainer extends Component {
    render(){
        return(
            <Jumbotron className="projectContainer align-items-center">
                <Container fluid className="cont">
                    <Row className="info">
                        <Col xs={6} md={4} className="profile">
                            <Image src={vars.projectImage} fluid></Image>
                        </Col>
                        <Col xs={6} md={8} className="projectInf">
                        <span className="title">{vars.title}</span>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}

class project extends Component {
    render(){
        return(
            <div className="project">
                <Header/>
                <TopBar/>
                <ProjectContainer/>
                <Footer/>
            </div>
        );
    }
}

export default project