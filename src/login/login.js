import React, { Component } from 'react';
import Footer from '../common/Footer'
import '../style/login.scss'
import {
  Jumbotron,
  Form,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import logo from '../assets/logo/logo v1.png'
import * as Toast from '../common/Toast'
import * as Request from '../common/Request'
import classnames from 'classnames';
import {
  withRouter
} from 'react-router-dom'
const vars = {
  title: 'جاب‌اونجا خوب است!',
  placeholder: 'جست‌وجو در جاب‌اونجا‌',
  btn: 'جست‌وجو',
  UserSearch: 'جست‌وجوی نام کاربر',
  cantConnect: 'خطا در برقراری ارتباط با سرور'
}

class FormBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      display: 'none',
      color: '',
      msg: '',
      className: ''
    };
  }
  handleSubmit = (event) =>{
    event.preventDefault();
    let sendingData = new URLSearchParams();
    let data = {}
    data = {
      userName: event.target.username.value,
      password: event.target.password.value,
    }
    sendingData.append('data', JSON.stringify(data));
    // console.log(localStorage)
    Request.postReq(`http://localhost:8084/joboonja/login`, sendingData).then((res) => {
      if (res !== false) {
        console.log(res)
        if (res.success === true) {
            localStorage.setItem("token", res.token)
            console.log(localStorage)
            Toast.SuccessMessage(res.msg)
            this.props.history.push('/home')
        } else {
          Toast.ErrorMessage(res.msg)
        }
      } else {
        Toast.ErrorMessage(vars.cantConnect)
      }
    })
  }
  render(){
      return(
        <div className="form-div">
          <Form
          onSubmit={this.handleSubmit}>
            <Form.Group as={Row}  controlId="validationUsername">
              <Form.Label  column sm = {3}>نام کاربری</Form.Label>
              <Col  sm = {9}>
              <Form.Control
                required
                type="text"
                name="username"
                // onChange={this.handleChange}
                // className={this.state.className}
              />
              {/* <div  style={{display: this.state.display,color: this.state.color}}>{this.state.msg}</div> */}
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId = "formHorizontalPassword">
              <Form.Label column sm = {3}>
              رمز عبور
              </Form.Label> 
              <Col sm = {9}>
              <Form.Control 
              required
              type="password"
              name="password"
              />
              </Col>
            </Form.Group>
            <Row className="btn-class">
              <Button variant = "primary"
                type = "submit" >
                ورود
              </Button>
            </Row>
          </Form>
        </div>
      );
  }
}

class ButtonMake extends Component {
    constructor(props){
        super(props) 
        
        this.state ={
            
        }
    }
    render(){
        return(
            <div className={classnames('btn-class btn-class-reg', this.props.styleName)}>
                <button className="btn" onClick={this.handleClick}>{this.props.text}</button>
            </div>
        );
    }
}

class RegBox extends Component {
    render(){
        return(
          <Jumbotron className="box-row">
          <div className="logo-div">
          <img alt="logo icon" src={logo}/>
          </div>
            <div className="box">
              <div className="box-title">
                ورود
              </div>
              <div className="form-row" >
                <div className="form-div">
          <Form
          onSubmit={this.handleSubmit}>
            <Form.Group as={Row}  controlId="validationUsername">
              <Form.Label  column sm = {3}>نام کاربری</Form.Label>
              <Col  sm = {9}>
              <Form.Control
                required
                type="text"
                name="username"
                // onChange={this.handleChange}
                // className={this.state.className}
              />
              {/* <div  style={{display: this.state.display,color: this.state.color}}>{this.state.msg}</div> */}
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId = "formHorizontalPassword">
              <Form.Label column sm = {3}>
              رمز عبور
              </Form.Label> 
              <Col sm = {9}>
              <Form.Control 
              required
              type="password"
              name="password"
              />
              </Col>
            </Form.Group>
            <Row className="btn-class">
              <Button variant = "primary"
                type = "submit" >
                ورود
              </Button>
            </Row>
          </Form>
        </div>
                {/* <ButtonMake text="ورود" /> */}
                <a href="../register"><ButtonMake text="ثبت نام" styleName="bnt-border"/></a>
              </div>
            </div>
          </Jumbotron>
        );
    }
}
class login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      display: 'none',
      color: '',
      msg: '',
      className: ''
    };
  }
  handleSubmit = (event) =>{
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setState({
        validated: true
      });
    event.preventDefault();
    let sendingData = new URLSearchParams();
    let data = {}
    data = {
      userName: event.target.username.value,
      password: event.target.password.value,
    }
    sendingData.append('data', JSON.stringify(data));
    // console.log(localStorage)
    Request.postReq(`http://localhost:8084/joboonja/login`, sendingData).then((res) => {
      if (res !== false) {
        console.log(res)
        if (res.success === true) {
            localStorage.setItem("token", res.token)
            localStorage.setItem("loggedInUser", data.userName)
            console.log(localStorage)
            Toast.SuccessMessage(res.msg)
            this.props.history.push('/home')
        } else {
          Toast.ErrorMessage(res.msg)
        }
      } else {
        Toast.ErrorMessage(vars.cantConnect)
      }
    })
  }
  
  
  componentWillMount = () =>{
    console.log('fffd')
    Request.getReq('http://localhost:8084/joboonja/validtoken').then((res) => {
      console.log(res)
      if (res.success === true && localStorage.getItem("token")) {
        this.props.history.push('/home')
      } 
      // else if (res.code === 403) {
      //     Toast.ErrorMessage(res.msg)
      //     // this.props.history.push('/home')
      //   } 
        // else {
        //   Toast.ErrorMessage(vars.cantConnect)
        // }
    })
  }
  render(){
    const { validated } = this.state;
    return(
      <div className="login">
        <div className="content">
          <div className = "top-bar"></div>
          <Jumbotron className="box-row">
          <div className="logo-div">
          <img alt="logo icon" src={logo}/>
          </div>
            <div className="box">
              <div className="box-title">
                ورود
              </div>
              <div className="form-row" >
                <div className="form-div">
          <Form
          noValidate
            validated={validated}
          onSubmit={this.handleSubmit}>
            <Form.Group as={Row}  controlId="validationUsername">
              <Form.Label  column sm = {3}>نام کاربری</Form.Label>
              <Col  sm = {9}>
              <Form.Control
                required
                type="text"
                name="username"
                // onChange={this.handleChange}
                // className={this.state.className}
              />
              {/* <div  style={{display: this.state.display,color: this.state.color}}>{this.state.msg}</div> */}
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId = "formHorizontalPassword">
              <Form.Label column sm = {3}>
              رمز عبور
              </Form.Label> 
              <Col sm = {9}>
              <Form.Control 
              required
              type="password"
              name="password"
              />
              </Col>
            </Form.Group>
            <Row className="btn-class">
              <Button variant = "primary"
                type = "submit" >
                ورود
              </Button>
            </Row>
          </Form>
        </div>
                {/* <ButtonMake text="ورود" /> */}
                <a href="../register"><ButtonMake text="ثبت نام" styleName="bnt-border"/></a>
              </div>
            </div>
          </Jumbotron>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default withRouter(login)
