import React from 'react';
import { Link } from 'react-router-dom';
import autoBind from '../../utils/autoBind';

import * as routes from '../../utils/routes';
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
              <Link to={ routes.GDP_ROUTE }>GDP</Link></li>
            <li className={ this.state.page === 'Population' ? 'selected' : null }>
              <Link to={ routes.POPULATION_ROUTE }>Population</Link></li>
            <li className={ this.state.page === 'Area' ? 'selected' : null }>
              <Link to={ routes.AREA_ROUTE }>Area</Link></li>
            <li className={ this.state.page === 'Languages' ? 'selected' : null }>
              <Link to={ routes.LANGUAGE_PREVALENCE_ROUTE }>Languages</Link></li>
            <li className={ this.state.page === 'Government Systems' ? 'selected' : null }>
              <Link to={ routes.SYSTEMS_ROUTE }>Government Systems</Link></li>
            <li className={ this.state.page === 'Elections' ? 'selected' : null }>
              <Link to={ routes.ELECTION_ROUTE }>Elections</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
