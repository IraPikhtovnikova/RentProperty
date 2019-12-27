import React, { Component } from 'react';

export class EditDeal extends Component {
    displayName = EditDeal.name

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            ddate: "",
            startdate: "",
            enddate: "",
            propobj: "",
            request: "",
            status: "",
            propobjs: [],
            statuses: [],
            requests: [],
            loading: true
        };

        let path = JSON.stringify(this.props.location.pathname);
        let app = path.split('/');
        this.state.id = app[3].slice(0, -1);

        fetch('api/Deal/getdeal/?id=' + this.state.id, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    id: data.id,
                    ddate: data.ddate,
                    startdate: data.startdate,
                    enddate: data.enddate,
                    propobj: data.propobj,
                    request: data.request,
                    status: data.status,
                    loading: false
                });
            });

        fetch('api/Propobj/allobjec', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ propobjs: data, loading: false });
            });

        fetch('api/Statusd/allstatusesd', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ statuses: data, loading: false });
            });

        fetch('api/Request/allreques', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ requests: data, loading: false });
            });

        this.onSubmit = this.onSubmit.bind(this);
        this.onDdateChange = this.onDdateChange.bind(this);
        this.onStartdateChange = this.onStartdateChange.bind(this);
        this.onEnddateChange = this.onEnddateChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.propobjChange = this.propobjChange.bind(this);
        this.requestChange = this.requestChange.bind(this);
    }

    onDdateChange(e) {
        this.setState({ ddate: e.target.value });
    }

    onStartdateChange(e) {
        this.setState({ startdate: e.target.value });
    }

    onEnddateChange(e) {
        this.setState({ enddate: e.target.value });
    }

    propobjChange(e) {
        this.setState({ propobj: e.target.value });
    }

    requestChange(e) {
        this.setState({ request: e.target.value });
    }

    statusChange(e) {
        this.setState({ status: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "id": this.state.id,
            "ddate": this.state.ddate,
            "startdate": this.state.startdate,
            "enddate": this.state.enddate,
            "propobj": this.state.propobj,
            "request": this.state.request,
            "status": this.state.status,
        });
        fetch('api/Deal/editdeal', {
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
        return window.location.href = "/deal";
    };

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            return (
                <div className="container col-sm-3">
                    <h1 className="col-sm-15">Редактировать сделку</h1>
                    <div>
                        <div>
                            <form onSubmit={(e) => this.onSubmit(e)} className="container">
                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Дата сделки</label>
                                    </div>
                                    <div className="col-sm-2">
                                        <input disabled className="form-control" type="date"
                                            value={this.state.ddate}
                                            onChange={this.onDdateChange} style={{ width: 150 }} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Дата начала</label>
                                    </div>
                                    <div className="col-sm-2">
                                        <input disabled className="form-control" type="date"
                                            value={this.state.startdate}
                                            onChange={this.onStartdateChange} style={{ width: 150 }} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Дата окончания</label>
                                    </div>
                                    <div className="col-sm-2">
                                        <input disabled className="form-control" type="date"
                                            value={this.state.enddate}
                                            onChange={this.onEnddateChange} style={{ width: 150 }} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label disabled className="control-label">Статус</label>
                                    </div>

                                    <div className="col-sm-3">
                                        <select  className="form-control" value={this.state.status} onChange={this.statusChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.statuses.map(st =>
                                                <option key={st.id} value={st.id}>{st.sname}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Объект</label>
                                    </div>

                                    <div disabled className="col-sm-3">
                                        <select disabled className="form-control" value={this.state.propobj} onChange={this.propobjChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.propobjs.map(cli =>
                                                <option key={cli.id}
                                                    value={cli.id}>{cli.id} {cli.street} {cli.house} {cli.apartment}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Заявка</label>
                                    </div>

                                    <div className="col-sm-3">
                                        <select disabled className="form-control" value={this.state.request} onChange={this.requestChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.requests.map(realt =>
                                                <option key={realt.id}
                                                    value={realt.id}>№{realt.id} от {realt.clientNavigation.fullname}</option>
                                            )}
                                        </select>
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
