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
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
