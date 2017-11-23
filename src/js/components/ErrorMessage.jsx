import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = (props) => {
  const {wrongValue} = props;

  if(wrongValue) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> Currency value can not be less then zero!
      </div>
    )
  } else {
    return null
  }
}

ErrorMessage.propTypes = {
  wrongValue: PropTypes.bool
}

export default ErrorMessage;
