import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as systemActions from '../../../actions/systemActions';
// import * as routes from '../../utils/routes';
import './systems-rank.scss';


class SystemsRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.systemsGet()
      .then((response) => {
        this.setState({ systemsRank: response.body });
      });
  }

  render() {
    const { systemsRank } = this.props;
    let systemsRankJSX = null;

    if (systemsRank) {
      const sortedKeys = Object.keys(systemsRank).sort((a, b) => systemsRank[b] - systemsRank[a]);

      systemsRankJSX = 
        <ul className="systems-list">
          {
            sortedKeys.map((x) => {
              const className = x.includes(' ') ? x.replace(' ', '-') : x;
              const systemUrl = `https://en.wikipedia.org/wiki/${x}`;

              return (
                <li key={x} className={className}>
                  {
                    <p className="country-ranking">{systemsRank[x]}</p>
                  }
                  {
                    <p className="country-name"><a target="_blank" rel="noopener noreferrer" href={systemUrl}>{x}</a></p>
                  }
                </li>
              );
            })
          }
        </ul>;
    }

    return (
      <div className="rankings"> 
        <h1>Distribution of Political Systems</h1>
        { systemsRankJSX }
      </div>
    );
  }
}

SystemsRank.propTypes = {
  history: PropTypes.object,
  systemsRank: PropTypes.object,
  systemsGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    systemsRank: state.systems,
  };
};

const mapDispatchToProps = dispatch => ({
  systemsGet: () => dispatch(systemActions.systemsGetAllRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemsRank);
