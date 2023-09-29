import React from 'react';

const VARIANT_TO_CLASSNAME = {
  success: 'happy',
  error: 'sad'
};

function Banner({ variant, children }) {
  return <div className={`${VARIANT_TO_CLASSNAME[variant]} banner`}>{children}</div>;
}

export default Banner;
