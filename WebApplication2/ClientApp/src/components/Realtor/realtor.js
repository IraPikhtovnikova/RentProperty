import React, { Component } from 'react';

export class Realtor extends Component {
    displayName = Realtor.name

    constructor(props) {
        super(props);
        this.state = { realtors: [], loading: true };

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
    }

    static renderRealtorsTable(realtors) {
        return (
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {realtors.map(realtor =>
                        <tr key={realtor.id}>
                            <td>{realtor.id}</td>
                            <td>{realtor.fullname}</td>
                            <td>{realtor.phone}</td>
                            <td>{realtor.email}</td>
                            <td>
                                <button onClick={(e) => this.edit(realtor.id, e)} class="btn btn-info">
                                    Редактировать </button>
                                <button onClick={(e) => this.delete(realtor.id, e)} class="btn btn-danger">
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
        return window.location.href = "/realtor/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Realtor/deleterealtor', {
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
        return window.location.href = "/realtor";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/realtor/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : Realtor.renderRealtorsTable(this.state.realtors);

        return (
            <div>
                <h1>Риэлтор</h1>
                <button onClick={(e) => this.add(e)} class="btn btn-outline-primary">Добавить</button>
                {contents}
            </div>
        );
        }

    }
}
