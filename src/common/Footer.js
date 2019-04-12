import React, { Component } from 'react';
import '../style/footer.scss'

const message = {
    copyRight : 'تمامی حقوق این سایت متعلق به جاب اونجا می باشد ©'
}

class Footer extends Component{
    render(){
        return(
            <footer className="footer text-center">
                <div className="text">
                    {message.copyRight}
                </div>
            </footer>
        );
    }
}

export default Footer