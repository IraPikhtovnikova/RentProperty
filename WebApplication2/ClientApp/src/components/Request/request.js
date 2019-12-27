import React, { Component } from 'react';

export class Request extends Component {
    displayName = Request.name

    constructor(props) {
        super(props);
        this.state = { requests: [], loading: true };

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
    }

    static renderRequestsTable(requests) {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Цена (мес)</th>
                        <th>Площадь</th>
                        <th>Кол. комн.</th>
                        <th>Этаж</th>
                        <th>Кол. эт.</th>
                        <th>Статус</th>
                        <th>Клиент</th>
                        <th>Риэлтор</th>
                        <th>Тип</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req =>
                        <tr key={req.id}>
                            <td>{req.id}</td>
                            <td>{req.pricemin} - {req.pricemax}</td>
                            <td>{req.areamin} - {req.areamax}</td>
                            <td>{req.roomscountmin} - {req.roomscountmax}</td>
                            <td>{req.floormin} - {req.floormax}</td>
                            <td>{req.floorscountmin} - {req.floorscountmax}</td>
                            <td>{req.statusNavigation.sname}</td>
                            <td>{req.clientNavigation.fullname}</td>
                            <td>{req.realtorNavigation.fullname}</td>
                            <td>{req.typpeNavigation.tname}</td>
                            <td>
                                <button onClick={(e) => this.edit(req.id, e)} className="btn btn-info">
                                    Редактировать </button>
                                <button onClick={(e) => this.delete(req.id, e)} className="btn btn-danger">
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
        return window.location.href = "/request/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Request/deleterequest', {
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
        return window.location.href = "/request";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/request/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : Request.renderRequestsTable(this.state.requests);

            return (
                <div>
                    <h1>Заявки</h1>
                    <button onClick={(e) => this.add(e)} className="btn btn-outline-primary">Добавить</button>
                    {contents}
                </div>
            );
        }

    }
}
