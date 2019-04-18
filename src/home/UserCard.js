import React, {
    Component
} from 'react';
import '../style/home.scss'
import {
    Card,
    Row,
    Col,
    Image,
} from 'react-bootstrap'
import {
    withRouter
} from 'react-router-dom'
class UserCard extends Component {
    constructor(props){
        super(props)

        this.state = {user: {}}
    }
    componentWillMount = () => {
        this.setState({
            user: this.props.user
        })
    }
    handleClick = (event) =>{
        const id = this.props.user.id
        this.props.history.push('/user?id=' + id)
    }
    render(){
        console.log(this.state)
        const fullName = this.state.user.firstName+ ' ' + this.state.user.lastName
        return(
            <Card className="user-card" onClick={this.handleClick}>
                <Row className="user-card-row">
                    <Col className="user-image" lg={4} md={4}>
                        <Image src={this.state.user.profilePictureURL}/>
                    </Col>
                    <Col className="user-info" lg={8} md={8}>
                        <Row className="user-name">
                            {fullName}
                        </Row>
                        <Row className="user-desc">
                            {
                                this.state.user.jobTitle
                            }
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }
}
export default withRouter(UserCard)
