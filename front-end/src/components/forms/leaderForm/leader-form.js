import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autoBind from '../../../utils/autoBind';

import * as systemActions from '../../../actions/systemActions';
import * as photoActions from '../../../actions/photoActions';

import './leader-form.scss';

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

    if (keywords) {
      let validated = false;

      keywords[1].some((name) => {
        if (caselessUrl.includes(name)) {
          validated = true;
        }
        return null;
      }); 

      if (validated && this.props.type === 'hog') {
        this.props.headOfGovernmentPhotoCreate(this.state, system._id)
          .then(() => {
            this.props.systemGet(system.countryName);
          });
        this.setState(defaultState);
      } else if (validated && this.props.type === 'hos') {
        this.props.headOfStatePhotoCreate(this.state, system._id)
          .then(() => {
            this.props.systemGet(system.countryName);
          });
        this.setState(defaultState);
      } else {
        this.setState({ leaderUrlDirty: true });
      }
    }
  }

  render() {
    return (
      <div className="leader-container">
        <h5>{ 'Enter Url of leader photo:' }</h5>
        <form className="leader-form" onSubmit={ this.handleSubmit }>
          <input
            className="leader-url"
            name="leaderUrl"
            placeholder="Enter URL"
            type="text"
            value={ this.state.countryName }
            onChange={ this.handleChange }
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
  headOfGovernmentPhotoCreate: PropTypes.func,
  headOfStatePhotoCreate: PropTypes.func,
  systemGet: PropTypes.func,
  system: PropTypes.object,
  keywords: PropTypes.array,
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    system: state.system,
  };
};

const mapDispatchToProps = dispatch => ({
  headOfGovernmentPhotoCreate: 
  (leader, systemId) => dispatch(photoActions.headOfGovernmentPhotoCreateRequest(leader, systemId)),
  headOfStatePhotoCreate: 
  (leader, systemId) => dispatch(photoActions.headOfStatePhotoCreateRequest(leader, systemId)),
  systemGet: system => dispatch(systemActions.systemGetRequest(system)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderPhotoForm);
