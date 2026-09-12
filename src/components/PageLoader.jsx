import React from 'react';

const PageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5 w-full">
      <div className="w-11 h-11 rounded-full border-4 border-gray-200 border-t-sky-500 animate-[spin_0.8s_linear_infinite]"></div>
      <span className="text-sm font-medium text-gray-400">{text}</span>
    </div>
  );
};

export default PageLoader;
