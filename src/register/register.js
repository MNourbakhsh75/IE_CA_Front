import React, { Component } from 'react';
import Footer from '../common/Footer'
import '../style/register.scss'
import {Jumbotron ,Carousel,Form, Row ,Col,} from 'react-bootstrap'


class InputBlock extends Component{
  render()
  {
    var nameOfClass="input-col "
    return(
      <Form.Group className="input-block" as={Row}>
        <Form.Label  className="input-label" column sm={6}>
          {this.props.labelName}
        </Form.Label>
        <Col className={nameOfClass} sm={6}>
          <input className="input"
            type="text"
          />
        </Col>
      </Form.Group>
    );
  }
}
class FormBox extends Component {
    render(){
        return(
          <div className="form-div">
            <Form>
              <fieldset>
                <InputBlock labelName="نام"  />
                <InputBlock labelName="نام خانوادگی"  />
                <InputBlock labelName="نام کاربری"  />
                <InputBlock labelName="رمز عبور"  />
                <InputBlock labelName="تکرار رمز عبور"  />
                <InputBlock labelName="عنوان شغلی"  />
                <InputBlock labelName="لینک عکس پروفایل" className="eng-text" />
                <InputBlock labelName="بیو"  />
              </fieldset>
            </Form>
          </div>
        );
    }
}
class SlideShowItem extends Component {
    render(){
        return(
            <img
              className="slide-block"
              src={this.props.imgSrc}
              alt={this.props.alt}
            />
        );
    }
}
class Slideshow extends Component {
    render(){
        return(
          <div className="slideshow-div">
            <Carousel className="slideshow-box" controls="0">
              <Carousel.Item className="slide-item">
                <SlideShowItem imgSrc="https://imgurl.ir/uploads/l474771_.png" alt="slide 1"/>
              </Carousel.Item>
              <Carousel.Item className="slide-item">
                <SlideShowItem imgSrc="https://imgurl.ir/uploads/f141469_.png" alt="slide 2"/>
              </Carousel.Item>
              <Carousel.Item className="slide-item">
                <SlideShowItem imgSrc="https://imgurl.ir/uploads/b909179_.png" alt="slide 3"/>
              </Carousel.Item>
            </Carousel>
          </div>
        );
    }
}

class RegBox extends Component {
    render(){
        return(
          <Jumbotron className="box-row">
            <div className="box">
              <div className="box-title">
                  صفحه ثبت نام
              </div>
              <div className="form-sildeshow-row" >
                <FormBox />
                <Slideshow />
              </div>
              <div className="btn-class btn-class-reg">
                <button className="btn">ثبت نام</button>
              </div>
            </div>
          </Jumbotron>
        );
    }
}
class register extends Component{

  render(){
    return(
      <div className="register">
        <div className="content">
          <div className = "top-bar"></div>
          <RegBox/>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default register
