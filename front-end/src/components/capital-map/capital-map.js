import React from 'react';
import PropTypes from 'prop-types';

import * as routes from '../../utils/routes';
import * as systemActions from '../../actions/systemActions';
import * as countryActions from '../../actions/countryActions';
import FlagForm from '../flagForm/flag-form';

import './capital-map.scss';

class CapitalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    fetch(`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&callback=initMap`)
  }

  render() {
    return (
      <div className="google-map">
      </div>
    );
  }
}

CapitalMap.propTypes = {
  selected: PropTypes.object,
}

export default CapitalMap;
