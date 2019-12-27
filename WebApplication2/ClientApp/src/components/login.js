    import React, { Component } from 'react';

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            tokenKey: "",
        };

        // col.setAttribute('display', 'none');
        // let token = this.state.tokenKey;
        // sessionStorage.setItem('token', 'key');
        console.log(sessionStorage.getItem('token'));
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onLoginChange(e) {
        this.setState({ login: e.target.value });
    }

    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "login": this.state.login,
            "password": this.state.password,
        });
        fetch('api/user/Token', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('Token', data.access_token);
                if (sessionStorage.getItem('Token')) {
                    return window.location.href = "/";

                }
            });
    };

    render() {
        return (
            <div className="container col-sm-3">
                <h1 className="col-sm-15">Авторизация</h1>
                <div>
                    <div>
                        <form onSubmit={(e) => this.onSubmit(e)} className="container">
                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Логин</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.login}
                                        onChange={this.onLoginChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Пароль</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="password"
                                        value={this.state.password}
                                        onChange={this.onPasswordChange} />
                                </div>
                            </div>
                            <input className="authButton" type="submit" value="Войти" className="btn btn-primary" />
                    </form>
                </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        let col = document.getElementsByClassName('col-sm-3');
        let style = col.item(0);
        //style.style.display = "none";
        let col9 = document.getElementsByClassName('col-sm-9');
        let style9 = col9.item(0);
        // style9.style.marginLeft = 0;
        //style9.style.margin = "8% 30% 0 32%";
    }
}
