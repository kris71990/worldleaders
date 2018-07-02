import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../header/header';
import Landing from '../landing/landing';
import Country from '../country/country';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route path='/countries' component={Country}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;