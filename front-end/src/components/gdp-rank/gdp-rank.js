import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import './gdp-rank.scss';


class GDPRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                  {
                    x.countryName.includes('_') ? 
                      x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ') + ' -- ' + x.gdpPPPRank
                      : x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1) + ' -- ' + x.gdpPPPRank
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
