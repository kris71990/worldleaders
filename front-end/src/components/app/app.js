import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import Header from '../header/header';
import Landing from '../landing/landing';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;