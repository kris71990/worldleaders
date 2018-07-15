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
    // if (selected.headOfGovernment && selected.chiefOfState) {
    //   const hogs = selected.headOfGovernment.match(/\b[A-Z]+\b/g);
    //   const hos = selected.chiefOfState.match(/\b[A-Z]+\b/g);
    //   const split = selected.headOfGovernment.split(' ');
    //   console.log(split);

    //   const full = hogs.map((x) => {
    //     console.log(x);
    //     return split.indexOf(x);
    //   });
    //   console.log(full, hogs);
    // }

    return (
      <div className="system-info">
        <h1>{selected.fullName}</h1><br/>
        <h4>Type of Government: <span>{selected.typeOfGovernment}</span></h4><br/>
        <h4>Capital: </h4>{capitalJSX}<br/>
        <p>{selected.chiefOfState}</p><br/>
        <p>{selected.headOfGovernment}</p><br/>
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
