import React, { Component } from 'react';

export class EditRealtor extends Component {
    displayName = EditRealtor.name

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            fullname: "",
            phone: "",
            email: "",
            loading: true
        };

        let path = JSON.stringify(this.props.location.pathname);
        let app = path.split('/');
        this.state.id = app[3].slice(0, -1);

        fetch('api/Realtor/getrealtor/?id=' + this.state.id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    id: data.id,
                    fullname: data.fullname,
                    phone: data.phone,
                    email: data.email,
                    loading: false
                });
            });

        this.onSubmit = this.onSubmit.bind(this);
        this.onFullnameChange = this.onFullnameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
    }

    onFullnameChange(e) {
        this.setState({ fullname: e.target.value });
    }

    onPhoneChange(e) {
        this.setState({ phone: e.target.value });
    }

    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "id": this.state.id,
            "fullname": this.state.fullname,
            "phone": this.state.phone,
            "email": this.state.email,
        });
        fetch('api/Realtor/editrealtor', {
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
        return window.location.href = "/realtor";
    };

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        return (
            <div className="container col-sm-3">
                <h1 className="col-sm-15">Редактировать риэлтора</h1>
                <div>
                    <div>
                        <form onSubmit={(e) => this.onSubmit(e)} className="container">
                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">ФИО</label>
                                </div>

                                <div className="col-sm-5">
                                    <input className="form-control" type="text"
                                        value={this.state.fullname}
                                        onChange={this.onFullnameChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Телефон</label>
                                </div>

                                <div className="col-sm-5">
                                    <input className="form-control" type="text"
                                        value={this.state.phone}
                                        onChange={this.onPhoneChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Email</label>
                                </div>

                                <div className="col-sm-5">
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
