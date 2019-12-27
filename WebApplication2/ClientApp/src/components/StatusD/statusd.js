import React, { Component } from 'react';

export class Statusd extends Component {
    displayName = Statusd.name

    constructor(props) {
        super(props);
        this.state = { statuses: [], loading: true };

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
    }

    static renderStatusTable(statuses) {
        return (
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {statuses.map(st =>
                        <tr key={st.id}>
                            <td>{st.id}</td>
                            <td>{st.sname}</td>
                            <td>{st.sdescr}</td>
                            <td>
                                <button onClick={(e) => this.edit(st.id, e)} class="btn btn-info">
                                    Редактировать </button>

                                <button onClick={(e) => this.delete(st.id, e)} class="btn btn-danger">
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
        return window.location.href = "/dstatus/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Statusr/deletestatusd', {
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
        return window.location.href = "/dstatus";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/dstatus/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : Statusd.renderStatusTable(this.state.statuses);

            return (
                <div>
                    <h1>Статусы для сделок</h1>
                    <button onClick={(e) => this.add(e)} class="btn btn-outline-primary">Добавить</button>
                    {contents}
                </div>
            );
        }

    }
}
