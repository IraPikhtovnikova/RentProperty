import React, { Component } from 'react';

export class District extends Component {
    displayName = District.name

    constructor(props) {
        super(props);
        this.state = { districts: [], loading: true };

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
    }

    static renderDistrictsTable(districts) {
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
                    {districts.map(district =>
                        <tr key={district.id}>
                            <td>{district.id}</td>
                            <td>{district.dname}</td>
                            <td>{district.ddescr}</td>
                            <td>
                                <button onClick={(e) => this.edit(district.id, e)} class="btn btn-info">
                                    Редактировать </button>
                                    
                                <button onClick={(e) => this.delete(district.id, e)} class="btn btn-danger">
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
        return window.location.href = "/district/edit/" + id + "";
    }

    static delete(id, e) {
        e.preventDefault();
        fetch('api/District/deletedistrict', {
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
        return window.location.href = "/district";
    }

    add(e) {
        e.preventDefault();
        return window.location.href = "/district/add";
    }

    render() {
        if (!sessionStorage.getItem('Token')) {
            return window.location.href = "/auth/login";
        } else {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : District.renderDistrictsTable(this.state.districts);

        return (
            <div>
                <h1>Районы</h1>
                <button onClick={(e) => this.add(e)} class="btn btn-outline-primary">Добавить</button>
                {contents}
            </div>
        );
        }

    }
}
