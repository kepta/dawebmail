import React from 'react';
import Helper from '../Helpers/helper';


export default class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {}
        };
        this.componentDidMount.bind(this);
        this.PopulateEmail.bind(this);
    }
    ErrorHandler() {
        return (
            <p>
                Oops there was an error !
            </p>
        );
    }
    PopulateEmail(email) {
        console.log(email);
        var great = email;
        this.setState({email:great});
    }
    componentWillReceiveProps(nextProps) {
        let helper = new Helper();
        helper.mail(nextProps.Id).end((err, res) => {
            if (!err) {
                console.log(res.body);
                this.PopulateEmail(res.body);
            } else {
                console.error(err);
                this.setState({
                    email: this.ErrorHandler(err)
                });
            }
        });
    }
    componentDidMount() {
        let helper = new Helper();
        helper.mail(this.props.Id).end((err, res) => {
            if (!err && this.props.Id) {
                this.PopulateEmail(res.body.m);
            } else {
                console.error(err);
                this.setState({
                    email: this.ErrorHandler(err)
                });
            }
        });
    }
    render() {
        var createMarkup =  () => {
            return {__html : this.state.email.text };
        };
        return (
            <div className = {'email-wrapper'}>
                <div className= {'headers cream-bg'} />
                <div className = {'email-text'} dangerouslySetInnerHTML={createMarkup()} />
            </div>

        );
    }
}
