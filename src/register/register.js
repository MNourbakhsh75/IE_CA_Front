import React, { Component } from 'react';
import Footer from '../common/Footer'
import '../style/register.scss'
import {
  Jumbotron,
  Carousel,
  Form,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import * as Request from '../common/Request'
import {
  withRouter
} from 'react-router-dom'
import * as Toast from '../common/Toast'
const vars = {
  title: 'جاب‌اونجا خوب است!',
  placeholder: 'جست‌وجو در جاب‌اونجا‌',
  btn: 'جست‌وجو',
  UserSearch: 'جست‌وجوی نام کاربر',
  cantConnect: 'خطا در برقراری ارتباط با سرور'
}
 // eslint-disable-next-line
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
 // eslint-disable-next-line
class FormBox extends Component {
    constructor(...args) {
      super(...args);

      this.state = {
        validated: false,
        display : 'none',
        color : '',
        msg : '',
        className : ''
      };
    }

    handleChange = (event) =>{
      let val = event.target.value
      console.log(val)
      if(val === ''){
        this.setState({
          display: '',
          color: '#dc3545',
          msg: 'این فیلد ضروری است',
          className: 'form-control:invalid'
        })
      }else{
      Request.getReq(`http://localhost:8084/joboonja/user/unique?username=${val}`).then((res) => {
        console.log(res)
        if (res.success === true){
            this.setState({
              display: '',
              color: '#28a745',
              msg: res.msg,
              className: ''
            })
        }
        else{
          this.setState({
            display: '',
            color: '#dc3545',
            msg :res.msg,
            className: 'invalidInput'
          })
        }
      })
    }
  }

    handleSubmit(event) {
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
        firstName: event.target.name.value,
        lastName: event.target.lastName.value,
        userName: event.target.username.value,
        password: event.target.password.value,
        bio: event.target.bio.value,
        jobTitle: event.target.title.value,
        profilePictureURL: event.target.image.value
      }
      
      sendingData.append('data', JSON.stringify(data));
      Request.postReq(`http://localhost:8084/joboonja/register`, sendingData).then((res) => {
        if (res !== false) {
          console.log(res)
          if (res.success === true) {
              
          } else {
            // Toast.ErrorMessage(res.msg)
          }
        } else {
          // Toast.ErrorMessage(vars.cantConnect)
        }
      })
    }
    render(){
      const { validated } = this.state;
        return(
          <div className="form-div">
            <Form 
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}>
                <Form.Group as={Row}  controlId="validationName">
            <Form.Label  column sm = {3}>نام</Form.Label>
            <Col  sm = {9}>
            <Form.Control
              required
              type="text"
              name="name"
              // defaultValue="Mark"
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Col>
          </Form.Group>
                <Form.Group as = {Row} controlId = "formHorizontalLast">
                  <Form.Label column sm = {3}>
                  نام خانوادگی
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  type = "text"
                  name = "lastName"
                  />
                  </Col>
                </Form.Group>
          <Form.Group as={Row}  controlId="validationUsername">
            <Form.Label  column sm = {3}>نام کاربری</Form.Label>
            <Col  sm = {9}>
            <Form.Control
              required
              type="text"
              name="username"
              onChange={this.handleChange}
              className={this.state.className}
            />
            <div  style={{display: this.state.display,color: this.state.color}}>{this.state.msg}</div>
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
                <Form.Group as = {Row} controlId = "formHorizontalTitle">
                  <Form.Label column sm = {3}>
                  عنوان شغلی
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  name="title"
                  />
                  </Col>
                </Form.Group>
                <Form.Group as = {Row} controlId = "formHorizontalImage">
                  <Form.Label column sm = {3}>
                  لینک عکس پروفایل
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  name="image"
                  />
                  </Col>
                </Form.Group>
                <Form.Group as = {Row} controlId = "formHorizontalBio">
                  <Form.Label column sm = {3}>
                  بیو
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  name="bio"
                  />
                  </Col>
                </Form.Group>
                <Row className="submitBtn">
                  <Button variant = "primary"
                    type = "submit" >
                    تایید
                    </Button>
                </Row>
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

// class RegBox extends Component {
//     constructor(props){
//       super(props)

//       this.state = {
//         user : {}
//       }
//     }
//     handleClick = () =>{
//       console.log('ddd')
//     }
//     render(){
//         return(
//           <Jumbotron className="box-row">
//             <div className="box">
//               <div className="box-title">
//                   صفحه ثبت نام
//               </div>
//               <div className="form-sildeshow-row" >
//                 <div className="form-div">
//             <Form 
//             noValidate
//             validated={validated}
//             onSubmit={e => this.handleSubmit(e)}>
//                 <Form.Group as={Row}  controlId="validationName">
//             <Form.Label  column sm = {3}>نام</Form.Label>
//             <Col  sm = {9}>
//             <Form.Control
//               required
//               type="text"
//               name="name"
//               // defaultValue="Mark"
//             />
//             {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
//             </Col>
//           </Form.Group>
//                 <Form.Group as = {Row} controlId = "formHorizontalLast">
//                   <Form.Label column sm = {3}>
//                   نام خانوادگی
//                   </Form.Label> 
//                   <Col sm = {9}>
//                   <Form.Control
//                   required
//                   type = "text"
//                   name = "lastName"
//                   />
//                   </Col>
//                 </Form.Group>
//           <Form.Group as={Row}  controlId="validationUsername">
//             <Form.Label  column sm = {3}>نام کاربری</Form.Label>
//             <Col  sm = {9}>
//             <Form.Control
//               required
//               type="text"
//               name="username"
//               onChange={this.handleChange}
//               className={this.state.className}
//             />
//             <div  style={{display: this.state.display,color: this.state.color}}>{this.state.msg}</div>
//             </Col>
//           </Form.Group>
//                 <Form.Group as = {Row} controlId = "formHorizontalPassword">
//                   <Form.Label column sm = {3}>
//                   رمز عبور
//                   </Form.Label> 
//                   <Col sm = {9}>
//                   <Form.Control 
//                   required
//                   type="password"
//                   name="password"
//                   />
//                   </Col>
//                 </Form.Group>
//                 <Form.Group as = {Row} controlId = "formHorizontalTitle">
//                   <Form.Label column sm = {3}>
//                   عنوان شغلی
//                   </Form.Label> 
//                   <Col sm = {9}>
//                   <Form.Control
//                   required
//                   name="title"
//                   />
//                   </Col>
//                 </Form.Group>
//                 <Form.Group as = {Row} controlId = "formHorizontalImage">
//                   <Form.Label column sm = {3}>
//                   لینک عکس پروفایل
//                   </Form.Label> 
//                   <Col sm = {9}>
//                   <Form.Control
//                   required
//                   name="image"
//                   />
//                   </Col>
//                 </Form.Group>
//                 <Form.Group as = {Row} controlId = "formHorizontalBio">
//                   <Form.Label column sm = {3}>
//                   بیو
//                   </Form.Label> 
//                   <Col sm = {9}>
//                   <Form.Control
//                   required
//                   name="bio"
//                   />
//                   </Col>
//                 </Form.Group>
//                 <Row className="submitBtn">
//                   <Button variant = "primary"
//                     type = "submit" >
//                     تایید
//                     </Button>
//                 </Row>
//             </Form>
//           </div>
//                 <Slideshow />
//               </div>
//             </div>
//           </Jumbotron>
//         );
//     }
// }
class register extends Component{
  constructor(...args) {
    super(...args);

    this.state = {
      validated: false,
      display: 'none',
      color: '',
      msg: '',
      className: ''
    };
  }

  handleChange = (event) => {
    let val = event.target.value
    console.log(val)
    if (val === '') {
      this.setState({
        display: '',
        color: '#dc3545',
        msg: 'این فیلد ضروری است',
        className: 'form-control:invalid'
      })
    } else {
      Request.getReq(`http://localhost:8084/joboonja/user/unique?username=${val}`).then((res) => {
        console.log(res)
        if (res.success === true) {
          this.setState({
            display: '',
            color: '#28a745',
            msg: res.msg,
            className: ''
          })
        } else {
          this.setState({
            display: '',
            color: '#dc3545',
            msg: res.msg,
            className: 'invalidInput'
          })
        }
      })
    }
  }

  handleSubmit(event) {
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
      firstName: event.target.name.value,
      lastName: event.target.lastName.value,
      userName: event.target.username.value,
      password: event.target.password.value,
      bio: event.target.bio.value,
      jobTitle: event.target.title.value,
      profilePictureURL: event.target.image.value
    }
    
    sendingData.append('data', JSON.stringify(data));
    Request.postReq(`http://localhost:8084/joboonja/register`, sendingData).then((res) => {
      if (res !== false) {
        console.log(res)
        if (res.success === true) {
          Toast.SuccessMessage(res.msg)
          this.props.history.push('/login')
        } else {
          Toast.ErrorMessage(res.msg)
        }
      } else {
        Toast.ErrorMessage(vars.cantConnect)
      }
    })
  }
  componentWillMount = () => {
    Request.getReq('http://localhost:8084/joboonja/validtoken').then((res) => {
      console.log(res)
      if (res.success === true && localStorage.getItem("token")) {
        this.props.history.push('/')
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
      <div className="register">
        <div className="content">
          <div className = "top-bar"></div>
          <Jumbotron className="box-row">
            <div className="box">
              <div className="box-title">
                  صفحه ثبت نام
              </div>
              <div className="form-sildeshow-row" >
                <div className="form-div">
            <Form 
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}>
                <Form.Group as={Row}  controlId="validationName">
            <Form.Label  column sm = {3}>نام</Form.Label>
            <Col  sm = {9}>
            <Form.Control
              required
              type="text"
              name="name"
              // defaultValue="Mark"
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
            </Col>
          </Form.Group>
                <Form.Group as = {Row} controlId = "formHorizontalLast">
                  <Form.Label column sm = {3}>
                  نام خانوادگی
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  type = "text"
                  name = "lastName"
                  />
                  </Col>
                </Form.Group>
          <Form.Group as={Row}  controlId="validationUsername">
            <Form.Label  column sm = {3}>نام کاربری</Form.Label>
            <Col  sm = {9}>
            <Form.Control
              required
              type="text"
              name="username"
              onChange={this.handleChange}
              className={this.state.className}
            />
            <div  style={{display: this.state.display,color: this.state.color}}>{this.state.msg}</div>
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
                <Form.Group as = {Row} controlId = "formHorizontalTitle">
                  <Form.Label column sm = {3}>
                  عنوان شغلی
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  name="title"
                  />
                  </Col>
                </Form.Group>
                <Form.Group as = {Row} controlId = "formHorizontalImage">
                  <Form.Label column sm = {3}>
                  لینک عکس پروفایل
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  name="image"
                  />
                  </Col>
                </Form.Group>
                <Form.Group as = {Row} controlId = "formHorizontalBio">
                  <Form.Label column sm = {3}>
                  بیو
                  </Form.Label> 
                  <Col sm = {9}>
                  <Form.Control
                  required
                  name="bio"
                  />
                  </Col>
                </Form.Group>
                <Row className="submitBtn">
                  <Button variant = "primary"
                    type = "submit" >
                    تایید
                    </Button>
                </Row>
            </Form>
          </div>
                <Slideshow />
              </div>
            </div>
          </Jumbotron>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default withRouter(register)
