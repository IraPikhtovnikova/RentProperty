import React, { Component } from 'react';

export class AddStatusr extends Component {
    displayName = "Добавить статус"

    constructor(props) {
        super(props);
        this.state = {
            sname: "",
            sdescr: "",
            loading: true
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescrChange = this.onDescrChange.bind(this);
    }

    onNameChange(e) {
        this.setState({ sname: e.target.value });
    }

    onDescrChange(e) {
        this.setState({ sdescr: e.target.value });
    }


    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "sname": this.state.sname,
            "sdescr": this.state.sdescr,
        });
        fetch('api/Statusr/newstatusr', {
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
        return window.location.href = "/rstatus";
    };

    render() {
        //if (!sessionStorage.getItem('Token')) {
        //    return window.location.href = "/auth/login";
        //} else {
        return (
            <div className="container col-sm-3">
                <h1 className="col-sm-15">Добавить статус заявки</h1>
                <div>
                    <div>
                        <form onSubmit={(e) => this.onSubmit(e)} className="container">
                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Название</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.sname}
                                        onChange={this.onNameChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Описание</label>
                                </div>

                                <div className="col-sm-7">
                                    <input className="form-control" type="text"
                                        value={this.state.sdescr}
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

    //}
}
