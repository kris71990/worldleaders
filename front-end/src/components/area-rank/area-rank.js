import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import * as routes from '../../utils/routes';
import './area-rank.scss';


class AreaRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.areaGet()
      .then((response) => {
        this.setState({ areaRank: response.body });
      });
  }

  render() {
    const { areaRank } = this.state;
    let areaJSX = null;

    if (areaRank) {
      areaJSX = 
        <ul className="area-list">
          {
            areaRank.map((x) => {
              const area = Number(x.area).toLocaleString();
              return (
                <li key={x.id}>
                  <p className="country-ranking">{x.areaRank}</p>
                  {
                    <p className="country-name">
                    {
                      x.countryName.includes('_') ? 
                        <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                          {
                            x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ')
                          }
                        </Link>
                        : 
                        <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                          {
                            x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1)
                          }
                        </Link>
                      }
                    </p>
                  }
                  <p className="country-ranking-data">{area}</p>
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>Area</h1>
        <p>Countries ranked by area in square kilometers</p>
        {
          areaRank ? areaJSX : null
        }
      </div>
    );
  }
}

AreaRank.propTypes = {
  history: PropTypes.object,
  areaRank: PropTypes.array,
  areaGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    areaRank: state.rankings,
  };
};

const mapDispatchToProps = dispatch => ({
  areaGet: () => dispatch(rankingActions.areaFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AreaRank);
