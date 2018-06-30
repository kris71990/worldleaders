import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import './countryForm.scss';

const defaultState = {
  countryName: '',
}

class CountryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, CountryForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    const { countries } = this.props;
    return (
      <form className="country-form" onSubmit={this.handleSubmit}>
        <input
          name="countryName"
          placeholder="Enter a country"
          type="text"
          value={this.state.countryName}
          onChange={this.handleChange}
        />
        <button type="submit">Add country</button>
      </form>
    );
  }
}

CountryForm.propTypes = {
  onComplete: PropTypes.func,
  countries: PropTypes.array,
}

export default CountryForm;
