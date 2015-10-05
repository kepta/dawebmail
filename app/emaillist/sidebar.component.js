import React from 'react';
import EmailList from './emailList.component';
import Helper from '../Helpers/helper';
import User from '../Helpers/user.info';
let helper = new Helper();

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mails: [],
            loaded: false
        };
        var self = this;
        this.componentDidMount.bind(this);
        this.PopulateEmails.bind(this);
        this.GetEmails.bind(this);
        this.styles= this.styles();
    }
    ErrorHandler() {
        return (
            <p>Oops there was an error !</p>
        );
    }
    PopulateEmails(mailArg) {
        var mails = mailArg.map((mail) => {
            return (
                <EmailList
                    brief={mail.fr}
                    f={mail.f}
                    from={mail.e}
                    Id={mail.id}
                    subject={mail.su}
                    displayMail={this.props.displayMail}/>
            );
        }).reverse();
        var firstTen = mailArg.map((mail) => mail.id);
        firstTen = firstTen.slice(0,10);
        this.setState({mails,loaded: true});
        // console.log(firstTen);
        // this.props.firstTen(firstTen);
    }
    GetEmails() {
        helper.mail().end((err, res) => {
            if (!err) {
                this.PopulateEmails(res.body.m);
            } else {
                console.error(err);
                this.setState({
                    mails: this.ErrorHandler(err)
                });
            }
        });
    }
    componentDidMount() {
        this.GetEmails();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.loggedIn);
        this.GetEmails();
    }

    render() {
        this.styles.display  =  !User.isLogged() ?  'none': 'flex';
        return (
            <div style={this.styles} className="mui-col-sm-4 mui-col-md-4">
                <SidePanel />
                <SideContent mails={this.state.mails} />
            </div>
        );
    }
    styles() {
        return {
            height: '100%',
            wordWrap: 'break-word',
            paddingLeft: '0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '0'
        };
    }
}
class SideContent extends React.Component {
    constructor(props) {
        super(props);
        this.styles = this.styles();
    }
    render() {
        return (
            <div style={this.styles.main} className="list-content">
                <ul style={this.styles.ul}>
                    {this.props.mails}
                </ul>
            </div>
        );
    }
    styles() {
        return {
            main: {
                paddingTop:'4px',
                flex:1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '5px'
            },
            ul: {
                padding: '0px',
                overflowY: 'scroll'
            }
        };
    }
}
class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.styles = this.styles();
    }
    render() {
        return (
            <div className="cream-bg">
                <TitleBar />
                <div className="mui-divider divider"></div>
                <SearchBox />
                <div className="mui-divider divider"></div>
            </div>
        );
    }
    styles() {
        return {
            width: '100%',
            height: '100px',
            backgroundcolor: 'white',
            zIndex:5000
        };
    }
}
class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.styles = this.styles();
    }
    render() {
        return (
            <div style={this.styles.main}>
                <div style={this.styles.inner}
                    className= "ellipsis
                                mui-text-title
                                mui-text-black
                                mui-col-xs-10
                                mui-col-xs-offset-1
                                ">{User.getUserInfo().email}
                </div>
            </div>
        );
    }
    styles() {
        return  {
            main : {
                height: '50px'
            },
            inner : {
                marginTop: '6px'
            }
        };
    }
}
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.styles = this.styles();
    }
    render() {
        return (
            <div style={this.styles.main}>
                <div style={this.styles.box} className="mui-col-xs-10 mui-col-xs-offset-1">
                    <input style={this.styles.input} type="text" placeholder="Search"/>
                </div>
            </div>
        );
    }
    styles() {
        return {
            main : {
                height:'50px'
            },
            box: {
                boxSizing: 'border-box',
                alignItems: 'center',
                marginTop: '6px',
                border: '1px solid #f6f6f6',
                backgroundColor:'#fff',
                borderRadius: '5px',
                height: '38px'
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
            }
        };
    }
}
