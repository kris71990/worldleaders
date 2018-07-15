import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as systemActions from '../../actions/systemActions';
import * as routes from '../../utils/routes';
import './system.scss';

class System extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
    // console.log(selected);
    let capitalJSX = null;

    if (selected) {
      let multipleCaps = null;
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
        capitalJSX = <p>{selected.capital}</p>;
      }
    }
    if (selected.headOfGovernmentFull && selected.chiefOfStateFull) {
      const fullGov = selected.headOfGovernmentFull;
      const fullState = selected.chiefOfStateFull;
      const multsGov = fullGov.includes(';') ? fullGov.split(';') : null;
      const multsState = fullState.includes(';') ? fullState.split(';') : null;
      
      const keywordsGov = {};
      if (multsGov) {
        multsGov.map((x, i) => {
          const caps = multsGov[i].match(/\b[A-Z]+\b/g);
          keywordsGov[i + 1] = caps;
          return null;
        });
      } else {
        keywordsGov[1] = fullGov.match(/\b[A-Z]+\b/g);
      }

      const keywordsState = {};
      if (multsState) {
        multsState.map((x, i) => {
          const caps = multsState[i].match(/\b[A-Z]+\b/g);
          keywordsState[i + 1] = caps;
          return null;
        });
      } else {
        keywordsState[1] = fullState.match(/\b[A-Z]+\b/g);
      }

      console.log('head of gov', keywordsGov);
      console.log('chief of state', keywordsState);
      // const hogs = selected.headOfGovernmentFull.match(/\b[A-Z]+\b/g);
      // const hos = selected.chiefOfStateFull.match(/\b[A-Z]+\b/g);
      // const split = selected.headOfGovernmentFull.split(' ');
      // console.log(split);

      // const full = hogs.map((x) => {
      //   console.log(x);
      //   return split.indexOf(x);
      // });
      // console.log(full, hogs);
    }

    return (
      <div className="system-info">
        <h1>{selected.fullName}</h1><br/>
        <h4>Type of Government: <span>{selected.typeOfGovernment}</span></h4><br/>
        <h4>Capital: </h4>{capitalJSX}<br/>
        <p>{selected.chiefOfStateFull}</p><br/>
        <p>{selected.headOfGovernmentFull}</p><br/>
        {
          selected.independence ? 
            <h4>Independence: <span>{selected.independence}</span></h4>
            : null
        }
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
