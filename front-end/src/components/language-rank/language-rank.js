import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import './language-rank.scss';


class LanguageRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.languageRankGet()
      .then((response) => {
        this.setState({ languageRank: response.body });
      });
  }

  render() {
    const { languageRank } = this.state;
    let languageRankJSX = null;

    if (languageRank) {
      languageRankJSX = 
        <ul>
          {
            languageRank.map((x) => {
              let plural = 'countries';
              if (x[1] === 1) plural = 'country';
              if (x[0].toLowerCase() === 'other' || x[0].toLowerCase() === 'unspecified') {
                return null;
              }

              return (
                <li key={x[0]}>
                  {
                    `${x[0]} -- Spoken in ${x[1]} ${plural}`
                  }
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>Most Widely Spoken Languages</h1>
        {
          languageRank ? languageRankJSX : null
        }
      </div>
    );
  }
}

LanguageRank.propTypes = {
  history: PropTypes.object,
  languageRank: PropTypes.array,
  languageRankGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    languageRank: state.rankings,
  };
};

const mapDispatchToProps = dispatch => ({
  languageRankGet: () => dispatch(rankingActions.languagePrevalenceFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageRank);
