import UserCard from "./tweets/UserCard";
import TweetCard from "./tweets/TweetCard";
import BarGraph from "./graphs/BarGraph";

const TweetSegment = ({ data }) => {
  const { user, tweets } = data;

  return (
    <div style={{display:'flex'}}>
      <div>
        <UserCard userData={user} />
        <div>
          {tweets.map((tweet, index) => {
            return <TweetCard key={tweet.id_str} tweetData={tweet} />;
          })}
        </div>
      </div>
    <BarGraph/>
    </div>
  );
};

export default TweetSegment;
