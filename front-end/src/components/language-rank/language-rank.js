import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as rankingActions from '../../actions/rankingActions';
import './language-rank.scss';


class LanguageRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.state || {};
  }

  componentDidMount() {
    this.props.languageRankGet()
      .then((response) => {
        this.setState({ rank: response.body });
      });
  }

  render() {
    const { languageRank } = this.props;
    console.log(languageRank);
    // let languageRankJSX = null;

    // if (languageRank) {
    //   languageRankJSX = 
    //     <ul>
    //       {
    //         languageRank.map((x) => {
    //           const area = Number(x.area).toLocaleString();
    //           return (
    //             <li key={x.id}>
    //               {
    //                 x.countryName.includes('_') ? 
    //                   x.countryName.split('_').map(y => y.charAt(0).toUpperCase() + y.slice(1)).join(' ') + ' -- ' + area + ' sq km -- (' + x.areaRank + ')'
    //                   : x.countryName.charAt(0).toUpperCase() + x.countryName.slice(1) + ' -- ' + area + ' sq km -- (' + x.areaRank + ')'
    //               }
    //             </li>
    //           );
    //         })
    //       }
    //     </ul>;
    // }

    return (
      <div className="rankings"> 
        <h1>Area Rankings</h1>
        {/* {
          areaRank ? areaJSX : null
        } */}
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
