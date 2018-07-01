import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import './countryForm.scss';

const defaultState = {
  countryName: '',
  countryNameDirty: false,
  countryNameError: 'Country already on list',
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
      countryNameDirty: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { countries } = this.props;
    const countryNames = countries.map((x) => {
      return x.countryName;
    });

    if (countryNames.includes(this.state.countryName)) {
      this.setState({ countryNameDirty: true })
    } else {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    }
  }

  render() {
    return (
      <div className="country-container">
        <h4>Don't see a country? Add it here:</h4>
        <form className="country-form" onSubmit={this.handleSubmit}>
          <input
            name="countryName"
            placeholder="Enter a country"
            type="text"
            value={this.state.countryName}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
          { this.state.countryNameDirty ? 
              <p>{ this.state.countryNameError }</p>
            : null
          }
        </form>
      </div>
    );
  }
}

CountryForm.propTypes = {
  onComplete: PropTypes.func,
  countries: PropTypes.array,
}

export default CountryForm;
