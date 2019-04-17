import React, { Component } from 'react';
import '../style/user.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import TopBar from '../common/TopBar'
import * as Request from '../common/Request'
import queryString from 'query-string'
import {
    Row,
    Image,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap'
import {
    toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SpinLoader from '../common/SpinLoader';
const vars = {
    getUserUrl : 'http://localhost:8084/joboonja/user/',
    cantConnect: 'خطا در برقراری ارتباط با سرور',
    getAllSkillsUrl: 'http://localhost:8084/joboonja/skills',
    selectSkill : '--انتخاب مهارت--',
    AddSkillBtn : 'افزودن مهارت',
    addSkillslabel : 'مهارت‌ها :'
}
const loggedInUserId = "1"
class ProfileTitle extends Component{
    constructor(props){
        super(props)

        this.state = {
            fName : '',
            lName : '',
            title : '',
        }
    }

    componentWillMount = () =>{
        this.setState({
            fName : this.props.fName,
            lName : this.props.lName,
            title : this.props.title
        })
    }

    render(){
        return(
            <Row className="profile-row">
                <div className="profile-picture">
                    <Image src="https://imgurl.ir/uploads/l234912_.jpg" fluid></Image>
                </div>
                <div className="bar"></div>
                <div className="bar-shadow"></div>
                <div className="user-name">محمدرضا کیانی</div>
                <div className="user-title">چیف تی ای</div>
            </Row>
        );
    }
}

class Bio extends Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return(
            <Row className="bio-row">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </Row>
        );
    }
}


class AddSkill extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectValue: vars.selectSkill
        }
    }
    handleChange = (event) => {
        // console.log(event)
        this.setState({selectValue: event});
    }
    render(){
        return(
            <Row className="add-skill-row">
                <div className="label-for-skill">{vars.addSkillslabel}</div>
                <div className="skill-list">
                    <DropdownButton title={this.state.selectValue} onSelect={this.handleChange} alignRight>
                        {/* <Dropdown.Item eventKey ={vars.selectSkill}>{vars.selectSkill}</Dropdown.Item> */}
                        <Dropdown.Item eventKey="Action">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="Another action">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="Something else">Something else</Dropdown.Item>
                    </DropdownButton>
                    <button className="btn add-skill-btn">{vars.AddSkillBtn}</button>
                </div>
            </Row>
        );
    }
}

class SkillBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name : '',
            point : 5,
            pointText : false
        }
    }
    // componentWillMount = () =>{
    //     this.setState({name: this.props.name,point:this.props.point})
    // }
    handleOver = (e) =>{
        this.setState({pointText: true})
        
    }
    handleLeave = (e) =>{
            this.setState({pointText: false})
    }
    render() {
        
        return (
            <div className="skill-box" onMouseEnter={this.handleOver} onMouseLeave={this.handleLeave}>
                <div className="skill-box-child name">
                    HTML
                </div>
                <div className="skill-box-child point">
                    {this.state.pointText ? '-' : this.state.point }
                </div>
            </div>
        );
    }
}


class user extends Component{
    constructor(props){
        super(props)

        this.state = {
            user : {},
            isLoadU : false,
            isLoadS : false,
            skills : []
        }
    }

    // componentWillUpdate = ()=>{
    //     this.setState({user: this.props.user})
    // }
    componentDidMount = () =>{
        const values = queryString.parse(this.props.location.search)
        console.log(values.id)
        Request.getReq(vars.getUserUrl + values.id).then((res) => {
            if (res !== false) {
                this.setState({
                    user: res,
                    isLoadU: true,
                })
            } else {
                toast.error(vars.cantConnect, {
                    position: "top-left",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
            }
        })
        Request.getReq(vars.getAllSkillsUrl).then((res) => {
            if (res !== false) {
                this.setState({
                    skills: res,
                    isLoadS: true,
                })
            } else {
                toast.error(vars.cantConnect, {
                    position: "top-left",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
            }
        })
    }

    render(){
        if(this.state.isLoadU && this.state.isLoadS){
            console.log(this.state)
        return(
            <div className="user">
                <Header/>
                    <div className="content">
                        <TopBar/>
                        <ProfileTitle/>
                        <Bio/>
                        <AddSkill/>
                        <Row className="skills-boxes">
                            <SkillBox/>
                            <SkillBox/>
                            <SkillBox/>
                        </Row>
                    </div>
                <Footer/>
            </div>
        );
    }else{
        return(
            <SpinLoader/>
        );
    }
    }
}
export default user;