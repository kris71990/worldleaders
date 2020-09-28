import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

// import CapitalMap from '../capital-map/capital-map';
import SystemElections from '../system-elections/system-elections';
import SystemLeaders from '../system-leaders/system-leaders';

import * as systemActions from '../../actions/systemActions';
import * as parser from '../../utils/parser';
import './system.scss';

class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    autoBind.call(this, System);
  }

  componentDidMount() {
    this.props.systemGet(this.state.selected.countryName)
      .then((response) => {
        this.setState({ selected: response.body });
      });
  }

  handleUpdateSystem() {
    this.props.systemUpdate(this.props.selected)
      .then(() => {
        this.props.systemGet(this.props.selected.countryName);
      });
  }

  render() {
    const { selected } = this.props;
    let nameJSX = null;
    let capitalJSX = null;
    let typeJSX = null;
    let independenceJSX = null;

    if (selected) {
      if (selected.fullName === 'none') {
        nameJSX = <h1>{ parser.parseCountryName(selected.countryName) }</h1>;
      } else if (selected.fullName) {
        nameJSX = <h1>{ parser.parseFullCountryName(selected.fullName) }</h1>;
      }

      if (selected.typeOfGovernment) {
        typeJSX = 
          <div id="type">
            <h4>Type</h4>
            <p>{ selected ? parser.capitalize(selected.typeOfGovernment) : null }</p>
          </div>;
      }

      if (selected.independence) {
        independenceJSX = 
          <div id="independence">
            <h4>Independence</h4>
            <p>{ selected ? parser.parseDate(selected.independence) : null }</p>
          </div>;
      }

      if (selected.capital) {
        capitalJSX = 
          <div id="capitals">
            <h4>Capital</h4>
            <ul>
              {
                selected.capital.map((x) => {
                  return (
                    <li key={x}>{ x }</li>
                  );
                })
              }
            </ul>
          </div>;
      }
    }

    return (
      <div className="system-info">
        <div id="info-status">
          <div>
            <p>Last Updated: { selected ? selected.lastUpdated : null }</p>
            <button onClick={ this.handleUpdateSystem }>Update</button> 
          </div>
        </div>
        { nameJSX }
        <div id="basic-system-info">
          { typeJSX }
          { capitalJSX }
          {
            // selected ? <CapitalMap selected={selected}/> : null
          }
          { independenceJSX }
        </div>
        <SystemLeaders selected={ selected }/>
        <SystemElections selected={ selected }/>
      </div>
    );
  }
}

System.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  location: PropTypes.object,
  systemGet: PropTypes.func,
  systemUpdate: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selected: state.system,
  };
};

const mapDispatchToProps = dispatch => ({
  systemGet: system => dispatch(systemActions.systemGetRequest(system)),
  systemUpdate: country => dispatch(systemActions.systemUpdateRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(System);
