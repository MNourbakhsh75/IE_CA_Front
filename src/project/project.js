import React, { Component } from 'react';
import '../style/project.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import {Jumbotron ,Container, Row ,Col,Image,Button} from 'react-bootstrap'
import '../assets/my-icons-collection/font/flaticon.css'
import * as Request from '../common/Request'
import queryString from 'query-string'
import SpinLoader from '../common/SpinLoader'
import { PersianNumber } from '@thg303/react-persian'
import * as UTL from '../common/Utilities'
import TopBar from '../common/TopBar'
const vars = {
    projectImage : 'https://cdn4.vectorstock.com/i/1000x1000/31/48/software-developer-and-programmer-vector-10673148.jpg',
    title : 'پروژه طراحی سایت جاب‌اونجا',
    time : 'زمان باقی مانده: ',
    budget: 'بودجه: ',
    desc: 'توضیحات',
    skill: 'مهارت‌های لازم:',
    bidTitle: 'ثبت پیشنهاد',
    bidPlaceHolder: 'پیشنهاد خود را وارد کنید',
    unit: ' تومان',
    expire: 'مهلت تمام شده',
    expireBid: 'مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده است!',
    alreadyBid: 'شما قبلا پیشنهاد خود را ثبت کرده‌اید'
}
const urls = {
    getProject : 'http://localhost:8084/joboonja/project/'
}
const loggedInUserId = "1"

class SkillBox extends Component {
    constructor(props){
        super(props)

        this.state = {skill:''}
    }
    componentWillMount = () =>{
        this.setState({skill:this.props.skill})
    }
    render(){
        // console.log(this.state.skill)
        return(
            <div className="skill-box">
                <div className="skill-box-child name">
                    {
                        this.state.skill.name
                    }
                    </div>
                <div className="skill-box-child point">
                    {
                        this.state.skill.point
                    }
                </div>
            </div>
        );
    }
}

class Bid extends Component {
    constructor(props){
        super(props)

        this.state={}
    }
    sendBidData = (event) => {
        console.log(event)
    }
    render(){
    return (
        <Row className="bid-project">
            <div className="bidAmount" >
            <input
                type="text"
                placeholder= {vars.bidPlaceHolder}
                onChange={this.handelInputVal}
            />
            <span className="unit">تومان</span>
            </div>
            <Button variant="info" onClick={this.sendBidData}>ارسال</Button>
        </Row>
    );
    }
}

class ExpireBid extends Component {
    render(){
        return(
            <Row className="expire-bid">
                <span className="flaticon-danger"></span>
                <span className="expire-bid-text">{vars.expireBid}</span>
            </Row>
        );
    }
}

class AlreadyBid extends Component{
    render(){
        return(
            <Row className="already-bid">
                <span className="flaticon-check-mark"></span>
                <span className="already-bid-text">{vars.alreadyBid}</span>
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
    constructor(props){
        super(props)

        this.state = {
            project : '',
            remainTime: '',
            canBid : true
        }
    }
    componentWillMount = ()=>{
        this.setState({
            project: this.props.project,
            remainTime: UTL.cmpDate(this.props.project.deadline),
            canBid : this.checkForBidingUser(this.props.project.bids)
        })
    }
    componentDidMount = ()=>{
        this.interval = setInterval(()=>{
            this.setState({
                remainTime: UTL.cmpDate(this.state.project.deadline)
            })
        },1000)
    }
    componentWillUnmount = ()=>{
        clearInterval(this.interval);
    }
    getSkillsList = (skills) =>{
        var list = []
        for(var s in skills){
            var comp = <SkillBox skill={skills[s]} key={s}/>
            list.push(comp)
        }
        return list
    }
    getTimeString = (time) =>{
        var s = ''
        if (time.d >=0){
            s += UTL.persianDigit(time.d.toString()) + ' روز و '
        }
        if (time.h >=0){
            s += UTL.persianDigit(time.h.toString()) + ' ساعت و '
        }
        if (time.m >=0){
            s += UTL.persianDigit(time.m.toString()) + ' دقیقه و '
        }
        if (time.s >=0){
            s += UTL.persianDigit(time.s.toString()) + ' ثانیه '
        }
        return s
    }
    checkForBidingUser = (bids)=>{
        for(var b in bids){
            if(bids[b].bidingUser.id === loggedInUserId){
                return false
            }
        }
        return true
    }
    render(){
        // console.log(this.state.canBid)
        const p = this.state.project
        const skillBoxes = this.getSkillsList(p.skills)
        const budget = p.budget.toString()
        var time,expire,timeTitle
        var bidStatusList = [] 
        if (this.state.remainTime.exp === false){
            time =this.getTimeString(this.state.remainTime.dif)
            expire = ''
            timeTitle = vars.time
            if(this.state.canBid === true){
                bidStatusList.push(<BidStatusTitle key='1'/>)
                bidStatusList.push(<Bid key='2'/>)
            }else{
                bidStatusList.push(<AlreadyBid key='1'/>)
            }
        }
        else{
            timeTitle = vars.expire
            expire = 'expire'
            clearInterval(this.interval);
            bidStatusList.push(<ExpireBid key='1'/>)
        }
        return(
            <Jumbotron className="projectContainer align-items-center">
                <Container fluid className="cont">
                    <Row className="info">
                        <Col lg={4} md={6} className="profile">
                            <Image src={p.imageUrl} fluid></Image>
                        </Col>
                        <Col  lg={8} md={6} className="projectInf">
                        <Row className="title">{p.title}</Row>
                        <Row className={'time ' + expire}><span className="flaticon-deadline"></span>
                        <span className="text-title">
                            {timeTitle}
                        </span>
                        <span className="text-time">
                            {time}
                        </span>
                        </Row>
                        <Row className="budget">
                            <span className="flaticon-money-bag"></span>
                            <span className="text">
                                {vars.budget}
                                <PersianNumber>{budget}</PersianNumber>
                                {vars.unit}
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
                            {p.description}
                        </Row>
                        </Col>  
                    </Row>
                </Container>
                <Container fluid className="skill-container">
                    <Row className="skill-name">
                        {vars.skill}
                    </Row>
                    <Row className="skills">
                        {skillBoxes}
                    </Row>
                </Container>
                <Container fluid className="status-container">
                    {bidStatusList}
                </Container>
            </Jumbotron>
        );
    }
}

class project extends Component {
    constructor(props){
        super(props)

        this.state = {
            project : {},
            isLoad : false
        }
    }
    componentDidMount = () =>{
        const values = queryString.parse(this.props.location.search)
        console.log(values.id)
        Request.getReq(urls.getProject+values.id).then((res) => {
            // console.log(`second`, res)
            if(res !== false){
            this.setState({
                project: res,
                isLoad: true
            })
            }
        })
    }
    render(){
        if(this.state.isLoad){
            // console.log(this.state)
        return(
            <div className="project">
                <Header/>
                <div className="content">
                    <TopBar/>
                    <ProjectContainer project={this.state.project}/>
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

export default project