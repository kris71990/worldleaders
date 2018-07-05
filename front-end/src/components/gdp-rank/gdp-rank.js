import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as gdpActions from '../../actions/gdp-action';
import './gdp-rank.scss';

class GDPRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  componentDidMount() {
    this.props.gdpGet()
      .then((response) => {
        this.setState({ rank: response.body });
      });
  }

  render() {
    const { rank } = this.props;
    let gdpJSX = null;

    if (rank) {
      gdpJSX = 
        <ul>
          {
            rank.map((x) => {
              return (
                <li key={x.id}>
                  {
                    x.countryName.includes('_') ? 
                      x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ') + ' - ' + x.gdpPPPRank
                      : x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1) + ' - ' + x.gdpPPPRank
                  }
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="gdp-rank"> 
        <h1>GDP PPP Rankings</h1>
        {gdpJSX}
      </div>
    );
  }
}

GDPRank.propTypes = {
  rank: PropTypes.array,
  gdpGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    rank: state.gdp,
  };
};

const mapDispatchToProps = dispatch => ({
  gdpGet: () => dispatch(gdpActions.gdpFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GDPRank);
