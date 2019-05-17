import React, { Component } from 'react';
import '../style/home.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import * as Request from '../common/Request'
import SpinLoader from '../common/SpinLoader'
import ProjectCard from '../home/ProjectCard'
import UserCard from '../home/UserCard'
import * as Toast from '../common/Toast'
import {
    Card,
    Form,
    InputGroup,
    Row,
    Button,
} from 'react-bootstrap'
import {
    withRouter
} from 'react-router-dom'
// import { PersianNumber } from '@thg303/react-persian';
const vars = {
    title : 'جاب‌اونجا خوب است!',
    placeholder: 'جست‌وجو در جاب‌اونجا‌',
    btn: 'جست‌وجو',
    UserSearch: 'جست‌وجوی نام کاربر',
    cantConnect: 'خطا در برقراری ارتباط با سرور'
}
const urls = {
    projects : 'http://localhost:8084/joboonja/project',
    users : 'http://localhost:8084/joboonja/user',
    searchUser: 'http://localhost:8084/joboonja/user/search',
    searchProject: 'http://localhost:8084/joboonja/search/project'
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



class SearchBar extends Component{

    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }
    handel = () => {
        console.log(this.state.value)
        Request.getReq(urls.searchProject + '?q=' + this.state.value).then((res) => {
            console.log(`second`, res)
            if (res !== false) {
                if (res.length !== undefined) {
                    this.props.callBackFunc(res)
                    // this.setState({
                    //     project: res,
                    //     isLoadP: true,
                    // })
                } else {
                    // this.setState({
                    //     project: {},
                    //     isLoadP: true,
                    // })
                    Toast.ErrorMessage(res.msg)
                }
            } else {
                Toast.ErrorMessage(vars.cantConnect)
            }
        })
    }
    handleChange = (event) => {
        this.setState({
            value : event.target.value
        })
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
                            onChange = {this.handleChange}
                        />
                        <InputGroup.Append>
                            <Button className="search-button" onClick={this.handel} >{vars.btn}</Button>
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
        Request.getReq(urls.searchUser + '?q=' + event.target.value).then((res) => {
            // console.log(`second`, res)
            if (res !== false) {
                if (res.length !== undefined) {
                    this.props.callBackFunc(res)
                    // this.setState({
                    //     project: res,
                    //     isLoadP: true,
                    // })
                } else {
                    // this.setState({
                    //     project: {},
                    //     isLoadP: true,
                    // })
                    Toast.ErrorMessage(res.msg)
                }
            } else {
                Toast.ErrorMessage(vars.cantConnect)
            }
        })
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
class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
        isLoadP : false,
        isLoadU : false,
        project: [],
        user: [],
        prevUsers : []
        }
    }
    componentDidMount = () =>{
        Request.getReq(urls.projects).then((res) => {
            console.log(`second`, res)
            if(res === false)
                this.props.history.push('/login')
            else if(res.success !== false){
                if (res.length !== undefined){
                    this.setState({
                        project: res,
                        isLoadP : true,
                    })
                }else{
                    this.setState({
                        project: {},
                        isLoadP : true,
                    })
                    Toast.ErrorMessage(res.msg)
                }
            }else{
                console.log('ffdfddtirhi')
                if(res.code === 403 || localStorage.getItem("token") === null){
                    // Toast.ErrorMessage(res.msg)
                    this.props.history.push('/login')
                }else{
                    Toast.ErrorMessage(vars.cantConnect)
                }
            }
        })
        Request.getReq(urls.users).then((res) => {
            // console.log(`second`, res)
            if (res === false)
                this.props.history.push('/login')
            else if(res.success !== false){
            this.setState({
                user: res,
                prevUsers : res,
                isLoadU: true,
            })
            }else{
                if (res.code === 403 || !localStorage.getItem("token")) {
                    // Toast.ErrorMessage(res.msg)
                    this.props.history.push('/login')
                } else {
                    Toast.ErrorMessage(vars.cantConnect)
                }
            }
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
    getUsersList = (users) =>{
        var list = []
        for(var u in users){
            // console.log('list: ' + users[u].firstName)
            const user = <UserCard user={users[u]} key={u}/>
            list.push(user)
        }
        return list
    }
    searchProjectCallBack = (projects) =>{
        // console.log(projects);
        if (projects.length !== 0) {
            this.setState({
                project: projects
            })
        }
    }
    userSearchCallBack = (users) =>{
        // console.log(users);
        if(users.length !== 0){
            this.setState({
                user: users
            })
        }
        else{
            this.setState({
                user: this.state.prevUsers
            })
        }
        // console.log(this.state.user)
    }
    render(){
            
        if (this.state.isLoadP && this.state.isLoadU){
            // console.log(this.state.project.length)
            var projectsList,usersList
            // if (this.state.project.length !== undefined){
            projectsList = this.getProjectList(this.state.project)
            // }else{
            //     Toast.ErrorMessage(this.state.project.msg)
            // }
            usersList = this.getUsersList(this.state.user)
        return(
            <div className="home">
            <Header/>
            <div className="content">
                <div className="blueLine">
                    <Title/>
                    <TitleDesc/>
                    <SearchBar callBackFunc={this.searchProjectCallBack}/>
                </div>
                <div className="projects">
                    {projectsList}
                </div>
                <div className="users">
                    <UserSearch callBackFunc={this.userSearchCallBack}/>
                    {usersList}    
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

export default withRouter(Home)