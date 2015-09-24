import Request from 'superagent';
import User from './user.info';
export default class Helper {
    constructor() {
        this.statics = {};
        this.statics.address = User.ip;
    }
    mail(id) {
        var url = this.statics.address + '/'+ User.email;
        if (id) {
            url  = url + '/mail/'+id;
        }
        console.log(url);
        return Request.get(url)
            .auth(User.email,User.password);
    }
}
