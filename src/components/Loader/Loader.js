import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="left-0 top-0 absolute w-screen h-screen grid place-content-center">
      <CircularProgress />
    </div>
  );
};

export default Loader;
