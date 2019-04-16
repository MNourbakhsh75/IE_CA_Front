import React, { Component } from 'react';
import '../style/user.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import TopBar from '../common/TopBar'
import {
    Row,
    Button,
    Image,
    Col
} from 'react-bootstrap'
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

        this.state = {}
    }

    render(){
        return(
            <Row className="add-skill-row">
                <label className="label-for-skill">مهارت ها: </label>
                <div className="skill-list">
                    <select id="select-field" name="options">
                        <option value="" disabled selected> --انتخاب مهارت-- </option>
                        <option value="1">react</option>
                        <option value="2">app design</option>
                        <option value="3">photoshop</option>
                        <option value="4">jquery</option>
                    </select>
                    <button className="btn add-skill-btn">افزودن مهارت </button>
                </div>
            </Row>
        );
    }
}

class SkillBox extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
            return (
                <Row className="skills-boxes">
                    <div className="skill-box">
                    <div className="skill-box-child name">
                        HTML
                    </div>
                    <div className="skill-box-child point">
                        5
                    </div>
                </div>
                </Row>
            );
    }
}


class user extends Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return(
            <div className="user">
                <Header/>
                    <div className="content">
                        <TopBar/>
                        <ProfileTitle/>
                        <Bio/>
                        <AddSkill/>
                        <SkillBox/>
                    </div>
                <Footer/>
            </div>
        );
    }
}
export default user;