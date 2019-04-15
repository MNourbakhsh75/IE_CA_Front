import React, { Component } from 'react';
import '../style/home.scss'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import {
    Card,
    Row,
    Col,
    Image,
} from 'react-bootstrap'
import { PersianNumber } from '@thg303/react-persian';
import {
    withRouter
} from 'react-router-dom'
import * as UTL from '../common/Utilities'


class ProjectCard extends Component{
    constructor(...props){
        super(...props)

        this.state = {
            project:{},
            deadLineComponent: '',
            deadLineTime:''
        }
    }
    componentWillMount = ()=>{
        this.setState({project: this.props.project})
        // console.log(this.state)
    }
    
    getDateComp = (time) =>{
        var date = UTL.cmpDate(time)
        console.log(date.dif)
        const t = date.dif.h +':' + date.dif.m
        if (date.exp){
            return <ExpireTime/>
        }else{
            return <RemainTime time={t}/>
        }
    }
    // componentDidMount = ()=>{
    //     this.interval= setInterval(() => this.setState({
    //         deadLineTime: this.cmpDate(this.state.project.deadline)
    //     }), 60000)
    // }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }
    getSkillsComp = (skills) =>{
        // console.log(skills)
        var list = []
        for(var s in skills){
            var comp = <SkillNameBox skillName={skills[s].name} key={s}/>
            list.push(comp)
        }
        return list
    }
    cardHandelClick = () =>{
        const id = this.props.project.id
        this.props.history.push('/project?id='+id)
    }
    render (){
        // console.log(this.state)
        //1556112461000
        // console.log(date)
        var deadLineComponent = this.getDateComp(this.state.project.deadline)
        const budget = this.state.project.budget.toString()
        const skillList = this.getSkillsComp(this.state.project.skills)
        // console.log(skillList)
        return(
            <Card className="project-card" onClick={this.cardHandelClick}>
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
            </Card>
        );
    }
}

export default withRouter(ProjectCard)

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

class RemainTime extends Component{
    constructor(props){
        super(props)

        this.state = {time : '17.25'}
    }
    componentWillMount = () => {
        this.setState({time : this.props.time})
    }
    // componentDidUpdate = () => {
    //     this.setState({time : this.props.time})
    // }

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