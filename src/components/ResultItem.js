import React from 'react';

const ResultItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center space-x-2">
      <div>{icon}</div>
      <div className="font-semibold">{label}:</div>
      <div>{value}</div>
    </div>
  );
};

export default ResultItem;
