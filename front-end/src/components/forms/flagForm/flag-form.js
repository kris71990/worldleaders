import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useMutation } from '@apollo/client';
import { UPDATE_FLAG } from '../../../graphql/mutations/country';

import CustomButton from '../../common/button/button';
import { parseCountryName } from '../../../utils/parser';

import './flag-form.scss';

function FlagForm(props) {
  const id = props.country._id;
  const [flagUrl, setFlagUrl] = useState('');
  const [flagUrlDirty, setFlagDirty] = useState(false);
  const [flagUrlError, setFlagError] = useState('');

  const [updateFlag, { data, error }] = useMutation(UPDATE_FLAG, { // eslint-disable-line
    variables: { id, flagUrl },
    onCompleted() {
      setFlagDirty(false);
      setFlagError('');
      setFlagUrl('');
    },
    update(cache, { data: { country } }) { // eslint-disable-line
      cache.modify({
        fields: {
          country() {
            return country;
          },
        },
      });
    },
    onError(error) { // eslint-disable-line
      setFlagError(`Error: ${error.message}`);
    },
  });

  const handleChange = (e) => {
    setFlagUrl(e.target.value);
    setFlagDirty(false);
    setFlagError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchableCountryName = parseCountryName(props.country.countryName);
    
    if (flagUrl.slice(0, 29) !== 'https://upload.wikimedia.org/'
        || !flagUrl.includes('Flag') 
        || !flagUrl.includes(searchableCountryName)) {
      return setFlagDirty(true);
    }

    return updateFlag(id, flagUrl);
  };

  return (
    <div className="flag-container">
      <h4>{ 'Enter Url of flag picture:' }</h4>
      <form className="flag-form" onSubmit={ handleSubmit }>
        <input
          className="flag-url"
          name="flagUrl"
          placeholder="Enter URL"
          type="text"
          value={ flagUrl }
          onChange={ handleChange }
        />
        <CustomButton text='Submit'/>
        { flagUrlDirty ? 
            <p>{ flagUrlError }</p>
          : null
        }
      </form>
    </div>
  );
}

FlagForm.propTypes = {
  country: PropTypes.object,
};

export default FlagForm;
