import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import { GET_POP_RANK } from '../../../graphql/queries/ranks';
import * as routes from '../../../utils/routes';
import * as parser from '../../../utils/parser';

import './population-rank.scss';


function PopulationRank() {
  const [rank, setRank] = useState([]);
  const { loading, error, data } = useQuery(GET_POP_RANK);

  useEffect(() => {
    if (data) setRank(data.rankingsPop);
  }, [data]);
  
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  let popJSX;

  if (rank) {
    popJSX = 
      <ul className="pop-list">
        {
          rank.map((x) => {
            const population = Number(x.population).toLocaleString();

            return (
              <li key={ x.id }>
                <p className="country-ranking">{ x.populationRank }</p>
                {
                  <p className="country-name">
                  {
                    <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x.id } }}>
                      { parser.parseCountryName(x.countryName) }
                    </Link>
                    }
                  </p>
                }
                <p className="country-ranking-data">{ population }</p>
              </li>
            );
          })
        }
      </ul>;
  }

  return (
    <div className="rankings"> 
      <h1>Population</h1>
      <p>(millions)</p>
      {
        rank ? popJSX : null
      }
    </div>
  );
}

PopulationRank.propTypes = {
  history: PropTypes.object,
};


export default PopulationRank;
