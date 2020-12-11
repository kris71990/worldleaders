import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import * as routes from '../../../utils/routes';

import { GET_GDP_RANK } from '../../../graphql/queries/ranks';
import * as parser from '../../../utils/parser';

import './gdp-rank.scss';

function GDPRank() {
  const [rank, setRank] = useState([]);
  const { loading, error, data } = useQuery(GET_GDP_RANK);

  useEffect(() => {
    if (data) setRank(data.rankingsGDP);
  }, [data]);
  
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  let gdpJSX;
  if (rank) {
    gdpJSX = 
      <ul className="gdp-list">
        {
          rank.map((x) => {
            return (
              <li key={ x._id }>
                <p className="country-ranking">{ x.gdpPPPRank }</p>
                  {
                  <p className="country-name">
                    {
                      <Link to={{ pathname: routes.COUNTRY_ROUTE, state: { selected: x._id } }}>
                        { parser.parseCountryName(x.countryName) }
                      </Link>
                    }
                  </p>
                  }
                </li>
            );
          }) 
        }
      </ul>;
  }

  return (
    <div className="rankings"> 
      <h1>Gross Domestic Product</h1>
      <p>(<a href="https://en.wikipedia.org/wiki/Purchasing_power_parity" target="_blank" rel="noopener noreferrer">Purchasing Power Parity</a>)
      </p>
      { rank ? gdpJSX : null }
    </div>
  );
}

GDPRank.propTypes = {
  history: PropTypes.object,
};

export default GDPRank;
