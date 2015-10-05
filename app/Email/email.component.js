import React from 'react';
import Helper from '../Helpers/helper';


export default class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:  localStorage.getItem(this.props.Id+'email') ? localStorage.getItem(this.props.Id+'email') : {}
        };
        this.componentDidMount.bind(this);
        this.PopulateEmail.bind(this);
        this.componentHasEmail.bind(this);
        this.populateFirstTenEmails(this.props.firstTen);
        console.log('here');
    }
    ErrorHandler() {
        return (
            <p>
                Oops there was an error !
            </p>
        );
    }
    PopulateEmail(email, id) {
        console.log(email);
        var great = email;
        this.setState({email:great});
        localStorage.setItem(id+'email', JSON.stringify(email));
    }
    populateFirstTenEmails(ids) {
        let helper = new Helper();
        console.log('here',ids);
        ids.forEach(function(e) {
            helper.mail(e).end((err, res) => {
                if (!err) {
                    console.log('populating email');
                    // this.PopulateEmail(res.body,nextProps.Id);
                    localStorage.setItem(e+'email', JSON.stringify(res.body));
                } else {
                    console.error(err);

                }
            });
        });
    }
    componentHasEmail(id) {
        return localStorage.getItem(id+'email') ;
    }
    componentWillReceiveProps(nextProps) {
        let helper = new Helper();
        let email = this.componentHasEmail(nextProps.Id);
        if (email) {
            this.setState({email:JSON.parse(email)});
        }
        else {
            helper.mail(nextProps.Id).end((err, res) => {
                if (!err) {
                    console.log(res.body);
                    this.PopulateEmail(res.body,nextProps.Id);
                } else {
                    console.error(err);
                    this.setState({
                        email: this.ErrorHandler(err)
                    });
                }
            });
        }
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
        console.log(this.props.firstTen);
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
