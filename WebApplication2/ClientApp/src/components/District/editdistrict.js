﻿import React, { Component } from 'react';


export class EditDistrict extends Component {
    displayName = EditDistrict.name

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            dname: "",
            ddescr: "",
            loading: true
        };

        let path = JSON.stringify(this.props.location.pathname);
        let app = path.split('/');
        this.state.id = app[3].slice(0, -1);

        fetch('api/District/getdistrict/?id=' + this.state.id, {
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
                    dname: data.dname,
                    ddescr: data.ddescr,
                    loading: false
                });
            });

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescrChange = this.onDescrChange.bind(this);
    }

    onNameChange(e) {
        this.setState({ dname: e.target.value });
    }

    onDescrChange(e) {
        this.setState({ ddescr: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "id": this.state.id,
            "dname": this.state.dname,
            "ddescr": this.state.ddescr,
        });
        fetch('api/District/editdistrict', {
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
        return window.location.href = "/district";
    };

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        return (
            <div className="container col-sm-3">
                <h1 className="col-sm-15">Редактировать район</h1>
                <div>
                    <div>
                        <form onSubmit={(e) => this.onSubmit(e)} className="container">
                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Название</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.dname}
                                        onChange={this.onNameChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Описание</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.ddescr}
                                        onChange={this.onDescrChange} />
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
