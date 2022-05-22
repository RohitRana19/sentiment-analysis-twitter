import { BoxLoading } from "react-loadingg";

const LoadScreen = () => {
  return (
    <div>
      <h1 className="loading">Fetching and Analysing Tweets</h1>
      <BoxLoading />
    </div>
  );
};

export default LoadScreen;
