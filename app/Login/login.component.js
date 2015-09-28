import React from 'react';
import User from '../Helpers/user.info';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: (User.getUserInfo().password ? true : false)
        };
        this.HandleLogin = this.HandleLogin.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
        this.styles = this.styles();

    }
    componentDidMount() {
        this.refs.checker.getDOMNode().checked = User.getUserInfo().email ? true: false;
    }
    ErrorHandler() {
        return (
            <p>
                Something wrong
            </p>
        );
    }
    HandleLogin() {
        var email = (this.refs.userId.getDOMNode().value);
        var pass = (this.refs.password.getDOMNode().value);
        var save = this.refs.checker.getDOMNode().checked;
        User.setUserInfo(email,pass,save);
        this.props.loginHandler(true);
    }
    HandleChange() {
        var check = this.refs.checker.getDOMNode().checked;
        if (!check) {
            User.setUserInfo('','',true);
        }
    }
    render() {
        console.log(User.isLogged());
        this.styles.main.display = User.isLogged()  ? 'none' : 'flex';
        return (
            <div style={this.styles.main}>
              <div className="">
                <input style={this.styles.input} ref="userId" type="text" placeholder={User.getUserInfo().email ? User.getUserInfo().email : 'email'}/>
              </div>
              <div className="">
                <input style={this.styles.input} ref="password" type="password" placeholder="password"/>
              </div>
              <div style={this.styles.checkbox} className="checker layout-row">
                  <div style={{paddingRight:"10px"}} className="mui-text-caption mui-text-black" >Remember me</div>
                  <div>
                  <input type="checkbox" ref="checker" onChange={this.HandleChange} />
                  </div>
              </div>
              <div className="loginButton hover">
                  <a style={this.styles.button} onClick={this.HandleLogin} >Login </a>
              </div>
            </div>
        );
    }
    styles() {
        return {
            main: {
                display: 'flex',
                flexDirection : 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            },
            checkbox: {
                width:'250px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
            },
            input: {
                userSelect: 'text',
                lineHeight: '20px',
                fontSize: '15px',
                minHeight: '20px',
                border: 'none',
                padding: '8px 12px',
                width: '100%',
                outline: 'none'
            },
            button : {
                backgroundColor: '#f47e7e',
                borderRadius: '5px',
                padding: '5px 20px',
                fontSize: '22px',
                textDecoration: 'none',
                margin: '20px',
                color: '#fff',
                position: 'relative',
                display: 'inline-block'

            }
        };
    }
}
