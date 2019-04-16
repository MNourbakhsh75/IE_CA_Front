import React, { Component } from 'react';
import '../style/user.scss'
import Header from '../common/Header'
import Footer from '../common/Footer'
import TopBar from '../common/TopBar'


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
                    </div>
                <Footer/>
            </div>
        );
    }
}
export default user;