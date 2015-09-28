var user = {
    email: '201301189',
    password: 'k5eZ64Ji9',
    ip: 'http://188.166.251.172/api/webmail'
};
class User {
    constructor() {
        this.userInfo = {
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
        };
        this.ip = 'http://188.166.251.172/api/webmail';
        this.setUserInfo = this.setUserInfo
            .bind(this);
        this.getUserInfo = this.getUserInfo
            .bind(this);
        this.getIP
            .bind(this);
        this.isLogged = this.isLogged.bind(this);
    }
    setUserInfo(email, password, save) {
        this.userInfo.email = email;
        this.userInfo.password = password;
        if (save) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        }
        return;
    }
    getIP() {
        return this.ip;
    }
    isLogged() {
        console.log('logged in ',typeof this.userInfo.email === 'string' && typeof this.userInfo.password === 'string' &&  this.userInfo.email.length !== 0 )  ;
        return (typeof this.userInfo.email === 'string') && (typeof this.userInfo.password === 'string') &&  (this.userInfo.email.length !== 0);
    }
    getUserInfo() {
        return {
            email: this.userInfo.email,
            password: this.userInfo.password
        };
    }
};
export default user = new User();
