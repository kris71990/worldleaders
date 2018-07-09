import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
                  <p className="country-ranking">{x.gdpPPPRank}</p>
                    {
                    <p className="country-name">
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
                    </p>
                    }
                  </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>Gross-Domestic Product - Purchasing Power Parity</h1>
        <p>Countries ranked in order of GDP, with respect to <a href="https://en.wikipedia.org/wiki/Purchasing_power_parity" target="_blank" rel="noopener noreferrer">Purchasing Power Parity (PPP)</a></p>
        {
          gdpRank ? gdpJSX : null
        }
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
