import React from 'react';

export default class EmailList extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
        this.styles = this.styles();
    }
    handleClick(Id,e) {
        console.log(Id,e.target);
        this.props.displayMail(Id);
    }
    render() {
        // console.log(this.props.from);
        let fro = this.props.from[0].p;
        if (!this.props.from[0].p) {
            fro = this.props.from[0].d ? this.props.from[0].d : this.props.from[0].a;
        }
        return (
            <div onClick={this.handleClick.bind(this,this.props.Id)}>
                <li style={this.styles.main} className="email-list hover ellipsis">
                    <div style={this.styles.from} className="mui-text-title mui-text-black from ellipsis">{fro}</div>
                    <div style={this.styles.subject} className="mui-text-body1 mui-text-black subject ellipsis">{this.props.subject}</div>
                    <div style={{display:'none'}}></div>
                </li>
                <div style={this.styles.divider} className="mui-divider divider"></div>
            </div>
        );
    }
    styles() {
        return {
            main: {
                paddingLeft: '5px',
                minHeight: '72px !important'
            },
            divider: {
                position: 'relative',
                bottom: 0
            },
            from: {
                paddingTop:'6px'
            },
            subject: {
                paddingTop: '6px'
            }
        };
    }
}
// <h5>{this.props.id}</h5>
// <p>{this.props.f}</p>
/*<p>{this.props.brief}</p>*/
