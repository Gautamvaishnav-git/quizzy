import React from "react";
import NextTopLoader, { NextTopLoaderProps } from "nextjs-toploader";

const ProgressBar = (props: NextTopLoaderProps) => {
  return <NextTopLoader color="#00b7fa" {...props} />;
};

export default ProgressBar;
