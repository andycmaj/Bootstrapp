import React from 'react';
import PropTypes from 'prop-types'; // ES6

const Home = ({ values }) => {
  return <div>{JSON.stringify(values)}</div>;
};

Home.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Home;
