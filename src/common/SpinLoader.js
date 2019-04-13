import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

class SpinLoader extends Component {
    render(){
        return(
            <div className="loader" style={{position: "absolute",top : "35%",left: "40%"}}>
                < Loader type = "Triangle"
                color = "#00BFFF"
                height = "200"
                width = "200" />
            </div>
        );
    }
}

export default SpinLoader