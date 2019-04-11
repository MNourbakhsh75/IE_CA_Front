import React, { Component } from 'react';
import '../style/home.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {Jumbotron ,Container,Form,InputGroup ,Row ,Col,Image,Button} from 'react-bootstrap'

const vars = {
    title : 'جاب‌اونجا خوب است!',
    placeholder: 'جست‌وجو در جاب‌اونجا‌',
    btn: 'جست‌وجو'
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
                است.چاپگرها و متون بلکه
                روزنامه و مجله در ستون و سطرآنچنان که لازم است.
            </Row>
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
            </div>
            <Footer/>
            </div>
        );
    }
}

export default Home