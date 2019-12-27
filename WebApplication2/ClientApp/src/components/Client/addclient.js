import React, { Component } from 'react';

export class AddClient extends Component {
    displayName = "Добавить клиента"

    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            phone: "",
            email: "",
            passport: "",
            loading: true
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onPassportChange = this.onPassportChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onNameChange(e) {
        this.setState({ fullname: e.target.value });
    }

    onPhoneChange(e) {
        this.setState({ phone: e.target.value });
    }

    onPassportChange(e) {
        this.setState({ passport: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "fullname": this.state.fullname,
            "phone": this.state.phone,
            "email": this.state.email,
            "passport": this.state.passport,
        });
        fetch('api/Client/newclient', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
            body: data,
        }).then(response => {
            console.log(response);
        });
        return window.location.href = "/client";
    };

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        return (
            <div className="container col-sm-3">
                <h1 className="col-sm-15">Добавить клиента</h1>
                <div>
                    <div>
                        <form onSubmit={(e) => this.onSubmit(e)} className="container">
                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">ФИО</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.fullname}
                                        onChange={this.onNameChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Телефон</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.phone}
                                        onChange={this.onPhoneChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Паспорт</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.passport}
                                        onChange={this.onPassportChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Email</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.email}
                                        onChange={this.onEmailChange} />
                                </div>
                            </div>

                            <input type="submit" value="Сохранить" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        );

        }
    }
}