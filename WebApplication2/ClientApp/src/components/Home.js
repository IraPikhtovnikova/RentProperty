import React, { Component } from 'react';
import moment from "moment";

export class Home extends Component {
    displayName = Home.name

    constructor(props) {
        super(props);
        this.state = { news: [], loading: true };

        fetch('api/News/news', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem('Token')
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ news: data, loading: false });
            });
    }

    static renderNews(news){
        return (
            <div>
                <h1 className="col-sm-15"> Новости </h1> 
                {news.map(client =>
                    <div className="container">
                    <div className="row">
                        <div key={client.id}>
                            <div className="col-sm-2"><h3>{moment(client.ndate).format('DD/MM/YYYY')}</h3></div>
                            <div className="col-sm-4"><h3>{client.nhead}</h3></div>
                        </div>
                    </div>

                    <div className="row">
                            <div key={client.id}>
                                <div className="col-sm-2"></div>
                            <div className="col-sm-6">{client.nshort}</div>
                        </div>
                        </div>
                        </div>
                )}
            </div>
            );
}

  render() {
      let contents = this.state.loading
          ? <p><em>Загрузка...</em></p>
          : Home.renderNews(this.state.news);

      return (
          <div>
              {contents}
          </div>
      );
  }
}
