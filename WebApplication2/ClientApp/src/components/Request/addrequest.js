import React, { Component } from 'react';

export class AddRequest extends Component {
    displayName = "Добавить заявку"

    constructor(props) {
        super(props);
        this.state = {
            pricemin: "",
            pricemax: "",
            areamin: "",
            areamax: "",
            roomscountmin: "",
            roomscountmax: "",
            floormin: "",
            floormax: "",
            floorscountmin: "",
            floorscountmax: "",
            status: "",
            client: "",
            typpe: "",
            realtor: "",
            clients: [],
            typpes: [],
            realtors: [],
            statuses: [],
            loading: true
        };

        fetch('api/Type/alltypes', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ typpes: data, loading: false });
            });

        fetch('api/Client/allclients', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ clients: data, loading: false });
            });

        fetch('api/Realtor/allrealtors', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ realtors: data, loading: false });
            });

        fetch('api/Statusr/allstatuses', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ statuses: data, loading: false });
            });

        this.onSubmit = this.onSubmit.bind(this);
        this.onPriceminChange = this.onPriceminChange.bind(this);
        this.onPricemaxChange = this.onPricemaxChange.bind(this);
        this.onAreaminChange = this.onAreaminChange.bind(this);
        this.onAreamaxChange = this.onAreamaxChange.bind(this);
        this.onRoomscountminChange = this.onRoomscountminChange.bind(this);
        this.onRoomscountmaxChange = this.onRoomscountmaxChange.bind(this);
        this.onFloorminChange = this.onFloorminChange.bind(this);
        this.onFloormaxChange = this.onFloormaxChange.bind(this);
        this.onFloorscountminChange = this.onFloorscountminChange.bind(this);
        this.onFloorscountmaxChange = this.onFloorscountmaxChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.clientChange = this.clientChange.bind(this);
        this.typpeChange = this.typpeChange.bind(this);
        this.realtorChange = this.realtorChange.bind(this);
    }

    onPriceminChange(e) {
        this.setState({ pricemin: e.target.value });
    }

    onPricemaxChange(e) {
        this.setState({ pricemax: e.target.value });
    }

    onAreaminChange(e) {
        this.setState({ areamin: e.target.value });
    }

    onAreamaxChange(e) {
        this.setState({ areamax: e.target.value });
    }

    onRoomscountminChange(e) {
        this.setState({ roomscountmin: e.target.value });
    }

    onRoomscountmaxChange(e) {
        this.setState({ roomscountmax: e.target.value });
    }

    onFloorminChange(e) {
        this.setState({ floormin: e.target.value });
    }

    onFloormaxChange(e) {
        this.setState({ floormax: e.target.value });
    }

    onFloorscountminChange(e) {
        this.setState({ floorscountmin: e.target.value });
    }

    onFloorscountmaxChange(e) {
        this.setState({ floorscountmax: e.target.value });
    }

    statusChange(e) {
        this.setState({ status: e.target.value });
    }

    clientChange(e) {
        this.setState({ client: e.target.value });
    }

    typpeChange(e) {
        this.setState({ typpe: e.target.value });
    }

    realtorChange(e) {
        this.setState({ realtor: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "pricemin": this.state.pricemin,
            "pricemax": this.state.pricemax,
            "areamin": this.state.areamin,
            "areamax": this.state.areamax,
            "roomscountmin": this.state.roomscountmin,
            "roomscountmax": this.state.roomscountmax,
            "floormin": this.state.floormin,
            "floormax": this.state.floormax,
            "floorscountmin": this.state.floorscountmin,
            "floorscountmax": this.state.floorscountmax,
            "status": this.state.status,
            "client": this.state.client,
            "typpe": this.state.typpe,
            "realtor": this.state.realtor,
        });
        fetch('api/Request/newrequest', {
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
        return window.location.href = "/request";
    };

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            return (
                <div className="container col-sm-3">
                    <h1 className="col-sm-15">Добавить заявку</h1>
                    <div>
                        <div>
                            <form onSubmit={(e) => this.onSubmit(e)} className="container">
                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Цена</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-1">от</div>
                                        <div className="col-sm-2">
                                        <input className="form-control" type="text"
                                            value={this.state.pricemin}
                                                onChange={this.onPriceminChange} style={{ width: 150 }} />
                                        </div>
                                            <div className="col-sm-1">до</div>
                                            <div className="col-sm-3"><input className="form-control" type="text"
                                                value={this.state.pricemax}
                                                onChange={this.onPricemaxChange} style={{ width: 150 }} /></div>
                                    </div>                                    
                                </div>

                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Площадь</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-1">от</div>
                                        <div className="col-sm-2">
                                            <input className="form-control" type="text"
                                                value={this.state.areamin}
                                                onChange={this.onAreaminChange} style={{ width: 150 }} />
                                        </div>
                                        <div className="col-sm-1">до</div>
                                        <div className="col-sm-3"><input className="form-control" type="text"
                                            value={this.state.areamax}
                                            onChange={this.onAreamaxChange} style={{ width: 150 }} /></div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Этаж</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-1">от</div>
                                        <div className="col-sm-2">
                                            <input className="form-control" type="text"
                                                value={this.state.floormin}
                                                onChange={this.onFloorminChange} style={{ width: 150 }} />
                                        </div>
                                        <div className="col-sm-1">до</div>
                                        <div className="col-sm-3"><input className="form-control" type="text"
                                            value={this.state.floormax}
                                            onChange={this.onFloormaxChange} style={{ width: 150 }} /></div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2 col-md-auto">
                                        <label className="control-label">Этажность</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-1">от</div>
                                        <div className="col-sm-2">
                                            <input className="form-control" type="text"
                                                value={this.state.floorscountmin}
                                                onChange={this.onFloorscountminChange} style={{ width: 150 }} />
                                        </div>
                                        <div className="col-sm-1">до</div>
                                        <div className="col-sm-3"><input className="form-control" type="text"
                                            value={this.state.floorscountmax}
                                            onChange={this.onFloorscountmaxChange} style={{ width: 150 }} /></div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Статус</label>
                                    </div>

                                    <div className="col-sm-3">
                                        <select className="form-control" value={this.state.status} onChange={this.statusChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.statuses.map(st =>
                                                <option key={st.id} value={st.id}>{st.sname}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Клиент</label>
                                    </div>

                                    <div className="col-sm-3">
                                        <select className="form-control" value={this.state.client} onChange={this.clientChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.clients.map(cli =>
                                                <option key={cli.id}
                                                    value={cli.id}>{cli.fullname}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Риэлтор</label>
                                    </div>

                                    <div className="col-sm-3">
                                        <select className="form-control" value={this.state.realtor} onChange={this.realtorChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.realtors.map(realt =>
                                                <option key={realt.id}
                                                    value={realt.id}>{realt.fullname}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-2">
                                        <label className="control-label">Тип</label>
                                    </div>

                                    <div className="col-sm-3">
                                        <select className="form-control" value={this.state.typpe} onChange={this.typpeChange}>
                                            <option style={{ display: 'none' }}></option>
                                            {this.state.typpes.map(tp =>
                                                <option key={tp.id}
                                                    value={tp.id}>{tp.tname}</option>
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