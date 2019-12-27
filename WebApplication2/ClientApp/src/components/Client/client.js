import React, { Component } from 'react';

export class Client extends Component {
    displayName = Client.name

    constructor(props) {
        super(props);
        this.state = { clients: [], loading: true };

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
    }

    static renderClientsTable(clients) {
        return (            
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Телефон</th>
                        <th>Паспорт</th>
                        <th>Email</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client =>
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.fullname}</td>
                            <td>{client.phone}</td>
                            <td>{client.passport}</td>
                            <td>{client.email}</td>
                            <td>
                                <button onClick={(e) => this.edit(client.id, e)} className="btn btn-info">
                                    Редактировать </button>
                                <button onClick={(e) => this.delete(client.id, e)} className="btn btn-danger">
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
        return window.location.href = "/client/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Client/deleteclient', {
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
        return window.location.href = "/client";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/client/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
            let contents = this.state.loading
                ? <p><em>Загрузка...</em></p>
                : Client.renderClientsTable(this.state.clients);

        return (            
            <div>                
                <h1>Клиенты</h1>
                <button onClick={(e) => this.add(e)} className="btn btn-outline-primary">Добавить</button>
                    {contents}
                </div>
            );
        }

    }
}
