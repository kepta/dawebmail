import React from 'react';

import SideBar from './EmailList/sidebar.component';
import Email from './Email/email.component';
import Login from './Login/login.component';
import User from './Helpers/user.info';

class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach(method => this[method] = this[method].bind(this));
    }
}
class Logout extends BaseComponent {
    constructor(props) {
        super(props);
        this.styles = this.styles();
        this.handler = this.handler.bind(this);
    }
    handler() {
        User.setUserInfo('','',true);
        window.location.reload();
    }
    render() {
        this.styles.main.display = User.isLogged() ?  'auto': 'none' ;
        return (
            <div style={this.styles.main}>
                <div style={this.styles.text} onClick={this.handler} className="mui-text-headline hover ">Logout</div>
            </div>
        );
    }
    styles() {
        return {
            main: {
                position: 'absolute',
                top: '5px',
                right: '10px'

            },
            text : {
                color: 'white !important'
            }
        }
    }
}
export default class Webmail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            Id : null,
            loggedIn :  User.isLogged()
        };

        this.hideLogin = false;
        this._bind('displayMail','loginHandler');
    }
    displayMail(Id) {
        console.log(this);
        this.setState({
            Id
        });
    }
    loginHandler(loggedIn) {
        this.setState({
            loggedIn
        });
    }
    render() {
        var hide= {display: 'none'};
        return (
            <div className="webmail-wrapper wrapper-margin">
                    <SideBar  displayMail={this.displayMail} loggedIn={this.state.loggedIn}/>
                    <Login loginHandler = {this.loginHandler}/>
                    <Email Id={this.state.Id} loggedIn={this.state.loggedIn}/>
                    <Logout/>
            </div>
        );
    }
}//
