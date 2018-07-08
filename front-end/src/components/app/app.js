import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../header/header';
import Landing from '../landing/landing';
import Country from '../country/country';
import Footer from '../footer/footer';
import GDPRank from '../gdp-rank/gdp-rank';
import PopulationRank from '../population-rank/population-rank';
import AreaRank from '../area-rank/area-rank';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/rankings-gdp" component={GDPRank}/>
            <Route exact path="/rankings-population" component={PopulationRank}/>
            <Route exact path="/rankings-area" component={AreaRank}/>
            <Route exact path="/countries" component={Country}/>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
