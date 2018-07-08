import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import './population-rank.scss';


class PopulationRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state || {};
  }

  componentDidMount() {
    this.props.populationGet()
      .then((response) => {
        this.setState({ rank: response.body });
      });
  }

  render() {
    const { popRank } = this.props;
    let popJSX = null;

    if (popRank) {
      popJSX = 
        <ul>
          {
            popRank.map((x) => {
              const population = Number(x.population).toLocaleString();
              return (
                <li key={x.id}>
                  
                  {
                    x.countryName.includes('_') ? 
                      x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ') + ' -- ' + population + ' -- (' + x.populationRank + ')'
                      : x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1) + ' -- ' + population + ' -- (' + x.populationRank + ')'
                  }
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="gdp-rank"> 
        <h1>Population Rankings</h1>
        {
          popRank ? popJSX : null
        }
      </div>
    );
  }
}

PopulationRank.propTypes = {
  history: PropTypes.object,
  popRank: PropTypes.array,
  populationGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    popRank: state.rankings,
  };
};

const mapDispatchToProps = dispatch => ({
  populationGet: () => dispatch(rankingActions.populationFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopulationRank);
