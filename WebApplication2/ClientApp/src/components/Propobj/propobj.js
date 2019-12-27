import React, { Component } from 'react';

export class Propobj extends Component {
    displayName = Propobj.name

    constructor(props) {
        super(props);
        this.state = { propobjs: [], loading: true };

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
    }

    static renderPropobjTable(propobjs) {
        return (
            <table class="table table-bordered table-hover">
                <thead>
                    <tr className="align-middle align-center">
                        <th>№</th>
                        <th>Тип</th>
                        <th>Район</th>
                        <th>Улица</th>
                        <th>Дом</th>
                        <th>Этаж</th>
                        <th>Кв.</th>
                        <th>Кол. ком.</th>                        
                        <th>Площ.(м2)</th>
                        <th>Цена (мес.)</th>                      
                        <th>Владелец</th>
                        <th>Риэлтор</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {propobjs.map(propobj =>
                        <tr key={propobj.id} className="align-bottom">
                            <td>{propobj.id}</td>
                            <td>{propobj.typpeNavigation.tname}</td>
                            <td>{propobj.districtNavigation.dname}</td>
                            <td>{propobj.street}</td>
                            <td>{propobj.house}</td>
                            <td>{propobj.floor} из {propobj.floorscount}</td>
                            <td>{propobj.apartment}</td>
                            <td>{propobj.roomscount}</td>           
                            <td>{propobj.area}</td>
                            <td>{propobj.price}&#8381;</td>
                            <td>{propobj.clientNavigation.fullname}</td>
                            <td>{propobj.realtorNavigation.fullname}</td>
                            <td>
                                <button onClick={(e) => this.edit(propobj.id, e)} class="btn btn-info">
                                    Редактировать </button>
                                <button onClick={(e) => this.delete(propobj.id, e)} class="btn btn-danger">
                                    Удалить </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static edit(id, e) {
        e.preventDefault();
        return window.location.href = "/propobj/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Propobj/deletepropobj', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
            body: JSON.stringify({ "id": id }),
        }).then(response => {
            console.log(response);
        });
        return window.location.href = "/propobj";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/propobj/add";
    }

    export(e) {
        e.preventDefault();
        fetch('api/Propobj/ExportExcel', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then(url => {
                window.open(url, '_blank');
                URL.revokeObjectURL(url);
            });
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : Propobj.renderPropobjTable(this.state.propobjs);

        return (
            <div>
                <h1>Объекты недвижимости</h1>
                <button onClick={(e) => this.add(e)} class="btn btn-outline-primary">Добавить</button>
                <button onClick={(e) => this.export(e)} className="btn btn-success">Export</button>
                {contents}
            </div>
        );
        }

    }
}
