import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import autoBind from '../../utils/autoBind';

import * as routes from '../../utils/routes';
import * as systemActions from '../../actions/systemActions';
import * as countryActions from '../../actions/countryActions';
import FlagForm from '../flagForm/flag-form';

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
    let borderingJSX = null;
    let flagJSX = null;

    if (selected) {
      if (selected.countryName) {
        countryNameJSX =         
          <span>
            {
              selected.countryName.includes('_') 
                ? selected.countryName.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
                : selected.countryName.charAt(0).toUpperCase() + selected.countryName.slice(1)
            }
          </span>;
      }

      populationJSX = 
        <span>
          {
            Number(selected.population).toLocaleString()
          }
        </span>;

      areaJSX = 
        <span>
          {
            Number(selected.area).toLocaleString()
          }
        </span>;

      borderingJSX = 
        <span>
          {
            selected.borderCountries
              ? selected.borderCountries.map((x, i) => {
                if (i === 0 && selected.borderCountries.length > 2) {
                  return `${x}, `;
                }
                if (i === 0 && selected.borderCountries.length <= 2) return `${x} `;
                if (i === selected.borderCountries.length - 1) return `and ${x}`;
                return `${x}, `;
              })
              : null
          }
        </span>;
    }

    flagJSX = 
      <span>
        {
          selected.flagUrl 
            ? <img src={selected.flagUrl}></img>
            : <FlagForm country={selected}/>
        } 
      </span>;
      

    return (
      <div className="basic-info">
        <h1>{countryNameJSX}</h1>
        {flagJSX}
        <p>Last Updated: {selected.lastUpdated}</p>
        <h3>{selected.location}</h3>
        <button onClick={this.handleUpdateSystem}>Update</button>
        <p>
          {
            selected.hasLinkedSystem ?
            <Link to=
              {
                { 
                  pathname: `${routes.SYSTEM_ROUTE}-${selected.countryName}`, state: { selected: this.props.selected },
                }
              }>
              Political Information</Link>
              : 
              <button onClick={this.handleCreateSystem}>Add system</button>
          }
        </p>
        <p>Shares borders with: {borderingJSX}</p>
        <p>-------------------</p>
        <p>Population: {populationJSX} million 
        <br/>Rank: {selected.populationRank}</p>
        <p>-------------------</p>
        <p>Area: {areaJSX} km<sup>2</sup>
        <br/>Rank: {selected.areaRank}</p>
        <p>-------------------</p>
        <p>Life Expectancy: {selected.lifeExpectancy} years
        <br/>Rank: {selected.lifeExpectancyRank}</p>
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
