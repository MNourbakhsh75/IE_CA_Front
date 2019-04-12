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
    Image,
} from 'react-bootstrap'

const vars = {
    title : 'جاب‌اونجا خوب است!',
    placeholder: 'جست‌وجو در جاب‌اونجا‌',
    btn: 'جست‌وجو',
    UserSearch: 'جست‌وجوی نام کاربر'
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
    handel = () => {
        console.log('search')
    }
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
                            <Button className="search-button" onClick={this.handel}>{vars.btn}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Row>
            </Form>
        );
    }
}


class UserSearch extends Component{
    render(){
        return(
            <Card className="user-search-card">
                <Row className="user-search-row">
                    <input type="text" value="" placeholder={vars.UserSearch}/>
                </Row>
            </Card>
        );
    }
}

class UsersCard extends Component {
    render(){
        return(
            <Card className="user-card">
                <Row className="user-card-row">
                    <Col className="user-image" lg={4} md={4}>
                        <Image src="https://images.chesscomfiles.com/uploads/v1/user/20102042.6349e34c.161x161o.72c98194bbfc.jpeg"/>
                    </Col>
                    <Col className="user-info" lg={8} md={8}>
                        <Row className="user-name">
                            فامیل دور
                        </Row>
                        <Row className="user-desc">
                            کلاه قرمزی 97
                        </Row>
                    </Col>
                </Row>
            </Card>
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
                    تیم گیک لب(آزمایشگاه گیک) قصد دارد یک پروژه نظارتی امنیتی را برونسپاری کند.این پروژه شامل بخش های مختلفی است که نیاز به تخصص های ذکر شده داردما به دوستانی برنامه نویس هستند نیاز داریم نه کسانی که کد نویس هستند.قطعا برنامه نویس واقعی مفهوم این جمله را درک می کند کد ها باید تماما بر اساس استاندارد های ارائه شده نوشته شوند توضیحات بیشتر قابل ارائه در این بخش نیست.
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
                        {/* < SkillNameBox/>
                        < SkillNameBox/>
                        < SkillNameBox/>
                        < SkillNameBox/>
                        < SkillNameBox/> */}

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
                    {/* < ProjectCard/>
                    < ProjectCard/>
                    < ProjectCard/> */}
                </div>
                <div className="users">
                    <UserSearch/>
                    <UsersCard/>
                    < UsersCard/>
                    < UsersCard/>
                    
                </div>
            </div>
                <Footer/>
            </div>
        );
    }
}

export default Home