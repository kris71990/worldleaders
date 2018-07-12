import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>The World Right Now</h1>
        <p>- Discover information about the current state of the world -</p>
        <nav>
          <ul>
            <li><Link to={routes.ROOT_ROUTE}>Home</Link></li>
            <li><Link to={routes.GDP_ROUTE}>GDP PPP</Link></li>
            <li><Link to={routes.POPULATION_ROUTE}>Population</Link></li>
            <li><Link to={routes.AREA_ROUTE}>Area</Link></li>
            <li><Link to={routes.LANGUAGE_PREVALENCE_ROUTE}>Most Spoken Languages</Link></li>
            <li><Link to={routes.SYSTEMS_ROUTE}>Systems</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
