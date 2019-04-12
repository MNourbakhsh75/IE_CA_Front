import React, { Component } from 'react';
import '../style/home.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {
    Card,
    Form,
    InputGroup,
    Row,
    Button,
    Col,
    Image
} from 'react-bootstrap'

const vars = {
    title : 'جاب‌اونجا خوب است!',
    placeholder: 'جست‌وجو در جاب‌اونجا‌',
    btn: 'جست‌وجو'
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                است.چاپگرها و متون بلکه
                روزنامه و مجله در ستون و سطرآنچنان که لازم است.
            </Row>
        );
    }
}

class SkillNameBox extends Component{
    render(){
        return(
            <div className="skill-box-name">
                HTML
            </div>
        );
    }
}

class SearchBar extends Component{
    render(){
        return(
            <Form className="search-form">
                <Form.Row>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder={vars.placeholder}
                            aria-describedby="inputGroupAppend"
                        />
                        <InputGroup.Append>
                            <Button className="search-button">{vars.btn}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Row>
            </Form>
        );
    }
}

class ProjectCard extends Component{
    render(){
        return(
            <Card className="project-card">
                <Row className="main-row">
                    <Col lg={3} md={5} xs={6} className="image-col">
                    <Image src="https://cdn4.vectorstock.com/i/1000x1000/31/48/software-developer-and-programmer-vector-10673148.jpg"/>
                    </Col>
                    <Col lg={9} md={7} xs={6} className="info-col">
                    <Row className="title-time">
                        <Col lg={7} md={7} className="title">
                            طراحی سایت دیجی کالا
                            طراحی سایت دیجی کالا
                            طراحی سایت دیجی کالا

                        </Col>
                        <Col lg={4} md={5} className="time">
                            <span>
                            زمان باقی مانده: ۱۷:۲۵
                            </span>
                        </Col>
                    </Row>
                    <Row className="project-desc">
                        یک فروشگاه اینرنتی با قابلیت مدیریت حرفه ای سبد خرید حرفه ای مقایسه محصولات ارسال پیامک و ایمیل گزارش گیری جامع قالب...
                    </Row>
                    <Row className="budget">
                        بودجه: ۲۵۰۰۰۰۰ تومان
                    </Row>
                    <Row className="skills">
                        <div className="skill-label">مهارت‌ها: </div>
                        <SkillNameBox/>
                        < SkillNameBox/>
                        < SkillNameBox/>
                        < SkillNameBox/>
                    </Row>
                    </Col>
                </Row>
            </Card>
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
                    <TitleDesc/>
                    <SearchBar/>
                </div>
                <div className="projects">
                    <ProjectCard/>
                    < ProjectCard/>
                    < ProjectCard/>
                    < ProjectCard/>
                    < ProjectCard/>
                    < ProjectCard/>
                </div>
            </div>
                <Footer/>
            </div>
        );
    }
}

export default Home