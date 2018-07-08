import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import './area-rank.scss';


class AreaRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state || {};
  }

  componentDidMount() {
    this.props.areaGet()
      .then((response) => {
        this.setState({ rank: response.body });
      });
  }

  render() {
    const { areaRank } = this.props;
    let areaJSX = null;

    if (areaRank) {
      areaJSX = 
        <ul>
          {
            areaRank.map((x) => {
              const area = Number(x.area).toLocaleString();
              return (
                <li key={x.id}>
                  {
                    x.countryName.includes('_') ? 
                      x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ') + ' -- ' + area + ' sq km -- (' + x.areaRank + ')'
                      : x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1) + ' -- ' + area + ' sq km -- (' + x.areaRank + ')'
                  }
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>Area Rankings</h1>
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
