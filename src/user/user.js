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
import * as Toast from '../common/Toast' 
import SpinLoader from '../common/SpinLoader'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
const vars = {
    getUserUrl : 'http://localhost:8084/joboonja/user/',
    cantConnect: 'خطا در برقراری ارتباط با سرور',
    getAllSkillsUrl: 'http://localhost:8084/joboonja/skills',
    selectSkill : '--انتخاب مهارت--',
    AddSkillBtn : 'افزودن مهارت',
    addSkillslabel : 'مهارت‌ها :',
    delSkillConfirm :'آیا مطمئن هستید؟'
}

class ProfileTitle extends Component{
    constructor(props){
        super(props)

        this.state = {
            fName : '',
            lName : '',
            title : '',
            picture : ''
        }
    }

    componentWillMount = () =>{
        this.setState({
            fName : this.props.fName,
            lName : this.props.lName,
            title : this.props.title,
            picture : this.props.picture
        })
    }

    render(){
        const fullName = this.state.fName + ' ' + this.state.lName
        return(
            <Row className="profile-row">
                <div className="profile-picture">
                    <Image src={this.state.picture} fluid></Image>
                </div>
                <div className="bar"></div>
                <div className="bar-shadow"></div>
                <div className="user-name">{fullName}</div>
                <div className="user-title">{this.state.title}</div>
            </Row>
        );
    }
}

class Bio extends Component{
    constructor(props){
        super(props)

        this.state = {
            bio : ''
        }
    }
    componentWillMount = () =>{
        this.setState({bio : this.props.bio})
    }

    render(){
        return(
            <Row className="bio-row">
                {this.state.bio}
            </Row>
        );
    }
}


