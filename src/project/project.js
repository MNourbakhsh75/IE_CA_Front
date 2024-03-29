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
import * as Toast from '../common/Toast'

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
    alreadyBid: 'شما قبلا پیشنهاد خود را ثبت کرده‌اید',
    cantConnect: 'خطا در برقراری ارتباط با سرور'
}
const urls = {
    getProject : 'http://localhost:8084/joboonja/project/'
}

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

        this.state={
            inputValue : '',
            financialGoal: '',
            projectId : ''
        }
    }
    handelChange = (event) => {
        const financialGoal = (event.target.validity.valid) ? event.target.value : this.state.financialGoal;
        this.setState({
            financialGoal,
        });
    }
    componentWillMount = () =>{
        this.setState({
            projectId: this.props.projectId
        })
    }
    sendBidData = (event) => {
        // console.log(this.state.financialGoal)
        var data = 'amount=' + this.state.financialGoal
        Request.postReq(`http://localhost:8084/joboonja/project/bid?id=${this.state.projectId}`, data).then((res) => {
            // console.log(res)
            if (res !== false) {
                if (res.success === true) {
                    this.props.callBackFunc(false)
                    Toast.SuccessMessage(res.msg)
                } else {
                    Toast.ErrorMessage(res.msg)
                }
            } else {
                Toast.ErrorMessage(vars.cantConnect)
            }
        })
    }
    render(){
    return (
        <Row className="bid-project">
            <div className="bidAmount" >
            <input
                type="text"
                value={this.state.financialGoal}
                placeholder= {vars.bidPlaceHolder}
                pattern="[0-9]*"
                onChange={this.handelChange}
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
            canBid : true,
            winnerdisp : false,
            winnerName : ''
        }
    }
    componentWillMount = ()=>{
        this.setState({
            project: this.props.project,
            remainTime: UTL.cmpDate(this.props.project.deadline),
            canBid : this.checkForBidingUser(this.props.project.bids),
            winnerdisp : this.checkForWinner(this.props.project.winner),
            winnerName: this.setWinnerName(this.props.project.winner)
        })
    }
    checkForWinner = (winner)=> {
        if (winner !== null && winner !== undefined) {
            return true
        }else{
            return false
        }
    }
    setWinnerName = (winner)=>{
        if(winner !== null && winner !== undefined){
            return (this.props.project.winner.firstName + ' '+ this.props.project.winner.lastName)
        }else{
            return ''
        }
    }
    componentDidMount = ()=>{
        this.interval = setInterval(()=>{
            this.setState({
                remainTime: UTL.cmpDate(this.state.project.deadline) //???
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
        if (time.d >0){
            s += UTL.persianDigit(time.d.toString()) + ' روز و '
        }
        if (time.h >0){
            s += UTL.persianDigit(time.h.toString()) + ' ساعت و '
        }
        if (time.m >0){
            s += UTL.persianDigit(time.m.toString()) + ' دقیقه و '
        }
        if (time.s >=0){
            s += UTL.persianDigit(time.s.toString()) + ' ثانیه '
        }
        return s
    }
    checkForBidingUser = (bids)=>{
        for(var b in bids){
            if (bids[b].bidingUser.userName === localStorage.getItem("loggedInUser")) {
                return false
            }
        }
        return true
    }
    callBackFunc = (data) =>{
        this.setState({
            canBid : data
        })
        // console.log(this.state.canBid)
    }
    render(){
        // console.log(this.state)
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
                bidStatusList.push(<Bid projectId={this.state.project.id} callBackFunc={this.callBackFunc} key='2'/>)
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
                        <Row className="winner" style={{display: this.state.winnerdisp ? '' : 'none',color:'#008e3d'}}>
                            <span className="flaticon-check-mark"></span>
                            <span className="text">
                                {this.state.winnerName}
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
            isLoad : false,
        }
    }
    componentDidMount = () =>{
        const values = queryString.parse(this.props.location.search)
        // console.log(values.id)
        Request.getReq(urls.getProject+ '?id=' + values.id).then((res) => {
            console.log(`second`, res)
            if (res === false)
                this.props.history.push('/login')
            else if(res.success !== false){
            this.setState({
                project: res,
                isLoad: true
            })
            }else{
                if (res.code === 403) {
                    Toast.ErrorMessage(res.msg)
                    this.props.history.push('/login')
                } else {
                    Toast.ErrorMessage(vars.cantConnect)
                }
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