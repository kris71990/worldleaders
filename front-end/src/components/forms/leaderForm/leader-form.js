import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useMutation } from '@apollo/client';
import { UPDATE_LEADER } from '../../../graphql/mutations/system';

import * as photoActions from '../../../actions/photoActions';

import './leader-form.scss';

function LeaderPhotoForm(props) {
  const id = props.system._id;
  const [leaderUrl, setLeaderUrl] = useState('');
  const [leaderUrlDirty, setLeaderUrlDirty] = useState(false);
  const [leaderUrlError, setLeaderUrlError] = useState('');

  const [updateLeader, { data, error }] = useMutation(UPDATE_LEADER, { // eslint-disable-line
    variables: { id, leaderUrl, leaderType: props.type },
    onCompleted() {
      setLeaderUrlDirty(false);
      setLeaderUrlError('');
      setLeaderUrl('');
    },
    update(cache, { data: { system } }) { // eslint-disable-line
      cache.modify({
        fields: {
          system() {
            return system;
          },
        },
      });
    },
    onError(error) { // eslint-disable-line
      setLeaderUrlError(`Error: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setLeaderUrl(e.target.value);
    setLeaderUrlDirty(false);
    setLeaderUrlError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { keywords } = props;
    const caselessUrl = leaderUrl.toLowerCase();

    if (keywords) {
      let validated = false;

      keywords.some((name) => {
        if (caselessUrl.includes(name)) {
          validated = true;
        }
        return null;
      }); 

      if (validated && props.type === 'hog') {
        updateLeader(id, leaderUrl);
        // .then(() => {
        //   this.props.systemGet(system.countryName);
        // });
        setLeaderUrl('');
        setLeaderUrlDirty(false);
        setLeaderUrlError('');
      } else if (validated && props.type === 'cos') {
        updateLeader(id, leaderUrl);
        // .then(() => {
        //   this.props.systemGet(system.countryName);
        // });
        setLeaderUrl('');
        setLeaderUrlDirty(false);
        setLeaderUrlError('');
      } else {
        setLeaderUrl('');
        setLeaderUrlDirty(true);
        setLeaderUrlError('Invalid URL');
      }
    }
  };

  return (
    <div className="leader-container">
      <h5>{ 'Enter Url of leader photo:' }</h5>
      <form className="leader-form" onSubmit={ handleSubmit }>
        <input
          className="leader-url"
          name="leaderUrl"
          placeholder="Enter URL"
          type="text"
          value={ leaderUrl }
          onChange={ handleChange }
        />
        <button type="submit">Submit</button>
        { leaderUrlDirty ? 
            <p>{ leaderUrlError }</p>
          : null
        }
      </form>
    </div>
  );
}

LeaderPhotoForm.propTypes = {
  headOfGovernmentPhotoCreate: PropTypes.func,
  headOfStatePhotoCreate: PropTypes.func,
  system: PropTypes.object,
  keywords: PropTypes.array,
  type: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  headOfGovernmentPhotoCreate: 
  (leader, systemId) => dispatch(photoActions.headOfGovernmentPhotoCreateRequest(leader, systemId)),
  headOfStatePhotoCreate: 
  (leader, systemId) => dispatch(photoActions.headOfStatePhotoCreateRequest(leader, systemId)),
});

export default connect(null, mapDispatchToProps)(LeaderPhotoForm);
