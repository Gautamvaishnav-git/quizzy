import NextTopLoader, { NextTopLoaderProps } from "nextjs-toploader";

const ProgressBar = (props: NextTopLoaderProps) => {
  return <NextTopLoader color="#FF1CF7" {...props} />;
};

export default ProgressBar;
