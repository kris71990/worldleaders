import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Landing from '../landing/landing';
import RankingsContainer from '../containers/rankings';
import SystemContainer from '../containers/system';
import CountryContainer from '../containers/country';
import Elections from '../election/elections';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={ Landing }/>
            <Route path="/rankings" component={ RankingsContainer }/>
            <Route path="/country" component={ CountryContainer }/>
            <Route path="/system" component={ SystemContainer }/>
            <Route path="/elections" component={ Elections }/>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
