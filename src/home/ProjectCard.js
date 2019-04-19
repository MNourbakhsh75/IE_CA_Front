import React, { Component } from 'react';
import '../style/home.scss'
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
            deadLineTime:'',
            remainTime: ''
        }
    }
    componentWillMount = ()=>{
        this.setState({
            project: this.props.project,
            remainTime : UTL.cmpDate(this.props.project.deadline)
        })
        // console.log(this.state)
    }
    getDateString = (time) =>{
        if (time.d > 0){
            return time.d  + ' روز '
        }else{
            return time.h + ':' + time.m
        }
    }
    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.setState({
                remainTime: UTL.cmpDate(this.state.project.deadline)
            })
        }, 60000)
    }
    componentWillUnmount = () => {
        clearInterval(this.interval);
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
    cardHandelClick = () =>{
        const id = this.props.project.id
        this.props.history.push('/project?id='+id)
    }
    render (){
        // console.log(this.state.remainTime)
        //1556112461000
        // console.log(date)
        var deadComp = []
        if (this.state.remainTime.exp === false){
            var t = this.getDateString(this.state.remainTime.dif)
            deadComp.push(<RemainTime key="1" time={t}/>)
        }else{
            deadComp.push(<ExpireTime key ="1"/>)
        }
        // var deadLineComponent = this.getDateComp(this.state.project.deadline)
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
                            {deadComp}
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
    componentWillReceiveProps = (nextProps) =>{
        this.setState({
            time : nextProps.time
        })
    }

    render(){
        // console.log(this.state.time)
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