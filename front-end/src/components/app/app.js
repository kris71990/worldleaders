import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../common/header/header';
import Landing from '../landing/landing';
import Country from '../country/country';
import Footer from '../common/footer/footer';
import GDPRank from '../rankings/gdp-rank/gdp-rank';
import PopulationRank from '../rankings/population-rank/population-rank';
import AreaRank from '../rankings/area-rank/area-rank';
import LanguageRank from '../rankings/language-rank/language-rank';
import SystemRank from '../rankings/systems-rank/systems-rank';
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
            <Route exact path="/rankings-gdp" component={ GDPRank }/>
            <Route exact path="/rankings-population" component={ PopulationRank }/>
            <Route exact path="/rankings-area" component={ AreaRank }/>
            <Route exact path="/rankings/language-prevalence" component={ LanguageRank }/>
            <Route exact path="/countries" component={ Country }/>
            <Route exact path="/systems-all" component={ SystemRank }/>
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