class AddSkill extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectValue: vars.selectSkill,
            skills : [],
            display : false
        }
    }

    componentWillMount = ()=>{
        this.setState({skills : this.props.skills,display:this.props.display})
    }

    handleChange = (event) => {
        this.setState({selectValue: event});
    }
    createItemList = () =>{
        var list = []
        var {skills} = this.state 
        for(var s in skills){
            var comp = <Dropdown.Item key={s} eventKey={skills[s]}>{skills[s]}</Dropdown.Item>
            list.push(comp)
        }
        return list
    }
    
    handleClick = (event) =>{
        var {
            selectValue
        } = this.state
        //console.log(selectValue)
        if (selectValue !== vars.selectSkill){
            var data = 'skillName=' + selectValue
            // console.log(selectValue)
            Request.postReq(`http://localhost:8084/joboonja/user/${localStorage.getItem("loggedInUser")}/skill`, data).then((res) => {
                if(res !== false){
                    // console.log(res)
                    if (res.success === true){
                        var newSkill = {
                            name: selectValue,
                            point : 0
                        }
                        this.props.callBackFunc(newSkill)
                        Toast.SuccessMessage(res.msg)
                        this.setState({selectValue: vars.selectSkill})
                    }else{
                        Toast.ErrorMessage(res.msg)
                    }
                }else{
                    Toast.ErrorMessage(vars.cantConnect)
                }
            })
        }
    }
    render(){
        // console.log(this.state.skills)
        const itemList = this.createItemList()
        return(
            <Row className="add-skill-row" style={{display: (this.state.display) ? 'none' : ''}}>
                <div className="label-for-skill">{vars.addSkillslabel}</div>
                <div className="skill-list">
                    <DropdownButton title={this.state.selectValue} onSelect={this.handleChange} drop='down'>
                        {/* <Dropdown.Item eventKey ={vars.selectSkill}>{vars.selectSkill}</Dropdown.Item> */}
                        {itemList}
                    </DropdownButton>
                    <button className="btn add-skill-btn" onClick={this.handleClick}>{vars.AddSkillBtn}</button>
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
            point : 0,
            pointText : false,
            otherUser : false,
            skillBoxClassName : '',
            addOrMinus : '',
            endorsed : false,
            handleClick : '',
            userId : 0,
            endorsedArray : []
        }
    }
    componentWillMount = () =>{
        // console.log('kha')
        this.setState({
            name: this.props.name,
            point:this.props.point,
            otherUser:this.props.otherUser,
            skillBoxClassName: (this.props.otherUser) ? 'skill-box other-skill-box' : 'skill-box loggedIn-skill-box',
            addOrMinus : (this.props.otherUser) ? '+' : '-',
            handleClick : (this.props.otherUser) ? this.otherHandleClick : this.handleClick,
            userId : this.props.userId,
            endorsedArray : this.props.endorsedArray
        })
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log('next : ',this.state.endorsed)
        if(this.state.endorsed !== true){
            this.setState({ 
                point: nextProps.point,
                // endorsed : true
            })
        }
    }

    handleOver = (e) =>{
        this.setState({pointText: true})
    }
    handleLeave = (e) =>{
            this.setState({pointText: false})
    }
    sendDeleteReq = () =>{
        var data = '?skillName='+this.state.name
        Request.deleteReq(`http://localhost:8084/joboonja/user/${localStorage.getItem("loggedInUser")}/skill` + data).then((res) => {
            if (res !== false) {
                if(res.success === true){
                    this.props.callBackFunc(this.state.name)
                    Toast.SuccessMessage(res.msg)
                }else{
                    Toast.ErrorMessage(res.msg)
                }
            }else{
                Toast.ErrorMessage(vars.cantConnect)
            }
        })
    }
    handleClick = (e) =>{
        // console.log(this.state.name)
        confirmAlert({
            message: vars.delSkillConfirm,
            buttons: [{
                    label: 'بله',
                    onClick: () => {this.sendDeleteReq()}
                },
                {
                    label: 'خیر',
                    onClick: () => {}
                }
            ]
        });
    }
    otherHandleClick = (e) =>{
        const data = '?skillName=' + this.state.name
        Request.putReq(`http://localhost:8084/joboonja/user/${this.state.userId}/skill`+ data).then((res) => {
            if (res !== false) {
                if (res.success === true) {
                    // console.log(res)
                    this.props.otherCallBackFunc(this.state.name)
                    Toast.SuccessMessage(res.msg)
                    this.setState({
                        endorsed: true
                    })
                } else {
                    Toast.ErrorMessage(res.msg)
                }
            } else {
                Toast.ErrorMessage(vars.cantConnect)
            }
        })
    }
    checkForEndorse = () =>{
        var {
            endorsedArray
        } = this.state
        for (var s in endorsedArray){
            // console.log(this.state.name,endorsedArray[s])
            if(this.state.name === endorsedArray[s]){
                return 'endorsed'
            }
        }
        return ''
    }
    render() {
        // console.log('sec : ', this.state.endorsedArray)
        var endorseClassName = this.checkForEndorse()
        var endorseClassNameC = (this.state.endorsed) ? 'endorsed' : ''
        return (
            <div className={this.state.skillBoxClassName} onMouseEnter={this.handleOver} onMouseLeave={this.handleLeave} onClick={this.state.handleClick}>
                <div className="skill-box-child name">
                    {this.state.name}
                </div>
                <div className={'skill-box-child point ' + endorseClassName + ' '+endorseClassNameC}>
                    {this.state.pointText ? this.state.addOrMinus : this.state.point }
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
            skills : [],
            otherUser : false,
            endorsedArray : []
        }
    }

    // componentWillUpdate = ()=>{
    //     this.setState({user: this.props.user})
    // }
    componentDidMount = () =>{
        const values = queryString.parse(this.props.location.search)
        // console.log(this.props)
        Request.getReq(vars.getUserUrl + values.id).then((res) => {
            console.log(res)
            if (res === false)
                this.props.history.push('/login')
            else if (res.success !== false) {
                this.setState({
                    user: res.user,
                    isLoadU: true,
                    otherUser : (res.user.userName === localStorage.getItem("loggedInUser")) ? false : true,
                    endorsedArray : res.endorse
                })
            } else {
                if (res.code === 403) {
                    Toast.ErrorMessage(res.msg)
                    this.props.history.push('/login')
                } else {
                    Toast.ErrorMessage(vars.cantConnect)
                }
            }
        })
        Request.getReq(vars.getAllSkillsUrl).then((res) => {
            if (res !== false) {
                this.setState({
                    skills: res,
                    isLoadS: true,
                })
            } else {
                Toast.ErrorMessage(vars.cantConnect)                
            }
        })
    }
    createSkillsList = ()=>{
        var list = []
        var {skills} = this.state.user
        for (var s in skills){
            // console.log(skills[s])
            // if(this.state.otherUser)
            var comp = <SkillBox key={s} name={skills[s].name} point={skills[s].point} callBackFunc={this.delSkillCallBack} otherCallBackFunc={this.endorseSkillCallBack} otherUser={this.state.otherUser} userId={this.state.user.userName} endorsedArray={this.state.endorsedArray}/>
            list.push(comp)
        }
        return list
    }
    addSkillCallBack = (data) =>{
        var {skills} = this.state.user
        // console.log(skills)
        skills.push(data)
        // console.log(this.state.user.skills)
        this.setState({user: this.state.user})
    }
    delSkillCallBack = (data) =>{
        var {skills} = this.state.user
        for(var s in skills){
            if (skills[s].name === data){
                delete skills[s]
            }
        }
        this.setState({user: this.state.user})
    }
    endorseSkillCallBack = (data)=>{
        // console.log(data)
        var {skills} = this.state.user
        for (var s in skills) {
            if (skills[s].name === data) {
                skills[s].point +=1 
            }
        }
        this.setState({user: this.state.user})
        // console.log(this.state.user)
    }
    render(){
        if(this.state.isLoadU && this.state.isLoadS){
            // console.log(this.state)
            const skillsList = this.createSkillsList()
            
        return(
            <div className="user">
                <Header/>
                    <div className="content">
                        <TopBar/>
                        < ProfileTitle fName = {
                            this.state.user.firstName
                        }
                        lName = {
                            this.state.user.lastName
                        }
                        title = {
                            this.state.user.jobTitle
                        }
                        picture = {
                            this.state.user.profilePictureURL
                        }
                        />
                        <Bio bio={this.state.user.bio}/>
                        <AddSkill skills={this.state.skills} callBackFunc={this.addSkillCallBack} display={this.state.otherUser}/>
                        <Row className="skills-boxes">
                            {skillsList}
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