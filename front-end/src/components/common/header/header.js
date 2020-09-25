import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from '../../../utils/autoBind';

import * as routes from '../../../utils/routes';
import './header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'Home',
    };
    autoBind.call(this, Header);
  }

  handleClickMenu(e) {
    this.setState({
      page: e.target.textContent,
    });
  }

  render() {
    return (
      <header className='header'>
        <div onClick={ this.handleClickMenu }>
          <Link to={routes.ROOT_ROUTE}><h1>The World Right Now</h1></Link>
        </div>
        <nav>
          <ul onClick={ this.handleClickMenu }>
            <li className={ this.state.page === 'GDP' ? 'selected' : null }>
              <Link to={ routes.GDP_ROUTE }>GDP</Link>
              { this.state.page === 'GDP' ? <span> &lt;</span> : null }
            </li>
            <li className={ this.state.page === 'Population' ? 'selected' : null }>
              <Link to={ routes.POPULATION_ROUTE }>Population</Link>
              { this.state.page === 'Population' ? <span> &lt;</span> : null }
            </li>
            <li className={ this.state.page === 'Area' ? 'selected' : null }>
              <Link to={ routes.AREA_ROUTE }>Area</Link>
              { this.state.page === 'Area' ? <span> &lt;</span> : null }
            </li>
            <li className={ this.state.page === 'Languages' ? 'selected' : null }>
              <Link to={ routes.LANGUAGE_PREVALENCE_ROUTE }>Languages</Link>
              { this.state.page === 'Languages' ? <span> &lt;</span> : null }
            </li>
            <li className={ this.state.page === 'Government' ? 'selected' : null }>
              <Link to={ routes.SYSTEMS_ROUTE }>Government</Link>
              { this.state.page === 'Government' ? <span> &lt;</span> : null }
            </li>
            <li className={ this.state.page === 'Elections' ? 'selected' : null }>
              <Link to={ routes.ELECTION_ROUTE }>Elections</Link>
              { this.state.page === 'Elections' ? <span> &lt;</span> : null }
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
