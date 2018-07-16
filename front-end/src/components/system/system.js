import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as systemActions from '../../actions/systemActions';
import * as routes from '../../utils/routes';
import './system.scss';

class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
  }

  componentDidMount() {
    this.props.systemGet(this.state.selected.countryName)
      .then((response) => {
        this.setState({ selected: response.body });
      });
  }

  render() {
    const { selected } = this.props;
    let capitalJSX = null;
    let nameJSX = null;
    let hosJSX = null;
    let hogJSX = null;

    if (selected) {
      let multipleCaps = null;

      if (selected.fullName === 'none') {
        nameJSX = 
          <h1>
            {
              selected.countryName.includes('_') 
                ? selected.countryName.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
                : selected.countryName.charAt(0).toUpperCase() + selected.countryName.slice(1)

            }
          </h1>;
      } else {
        nameJSX = <h1>{selected.fullName}</h1>;
      }

      if (selected.capital && selected.capital.includes(';')) {
        multipleCaps = selected.capital.split(';');
      }

      if (multipleCaps) {
        capitalJSX = 
          <ul className="capitals">
            {
              multipleCaps.map((x) => {
                return (
                  <li key={x}>{x}</li>
                );
              })
            }
          </ul>;
      } else {
        capitalJSX = <span>{selected.capital}</span>;
      }

      if (selected.headOfGovernmentFull) {
        let arr;
        if (selected.headOfGovernmentFull.includes(';')) {
          arr = selected.headOfGovernmentFull.split(';');
        } else {
          arr = [selected.headOfGovernmentFull];
        }

        hogJSX = 
          <ul>
            {
              arr.map((x, i) => {
                return (
                  <li key={i}>{x}</li>
                );
              })
            }
          </ul>;
      }

      if (selected.chiefOfStateFull) {
        let arr;
        if (selected.chiefOfStateFull.includes(';')) {
          arr = selected.chiefOfStateFull.split(';');
        } else {
          arr = [selected.chiefOfStateFull];
        }

        hosJSX = 
          <ul>
            {
              arr.map((x, i) => {
                return (
                  <li key={i}>{x}</li>
                );
              })
            }
          </ul>;
      }
    }


    return (
      <div className="system-info">
        {nameJSX}
        <h4>Type of Government: <span>{selected.typeOfGovernment}</span></h4>
        <h4>Capital: </h4>
        {capitalJSX}
        {
          selected.independence ? 
            <h4>Independence: <span>{selected.independence}</span></h4>
            : null
        }
        <h4>Head of State:</h4>
        {hosJSX}
        <h4>Head of Government:</h4>
        {hogJSX}
      </div>
    );
  }
}

System.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
  location: PropTypes.object,
  systemGet: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    selected: state.system,
  };
};

const mapDispatchToProps = dispatch => ({
  systemGet: country => dispatch(systemActions.systemGetRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(System);
