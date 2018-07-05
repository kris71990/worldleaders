import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../header/header';
import Landing from '../landing/landing';
import Country from '../country/country';
import Footer from '../footer/footer';
import GDPRank from '../gdp-rank/gdp-rank';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/countries/gdp" component={GDPRank}/>
            <Route exact path="/countries" component={Country}/>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
