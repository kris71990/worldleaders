import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Landing from '../landing/landing';
import RankingsMain from '../rankings/rankings-main/rankings-main';
import Country from '../country/country';
import System from '../system/system';
import Elections from '../election/elections';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={ Landing }/>
            <Route path="/rankings" component={ RankingsMain }/>
            <Route exact path="/countries" component={ Country }/>
            <Route path="/system-:country" component={ System }/>
            <Route path="/elections" component={ Elections }/>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
