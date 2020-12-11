import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';
import { GET_SYSTEMS } from '../../../graphql/queries/system';

import * as systemActions from '../../../actions/systemActions';
import { parseCountryName, parseSystemType } from '../../../utils/parser';
import './systems-rank.scss';


function SystemsRank(props) {
  const [systems, setSystems] = useState({});
  const [toggleSystem, setToggleSystem] = useState(false);
  const [toggleLi, setToggleLi] = useState('');

  const { loading, error, data } = useQuery(GET_SYSTEMS);

  useEffect(() => {
    if (data && data.systems) {
      setSystems(data.systems);
      props.systemsGet();
    }
  }, [data]);

  const handleToggleSystem = (e) => {
    setToggleSystem(!toggleSystem);
    setToggleLi(e.target.textContent);
  };

  const filterSystemsByType = () => {
    return systems.filter((x) => {
      if (toggleLi.toLowerCase() === x.typeOfGovernment) return x;
      return null;
    });
  };

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  const { systemsRank } = props;
  let systemsRankJSX = null;

  if (systemsRank) {
    const sortedKeys = Object.keys(systemsRank).sort((a, b) => systemsRank[b] - systemsRank[a]);

    systemsRankJSX = 
      <ul className="systems-list">
        {
          sortedKeys.map((x) => {
            const readableSystem = parseSystemType(x);
            const className = readableSystem.includes(' ') ? readableSystem.toLowerCase().split(' ').join('_') : readableSystem;
            // const systemUrl = `https://en.wikipedia.org/wiki/${className}`;

            return (
              <div key={ x }>
                <li className={ className } onClick={ handleToggleSystem }>
                  {
                    <p className="country-ranking">{ systemsRank[x] }</p>
                  }
                  {
                    <p className="country-name">
                      {/* <a target="_blank" rel="noopener noreferrer" href={ systemUrl }>{ readableSystem }</a> */}
                      { readableSystem }
                    </p>
                  }
                </li>
                {
                  toggleSystem && toggleLi === readableSystem ? 
                    <div className="country-list">
                      <ul>
                      {
                        filterSystemsByType().map((y) => {
                          return (
                            <li key={ y._id }>{ parseCountryName(y.countryName) }</li>
                          );
                        })
                      }
                      </ul>
                    </div>
                    : null
                }
              </div>
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
  systemsGet: () => dispatch(systemActions.systemsGetTypesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SystemsRank);
