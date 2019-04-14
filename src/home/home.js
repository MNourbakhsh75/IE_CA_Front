import React, { Component } from 'react';
import '../style/home.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import * as Req from '../common/Request'
import SpinLoader from '../common/SpinLoader'
// import moment from 'moment'
import {
    Card,
    Form,
    InputGroup,
    Row,
    Button,
    Col,
    Image,
} from 'react-bootstrap'
import { PersianNumber } from '@thg303/react-persian';
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
    constructor(props){
        super(props);

        // console.log(props)
        this.state = {skillName : '',key: 0}
    }
    componentWillMount = () => {
        this.setState({skillName : this.props.skillName})
    }
    render(){
        return(
            <div className="skill-box-name">
                {this.state.skillName}
            </div>
        );
    }
}

class SearchBar extends Component{
    handel = () => {
        console.log(`kha!`)
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
    constructor(props) {
    super(props);

    this.state = {value: ''};
    }
    handelChange = (event) => {
        console.log(event.target.value)
    }
    render(){
        return(
            <Card className="user-search-card">
                <Row className="user-search-row">
                    <input type="text"  placeholder={vars.UserSearch} onChange={this.handelChange}/>
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
class RemainTime extends Component{
    constructor(props){
        super(props)

        this.state = {time : '17.25'}
    }
    componentWillMount = () => {
        this.setState({time : this.props.time})
    }
    render(){
        return(
            <span className="remain-time">
                زمان باقی مانده: <PersianNumber>{this.state.time}</PersianNumber>
            </span>
        );
    }
}

class ExpireTime extends Component{
    render(){
        return(
            <span className="expire-time">
                مهلت تمام شده
            </span>
        );
    }
}
class ProjectCard extends Component{
    constructor(props){
        super(props)

        this.state = {
            project:{},
            isLoad : false
        }
    }
    componentWillMount = ()=>{
        this.setState({project: this.props.project,isLoad:true})
        // console.log(this.state)
    }
    cmpDate = (time) => {
        var res = {
            exp : '',
            dif : ''
        }
        var deadlineTime = new Date(time)
        var currentTime = new Date(Math.floor(Date.now()));
        console.log(deadlineTime)
        var cmp = (deadlineTime-currentTime) / 1000
        if (cmp <= 0){
            res.exp = true
            res.dif = ''
        }else{
            // var days = Math.floor(cmp / 86400);
            var hours = Math.floor(cmp / 3600);
            var minutes = Math.floor(cmp / 60) % 60;
            // console.log(hours,minutes)
            res.exp = false
            res.dif = hours+':'+minutes
        }
        return res
    }
    getDateComp = (date) =>{
        if (date.exp){
            return <ExpireTime/>
        }else{
            return <RemainTime time={date.dif}/>
        }
    }
    getSkillsComp = (skills) =>{
        // console.log(skills)
        var list = []
        for(var s in skills){
            var comp = <SkillNameBox skillName={skills[s].name} key={s}/>
            list.push(comp)
        }
        return list
    }
    render (){
        console.log(this.state)
        //1556112461000
        var date = this.cmpDate(this.state.project.deadline)
        console.log(date)
        const deadLineComponent = this.getDateComp(date)
        const budget = this.state.project.budget.toString()
        const skillList = this.getSkillsComp(this.state.project.skills)
        console.log(skillList)
        return(
            <Card className="project-card">
            <a href="/project">
                <Row className="main-row">
                    <Col lg={3} md={5} xs={6} className="image-col">
                    <Image src={this.state.project.imageUrl}/>
                    </Col>
                    <Col lg={9} md={7} xs={6} className="info-col">
                    <Row className="title-time">
                        <Col lg={7} md={7} className="title">
                            {this.state.project.title}
                        </Col>
                        <Col lg={4} md={5} className="time">
                            {/* <RemainTime time={date.dif}/> */}
                            {/* <ExpireTime/> */}
                            {deadLineComponent}
                        </Col>
                    </Row>
                    <Row className="project-desc">
                        {this.state.project.description}
                    </Row>
                    <Row className="budget">
                        بودجه:  <PersianNumber> {budget} </PersianNumber>   تومان 
                    </Row>
                    <Row className="skills">
                        <div className="skill-label">مهارت‌ها: </div>
                        {skillList}
                    </Row>
                    </Col>
                </Row>
            </a>
            </Card>
        );
    }
}

class Home extends Component {
    constructor(){
        super()

        this.state = {
        isLoad : false,
        project: []
        }
    }
    componentDidMount = () =>{
        Req.getReq('http://142.93.134.194:8000/joboonja/project').then((res) => {
            // console.log(`second`, res)
            this.setState({
                project: res,
                isLoad : true
            })
        })
    }
    getProjectList = (projects)=>{
        var list = []
        for(var p in projects){
            const project = <ProjectCard project={projects[p]} key={p}/>
            list.push(project)
        }
        return list
    }
    render(){
        if (this.state.isLoad){
            console.log(this.state)
            const projectsList = this.getProjectList(this.state.project)
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
                    {/* <ProjectCard project={this.state.project}/> */}
                    {/* <ProjectCard project={this.state.project}/>
                    <ProjectCard project={this.state.project}/>
                    <ProjectCard project={this.state.project}/> */}
                    {projectsList}
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
        }else{
            return(
                <SpinLoader/>
            );
        }
    }
}

export default Home