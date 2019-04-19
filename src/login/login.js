import React, { Component } from 'react';
import Footer from '../common/Footer'
import '../style/login.scss'
import {Jumbotron ,Form, Row ,Col,} from 'react-bootstrap'
import logo from '../assets/logo/logo v2.png'
import classnames from 'classnames';
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
          <Form.Control type={this.props.type} placeholder={this.props.placeholder} className="input" />

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
                <InputBlock labelName="نام کاربری" type="" placeholder="Username" />
                <InputBlock labelName="رمز عبور" type="password" placeholder="Password" />
              </fieldset>
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
                <FormBox />
                <ButtonMake text="ورود" />
                <a href="../register"><ButtonMake text="ثبت نام" styleName="bnt-border"/></a>
                <ButtonMake text="فراموشی رمز عبور" styleName="bnt-border" />
              </div>
            </div>
          </Jumbotron>
        );
    }
}
class login extends Component{

  render(){
    return(
      <div className="login">
        <div className="content">
          <div className = "top-bar"></div>
          <RegBox/>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default login
