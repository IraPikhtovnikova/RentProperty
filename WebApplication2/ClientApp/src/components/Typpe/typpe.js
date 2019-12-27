import React, { Component } from 'react';

export class Typpe extends Component {
    displayName = Typpe.name

    constructor(props) {
        super(props);
        this.state = { types: [], loading: true };

        fetch('api/Type/alltypes', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ types: data, loading: false });
            });
    }

    static renderTypesTable(types) {
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(type =>
                        <tr key={type.id}>
                            <td>{type.id}</td>
                            <td>{type.tname}</td>
                            <td>{type.tdescr}</td>
                            <td>
                                <button onClick={(e) => this.edit(type.id, e)} className="btn btn-info">
                                    Редактировать </button>
                                <button onClick={(e) => this.delete(type.id, e)} class="btn btn-danger">
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
        return window.location.href = "/type/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/Type/deletetype', {
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
        return window.location.href = "/type";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/type/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : Typpe.renderTypesTable(this.state.types);

        return (
            <div>
                <h1>Типы объектов</h1>
                <button onClick={(e) => this.add(e)} className="btn btn-outline-primary">Добавить</button>
                {contents}
            </div>
        );
        }

    }
}
