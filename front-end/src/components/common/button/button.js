import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const CustomButton = (props) => {
  const { action, text } = props;
  return <button onClick={ action }>{ text }</button>;
};

CustomButton.propTypes = {
  action: PropTypes.func,
  text: PropTypes.string,
};

export default CustomButton;
