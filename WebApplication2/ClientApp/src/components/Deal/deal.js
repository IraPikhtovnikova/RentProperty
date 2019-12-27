import React, { Component } from 'react';
import moment from "moment";

export class Deal extends Component {
    displayName = Deal.name

    constructor(props) {
        super(props);
        this.state = { deals: [], loading: true };

        fetch('api/Deal/alldeals', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ deals: data, loading: false });
            });
    }

    static renderDealTable(deals) {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата заключения</th>
                        <th>Срок аренды</th>
                        <th>Объект</th>
                        <th>Заявка</th>
                        <th>Статус</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {deals.map(d =>
                        <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{moment(d.ddate).format('DD/MM/YYYY')}</td>
                            <td>{moment(d.startdate).format('DD/MM/YYYY')} - {moment(d.enddate).format('DD/MM/YYYY')}</td>
                            <td>{d.propobjNavigation.id}</td>
                            <td>{d.requestNavigation.id}</td>
                            <td>{d.statusNavigation.sname}</td>
                            <td>
                                <button onClick={(e) => this.edit(d.id, e)} className="btn btn-info">
                                    Редактировать </button>
                                <button onClick={(e) => this.delete(d.id, e)} className="btn btn-danger">
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
        return window.location.href = "/deal/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Deal/deletedeal', {
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
        return window.location.href = "/deal";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/deal/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : Deal.renderDealTable(this.state.deals);

            return (
                <div>
                    <h1>Сделки</h1>
                    <button onClick={(e) => this.add(e)} className="btn btn-outline-primary">Добавить</button>
                    {contents}
                </div>
            );
        }

    }
}
