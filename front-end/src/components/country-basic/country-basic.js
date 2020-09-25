import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import autoBind from '../../utils/autoBind';

import FlagForm from '../flagForm/flag-form';
import CustomButton from '../common/button/button';
import Divider from '../common/divider/divider';

import * as routes from '../../utils/routes';
import * as systemActions from '../../actions/systemActions';
import * as countryActions from '../../actions/countryActions';
import * as parser from '../../utils/parser';

import './country-basic.scss';

class CountryBasic extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, CountryBasic);
  }

  handleCreateSystem() {
    this.props.systemPost(this.props.selected)
      .then(() => {
        this.props.countryGet(this.props.selected);
      }); 
  }

  handleUpdateSystem() {
    this.props.countryUpdate(this.props.selected)
      .then(() => {
        this.props.countryGet(this.props.selected);
      }); 
  }

  render() {
    const { selected } = this.props;

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

      populationJSX = 
        <div className="ranks">
          <div>
            <p>Population: { Number(selected.population).toLocaleString() } million</p>
            <p>Rank: { selected.populationRank }</p>
          </div>
        </div>;
      areaJSX = 
        <div className="ranks">
          <div>
            <p>Area: { Number(selected.area).toLocaleString() } km<sup>2</sup></p>
            <p>Rank: { selected.areaRank }</p>
          </div>
        </div>;
      lifeExpectancyJSX = 
        <div className="ranks">
          <div>
            <p>Life Expectancy: { selected.lifeExpectancy } years</p>
            <p>Rank: { selected.lifeExpectancyRank }</p>
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
                <CustomButton action={ this.handleUpdateSystem } text='Update'/>
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
                pathname: `${routes.SYSTEM_ROUTE}-${selected.countryName}`, state: { selected: this.props.selected },
              }
            }>Government</Link>
            : 
          <CustomButton action={ this.handleCreateSystem } text='Find political information'/>
        }
        { borderingJSX }
        { populationJSX }
        { areaJSX }
        { lifeExpectancyJSX }
      </div>
    );
  }
}

CountryBasic.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  systemPost: PropTypes.func,
  countryUpdate: PropTypes.func,
  countryGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selected: state.country,
  };
};

const mapDispatchToProps = dispatch => ({
  systemPost: country => dispatch(
    systemActions.systemCreateRequest(country._id, country.countryName),
  ),
  countryGet: country => dispatch(countryActions.countryGetRequest(country._id)),
  countryUpdate: country => dispatch(countryActions.countryUpdateRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryBasic);
