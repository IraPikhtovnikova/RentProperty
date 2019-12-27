import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Client } from './components/Client/client';
    import { EditClient } from './components/Client/editclient';
    import { AddClient } from './components/Client/addclient';
import { Login } from './components/login';
import { District } from './components/District/district';
    import { AddDistrict } from './components/District/adddistrict';
    import { EditDistrict } from './components/District/editdistrict';
import { Realtor } from './components/Realtor/realtor';
    import { AddRealtor } from './components/Realtor/addrealtor';
import { EditRealtor } from './components/Realtor/editrealtor';
import { Typpe } from './components/Typpe/typpe';
import { AddTyppe } from './components/Typpe/addtyppe';
import { EditTyppe } from './components/Typpe/edittyppe';
import { Propobj } from './components/Propobj/propobj';
import { AddPropobj } from './components/Propobj/addpropobj';
import { EditPropobj } from './components/Propobj/editpropobj';
import { Request } from './components/Request/request';
import { AddRequest } from './components/Request/addrequest';
import { EditRequest } from './components/Request/editrequest';
import { Statusr } from './components/StatusR/statusr';
import { AddStatusr } from './components/StatusR/addstatusr';
import { EditStatusr } from './components/StatusR/editstatusr';
import { Statusd } from './components/StatusD/statusd';
import { AddStatusd } from './components/StatusD/addstatusd';
import { EditStatusd } from './components/StatusD/editstatusd';
import { Deal } from './components/Deal/deal';
import { AddDeal } from './components/Deal/adddeal';
import { EditDeal } from './components/Deal/editdeal';



export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetchdata' component={FetchData} />

            <Route exact path='/client' component={Client} />
            <Route path='/client/edit' component={EditClient} />
            <Route path='/client/add' component={AddClient} />

            <Route exact path='/district' component={District} />
            <Route path='/district/add' component={AddDistrict} />
            <Route path='/district/edit' component={EditDistrict} />

            <Route exact path='/realtor' component={Realtor} />
            <Route path='/realtor/add' component={AddRealtor} />
            <Route path='/realtor/edit' component={EditRealtor} />

            <Route exact path='/type' component={Typpe} />
            <Route path='/type/add' component={AddTyppe} />
            <Route path='/type/edit' component={EditTyppe} />

            <Route exact path='/propobj' component={Propobj} />
            <Route path='/propobj/add' component={AddPropobj} />
            <Route path='/propobj/edit' component={EditPropobj} />

            <Route exact path='/request' component={Request} />
            <Route path='/request/add' component={AddRequest} />
            <Route path='/request/edit' component={EditRequest} />

            <Route exact path='/rstatus' component={Statusr} />
            <Route path='/rstatus/add' component={AddStatusr} />
            <Route path='/rstatus/edit' component={EditStatusr} />

            <Route exact path='/dstatus' component={Statusd} />
            <Route path='/dstatus/add' component={AddStatusd} />
            <Route path='/dstatus/edit' component={EditStatusd} />

            <Route exact path='/deal' component={Deal} />
            <Route path='/deal/add' component={AddDeal} />
            <Route path='/deal/edit' component={EditDeal} />

            <Route exact path='/auth/login' component={Login} />
      </Layout>
    );
  }
}
