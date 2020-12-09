import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FlagForm from '../forms/flagForm/flag-form';
import CustomButton from '../common/button/button';
import Divider from '../common/divider/divider';

import * as routes from '../../utils/routes';
import * as systemActions from '../../actions/systemActions';
import * as parser from '../../utils/parser';

import './country-basic.scss';

function CountryBasic(props) {
  const { selected, existingCount } = props;

  const handleCreateSystem = () => {
    return props.systemPost(selected);
    // .then(() => {
    //   return props.countryGet(selected);
    // }); 
  };

  const handleUpdateSystem = () => {
    this.props.countryUpdate(this.props.selected)
      .then(() => {
        this.props.countryGet(this.props.selected);
      }); 
  };

  const handleCreateReadablePopulation = (population) => {
    const readablePopulation = Number(population).toLocaleString();
    if (population.length > 9) return `${readablePopulation} billion`;
    return `${readablePopulation} million`;
  };

  let countryNameJSX = null;
  let populationJSX = null;
  let areaJSX = null;
  let lifeExpectancyJSX = null;
  let borderingJSX = null;
  let flagJSX = null;

  if (selected) {
    if (selected.countryName) {
      countryNameJSX = <span>{ parser.parseCountryName(selected.countryName) }</span>;
    }

    if (selected.population) {
      populationJSX = 
        <div className="ranks">
          <div><p>Population</p></div>
          <div>
            <p>{ handleCreateReadablePopulation(selected.population) }</p>
            <p>{ selected.populationRank }/{ existingCount }</p>
          </div>
        </div>;
    }

    areaJSX = 
      <div className="ranks">
        <div><p>Area</p></div>
        <div>
          <p>{ Number(selected.area).toLocaleString() } km<sup>2</sup></p>
          <p>{ selected.areaRank }/{ existingCount }</p>
        </div>
      </div>;
    lifeExpectancyJSX = 
      <div className="ranks">
        <div><p>Life Expectancy</p></div>
        <div>
          <p>{ selected.lifeExpectancy } years</p>
          <p>{ selected.lifeExpectancyRank }/{ existingCount }</p>
        </div>
      </div>;

    borderingJSX = 
      <div id="borders">
        <p>Borders</p>
        <ul>
          {
            selected.borderCountries
              ? selected.borderCountries.map((borderCountry, i) => {
                return <li key={ i }>{ borderCountry }</li>;
              })
              : null
          }
        </ul>
      </div>;
  }

  flagJSX = 
    <div>
      {
        selected.flagUrl 
          ? <img src={ selected.flagUrl }></img>
          : 
          <div>
            <FlagForm country={ selected }/>
            <Divider/>
          </div>
      } 
    </div>;
    

  return (
    <div className="basic-info">
      <div id="info-status">
        <div><h3>{ selected.location }</h3></div>
        <div>
          <p>Last Updated: { selected.lastUpdated }</p>
          { 
            selected.hasLinkedSystem ?
              <CustomButton action={ handleUpdateSystem } text='Update'/>
              : null
          }
        </div>
      </div>
      <h1>{ countryNameJSX }</h1>
      { flagJSX }
      {
        selected.hasLinkedSystem ?
        <Link to=
          {
            { 
              pathname: `${routes.SYSTEM_ROUTE}-${selected.countryName}`, state: { selected },
            }
          }>Government</Link>
          : 
        <CustomButton action={ handleCreateSystem } text='Find political information'/>
      }
      { borderingJSX }
      { populationJSX }
      { areaJSX }
      { lifeExpectancyJSX }
    </div>
  );
}

CountryBasic.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  existingCount: PropTypes.number,
  systemPost: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  systemPost: country => dispatch(
    systemActions.systemCreateRequest(country._id, country.countryName),
  ),
});

export default connect(null, mapDispatchToProps)(CountryBasic);
