import UserCard from "./tweets/UserCard";

import TweetCard from "./tweets/TweetCard";

const TweetSegment = ({ data }) => {
  const { user, tweets } = data;

  return (
    <div>
      <UserCard userData={user} />
      <div>
        {tweets.map((tweet, index) => {
          return <TweetCard key={tweet.id_str} tweetData={tweet} />;
        })}
      </div>
    </div>
  );
};

export default TweetSegment;
