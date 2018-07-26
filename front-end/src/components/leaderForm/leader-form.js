import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from '../../utils/autoBind';

import * as photoActions from '../../actions/photoActions';

const defaultState = {
  leaderUrl: '',
  leaderUrlDirty: false,
  leaderUrlError: 'link invalid',
};

class LeaderPhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, LeaderPhotoForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      leaderUrlDirty: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { system } = this.props;
    console.log(system);

    // let searchableCountryName;

    // if (country.countryName.includes('_')) {
    //   searchableCountryName = country.countryName.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
    // } else {
    //   searchableCountryName = 
    //   country.countryName.charAt(0).toUpperCase() + country.countryName.slice(1);
    // }

    // if (!this.state.flagUrl.includes('wikipedia') 
    //     || !this.state.flagUrl.includes('Flag') 
    //     || !this.state.flagUrl.includes(searchableCountryName)) {
    //   this.setState({ flagUrlDirty: true });
    // } else {
    //   this.props.flagCreate(this.state, country._id);
    //   this.setState(defaultState);
    //   window.location.reload();
    // }
  }

  render() {
    return (
      <div className="leader-container">
        <h4>{'Enter Url of leader picture:'}</h4>
        <form className="leader-form" onSubmit={this.handleSubmit}>
          <input
            className="leader-url"
            name="leaderUrl"
            placeholder="Enter URL"
            type="text"
            value={this.state.countryName}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
          { this.state.leaderUrlDirty ? 
              <p>{ this.state.leaderUrlError }</p>
            : null
          }
        </form>
      </div>
    );
  }
}

LeaderPhotoForm.propTypes = {
  leaderPhotoCreate: PropTypes.func,
  system: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    system: state.system,
  };
};

const mapDispatchToProps = dispatch => ({
  leaderPhotoCreate: (leader, systemId) => dispatch(photoActions.flagCreateRequest(leader, systemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderPhotoForm);
