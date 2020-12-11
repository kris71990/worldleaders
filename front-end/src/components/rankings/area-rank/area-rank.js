import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import { GET_AREA_RANK } from '../../../graphql/queries/ranks';
import * as routes from '../../../utils/routes';
import * as parser from '../../../utils/parser';

import './area-rank.scss';

function AreaRank() {
  const [rank, setRank] = useState([]);
  const { loading, error, data } = useQuery(GET_AREA_RANK);

  useEffect(() => {
    if (data) setRank(data.rankingsArea);
  }, [data]);
  
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  let areaJSX;

  if (rank) {
    areaJSX = 
      <ul className="area-list">
        {
          rank.map((x) => {
            const area = Number(x.area).toLocaleString();
            return (
              <li key={ x.id }>
                <p className="country-ranking">{ x.areaRank }</p>
                {
                  <p className="country-name">
                  {
                    <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                      { parser.parseCountryName(x.countryName) }
                    </Link>
                  }
                  </p>
                }
                <p className="country-ranking-data">{ area }</p>
              </li>
            );
          })
        }
      </ul>;
  }

  return (
    <div className="rankings"> 
      <h1>Area</h1>
      <p>(km<sup>2</sup>)</p>
      {
        rank ? areaJSX : null
      }
    </div>
  );
}

AreaRank.propTypes = {
  history: PropTypes.object,
};

export default AreaRank;
