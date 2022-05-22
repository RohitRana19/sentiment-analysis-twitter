import { BoxLoading } from "react-loadingg";

const LoadScreen = () => {
  return (
    <div>
      <h1>Fetching and Analysing Tweets...</h1>
      <BoxLoading />
    </div>
  );
};

export default LoadScreen;
