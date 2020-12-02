import React from 'react';
import { render as reactDomRender } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './components/app/app';
import reducers from './reducers/index';
import session from './lib/redux-session';
import thunk from './lib/redux-thunk';

import './style/main.scss';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, session)));

const apollo = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const container = document.createElement('div');
document.body.appendChild(container);
reactDomRender(
  <ApolloProvider client={ apollo }>
    <Provider store={ store }>
      <App/>
    </Provider>
  </ApolloProvider>, 
  container,
);
