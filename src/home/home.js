import React, { Component } from 'react';
import '../style/home.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import * as Request from '../common/Request'
import SpinLoader from '../common/SpinLoader'
import ProjectCard from '../home/ProjectCard'
import UserCard from '../home/UserCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    Card,
    Form,
    InputGroup,
    Row,
    Button,
} from 'react-bootstrap'
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
    users : 'http://localhost:8084/joboonja/user'
}
toast.configure()
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
class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
        isLoadP : false,
        isLoadU : false,
        project: [],
        user: [],
        }
    }
    componentDidMount = () =>{
        Request.getReq(urls.projects).then((res) => {
            // console.log(`second`, res)
            if(res !== false){
                this.setState({
                    project: res,
                    isLoadP : true,
                })
            }else{
                toast.error(vars.cantConnect, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
            }
        })
        Request.getReq(urls.users).then((res) => {
            // console.log(`second`, res)
            if(res !== false){
            this.setState({
                user: res,
                isLoadU: true,
            })
            }else{
                toast.error(vars.cantConnect, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                });
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
            const user = <UserCard user={users[u]} key={u}/>
            list.push(user)
        }
        return list
    }
    render(){
            
        if (this.state.isLoadP && this.state.isLoadU){
            console.log(this.state)
            const projectsList = this.getProjectList(this.state.project)
            const usersList = this.getUsersList(this.state.user)
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
                    {projectsList}
                </div>
                <div className="users">
                    <UserSearch/>
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

export default Home