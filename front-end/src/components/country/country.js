import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autoBind';

import * as countryActions from '../../actions/countryActions';
import * as routes from '../../utils/routes';
import './country.scss';

const defaultState = {
  selected: {},
}

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, Country);
  }

  componentDidMount() {
    this.props.countryGet();
  }

  render() {
    const { selected } = this.props;
    console.log(this.props);

    return (
      <div className="country">
        {
          selected ? 
          <div>
        <h1>{selected.countryName}</h1>
        <h3>{selected.location}</h3>
        </div>
        : null
        }
      </div>
    )
  }
}

Country.propTypes = {
  history: PropTypes.object,
  selected: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    selected: state.country,
  };
};

const mapDispatchToProps = dispatch => ({
  // countryListFetch: () => dispatch(countryActions.countryListGetRequest()),
  // countryCreate: country => dispatch(countryActions.countryCreateRequest(country)),
  countryGet: country => dispatch(countryActions.countryGetRequest(country)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Country);
