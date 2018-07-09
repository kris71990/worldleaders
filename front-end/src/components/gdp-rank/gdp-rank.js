import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';
import * as routes from '../../utils/routes';

import * as rankingActions from '../../actions/rankingActions';
import './gdp-rank.scss';


class GDPRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind.call(this, GDPRank);
  }

  componentDidMount() {
    this.props.gdpGet()
      .then((response) => {
        this.setState({ gdpRank: response.body });
      });
  }

  // handleClick(id) {

  // }

  render() {
    const { gdpRank } = this.state;
    let gdpJSX = null;

    if (gdpRank) {
      gdpJSX = 
        <ul>
          {
            gdpRank.map((x) => {
              return (
                <li key={x.id}>
                  <span>{x.gdpPPPRank}</span>
                    {
                      x.countryName.includes('_') ?
                        <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                          {x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ')}
                        </Link>
                        : 
                        <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                          {x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1)}
                        </Link>
                    }
                  </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>GDP PPP Rankings</h1>
        {
          gdpRank ? gdpJSX : null
        }
        {/* { redirect 
          ? <Redirect to={{ pathname: '/countries', state: { selected: this.state.selected } }}/> 
          : null 
        } */}
      </div>
    );
  }
}

GDPRank.propTypes = {
  history: PropTypes.object,
  gdpRank: PropTypes.array,
  gdpGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    gdpRank: state.rankings,
  };
};

const mapDispatchToProps = dispatch => ({
  gdpGet: () => dispatch(rankingActions.gdpFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GDPRank);
