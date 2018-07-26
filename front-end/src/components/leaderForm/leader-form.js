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
    const { keywords } = this.props;
    const { system } = this.props;
    const caselessUrl = this.state.leaderUrl.toLowerCase();
    console.log(caselessUrl);

    if (keywords) {
      let validated = false;

      console.log(keywords);
      keywords[1].some((name) => {
        if (caselessUrl.includes(name)) {
          validated = true;
        }
        return null;
      }); 

      if (validated) {
        this.props.leaderPhotoCreate(this.state, system._id);
        this.setState(defaultState);
        window.location.reload();
      } else {
        this.setState({ leaderUrlDirty: true });
      }
    }
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
  keywords: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    system: state.system,
  };
};

const mapDispatchToProps = dispatch => ({
  leaderPhotoCreate: (leader, systemId) => dispatch(photoActions.leaderPhotoCreateRequest(leader, systemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderPhotoForm);
