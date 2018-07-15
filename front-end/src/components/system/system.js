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
    console.log(selected);

    if (selected.headOfGovernment && selected.chiefOfState) {
      const hogs = selected.headOfGovernment.match(/\b[A-Z]+\b/g);
      const hos = selected.chiefOfState.match(/\b[A-Z]+\b/g);
      const split = selected.headOfGovernment.split(' ');
      console.log(split);

      const full = hogs.map((x) => {
        console.log(x);
        return split.indexOf(x);
      });
      console.log(full, hogs);
    }

    return (
      <div className="system-info">
      {selected.fullName}
      <br/>
      {selected.typeOfGovernment}
      <br/>
      {selected.capital}
      <br/>
      {selected.chiefOfState}
      <br/>
      {selected.headOfGovernment}
      <br/>
      {selected.independence}
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
