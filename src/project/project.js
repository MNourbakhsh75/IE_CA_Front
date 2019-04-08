import React, { Component } from 'react';
import '../style/project.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {Jumbotron ,Container, Row ,Col,Image,Button} from 'react-bootstrap'
import '../assets/my-icons-collection/font/flaticon.css'
const vars = {
    projectImage : 'https://cdn4.vectorstock.com/i/1000x1000/31/48/software-developer-and-programmer-vector-10673148.jpg',
    title : 'پروژه طراحی سایت جاب‌اونجا',
    time : 'زمان باقی مانده:',
    budget: 'بودجه:',
    desc: 'توضیحات',
    skill: 'مهارت‌های لازم:',
    bidTitle: 'ثبت پیشنهاد',
    bidPlaceHolder: 'پیشنهاد خود را وارد کنید'
}
class TopBar extends Component {
    render(){
        return(
            <div className="blueLine"></div>
        );
    }
}

class SkillBox extends Component {
    render(){
        return(
            <div className="skill-box">
                <div className="skill-box-child name">
                    HTML
                    </div>
                <div className="skill-box-child point">
                    5
                </div>
            </div>
        );
    }
}

class Bid extends Component {
    render(){
        return (
            <Row className="bid-project">
                <div className="bidAmount">
                <input
                    type="text"
                    value=""
                    placeholder= {vars.bidPlaceHolder}
                />
                <span className="unit">تومان</span>
                </div>
                <Button variant="info">ارسال</Button>
            </Row>
        );
    }
}

class BidStatusTitle extends Component {
    render(){
        return <Row className="statTitle">{vars.bidTitle}</Row>;
    }
}
class ProjectContainer extends Component {
    render(){
        return(
            <Jumbotron className="projectContainer align-items-center">
                <Container fluid className="cont">
                    <Row className="info">
                        <Col lg={4} md={6} className="profile">
                            {/* <div className="picture"></div> */}
                            <Image src={vars.projectImage} fluid></Image>
                        </Col>
                        <Col  lg={8} md={6} className="projectInf">
                        <Row className="title">{vars.title}</Row>
                        <Row className="time"><span className="flaticon-deadline"></span>
                        <span className="text">
                        {vars.time}
                        </span>
                        </Row>
                        <Row className="budget">
                            <span className="flaticon-money-bag"></span>
                            <span className="text">
                                {vars.budget}
                            </span>
                        </Row>
                        <Row className="winner" hidden>
                            <span className="flaticon-check-mark"></span>
                            <span className="text">
                                خروو
                            </span>
                        </Row>
                        <Row className="desc">{vars.desc}</Row>
                        <Row className="desc-text">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                            است. چاپگرها و متون بلکه
                            روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                            است. چاپگرها و متون بلکه
                            روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                        </Row>
                        </Col>  
                    </Row>
                </Container>
                <Container fluid className="skill-container">
                    <Row className="skill-name">
                        {vars.skill}
                    </Row>
                    <Row className="skills">
                        <SkillBox/>
                        <SkillBox />
                        <SkillBox />
                    </Row>
                </Container>
                <Container fluid className="status-container">
                    <BidStatusTitle/>
                    <Bid/>
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