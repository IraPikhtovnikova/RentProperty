import React, { Component } from 'react';

export class EditPropobj extends Component {
    displayName = EditPropobj.name

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            street: "",
            house: "",
            apartment: "",
            roomscount: "",
            floor: "",
            area: "",
            floorscount: "",
            price: "",
            pdescr: "",
            district: "",
            typpe: "",
            client: "",
            realtor: "",
            districts: [],
            typpes: [],
            clients: [],
            realtors: [],
            loading: true
        };

        let path = JSON.stringify(this.props.location.pathname);
        let app = path.split('/');
        this.state.id = app[3].slice(0, -1);

        fetch('api/Propobj/getpropobj/?id=' + this.state.id, {
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
                    street: data.street,
                    house: data.house,
                    apartment: data.apartment,
                    roomscount: data.roomscount,
                    floor: data.floor,
                    area: data.area,
                    floorscount: data.floorscount,
                    price: data.price,
                    pdescr: data.pdescr,
                    district: data.districtNavigation.id,
                    typpe: data.typpeNavigation.id,
                    client: data.clientNavigation.id,
                    realtor: data.realtorNavigation.id,
                    loading: false
                });
            });

        fetch('api/District/alldistricts', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ districts: data, loading: false });
            });

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

        this.onSubmit = this.onSubmit.bind(this);
        this.districtChange = this.districtChange.bind(this);
        this.typpeChange = this.typpeChange.bind(this);
        this.clientChange = this.clientChange.bind(this);
        this.realtorChange = this.realtorChange.bind(this);
        this.onStreetChange = this.onStreetChange.bind(this);
        this.onHouseChange = this.onHouseChange.bind(this);
        this.onApartmentChange = this.onApartmentChange.bind(this);
        this.onRoomscountChange = this.onRoomscountChange.bind(this);
        this.onFloorChange = this.onFloorChange.bind(this);
        this.onAreaChange = this.onAreaChange.bind(this);
        this.onFloorscountChange = this.onFloorscountChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onPdescrChange = this.onPdescrChange.bind(this);
    }

    districtChange(e) {
        this.setState({ district: e.target.value });
    }

    typpeChange(e) {
        this.setState({ typpe: e.target.value });
    }

    clientChange(e) {
        this.setState({ client: e.target.value });
    }

    realtorChange(e) {
        this.setState({ realtor: e.target.value });
    }

    onStreetChange(e) {
        this.setState({ street: e.target.value });
    }

    onHouseChange(e) {
        this.setState({ house: e.target.value });
    }

    onApartmentChange(e) {
        this.setState({ apartment: e.target.value });
    }

    onRoomscountChange(e) {
        this.setState({ roomscount: e.target.value });
    }

    onFloorChange(e) {
        this.setState({ floor: e.target.value });
    }

    onAreaChange(e) {
        this.setState({ area: e.target.value });
    }

    onFloorscountChange(e) {
        this.setState({ floorscount: e.target.value });
    }

    onPriceChange(e) {
        this.setState({ price: e.target.value });
    }

    onPdescrChange(e) {
        this.setState({ pdescr: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            "id": this.state.id,
            "street": this.state.street,
            "house": this.state.house,
            "apartment": this.state.apartment,
            "roomscount": this.state.roomscount,
            "floor": this.state.floor,
            "area": this.state.area,
            "floorscount": this.state.floorscount,
            "price": this.state.price,
            "pdescr": this.state.pdescr,
            "district": this.state.district,
            "typpe": this.state.typpe,
            "client": this.state.client,
            "realtor": this.state.realtor,
        });
        fetch('api/Propobj/editpropobj', {
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
        return window.location.href = "/propobj";
    };

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        return (
            <div className="container col-sm-3">
                <h1 className="col-sm-15">Редактировать объект</h1>
                <div>
                    <div>
                        <form onSubmit={(e) => this.onSubmit(e)} className="container">
                            <div className="row">
                                <div className="col-sm-2 col-md-auto">
                                    <label className="control-label">Улица</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="text"
                                        value={this.state.street}
                                        onChange={this.onStreetChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Дом</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="text"
                                        value={this.state.house}
                                        onChange={this.onHouseChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Квартира</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="number"
                                        value={this.state.apartment}
                                        onChange={this.onApartmentChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Кол-во комнат</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="number"
                                        value={this.state.roomscount}
                                        onChange={this.onRoomscountChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Этаж</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="text"
                                        value={this.state.floor}
                                        onChange={this.onFloorChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Площадь</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="text"
                                        value={this.state.area}
                                        onChange={this.onAreaChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Этажей в доме</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" className="form-control" type="text"
                                        value={this.state.floorscount}
                                        onChange={this.onFloorscountChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Стоимость (мес.)</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="text"
                                        value={this.state.price}
                                        onChange={this.onPriceChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Описание</label>
                                </div>

                                <div className="col-sm-3">
                                    <input className="form-control" type="text"
                                        value={this.state.pdescr}
                                        onChange={this.onPdescrChange} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Район</label>
                                </div>

                                <div className="col-sm-3">
                                    <select className="form-control" value={this.state.district} onChange={this.districtChange}>
                                        <option style={{ display: 'none' }}></option>
                                        {this.state.districts.map(dist =>
                                            <option key={dist.id} value={dist.id}>{dist.dname}</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Тип объекта</label>
                                </div>

                                <div className="col-sm-3">
                                    <select className="form-control" value={this.state.typpe} onChange={this.typpeChange}>
                                        <option style={{ display: 'none' }}></option>
                                        {this.state.typpes.map(typ =>
                                            <option key={typ.id} value={typ.id}>{typ.tname}</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">Владелец</label>
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

                            <input type="submit" value="Сохранить" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    }
}
