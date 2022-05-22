import UserCard from "./tweets/UserCard";
import TweetCard from "./tweets/TweetCard";
import BarGraph from "./graphs/BarGraph";

const TweetSegment = ({ data }) => {
  const { user, tweets } = data;
  var influenceData = [["", "Influence"]];
  var sentimentData = [["", "Sentiment"]];
  tweets.map((tweet, index) => {
    influenceData.push(["", tweet.influence]);
    sentimentData.push(["", tweet.sentiment]);
  });

  return (
    <div style={{ display: "flex" }}>
      <div>
        <UserCard userData={user} />
        <div>
          {tweets.map((tweet, index) => {
            return <TweetCard key={tweet.id_str} tweetData={tweet} />;
          })}
        </div>
      </div>
      <div>
        {influenceData ? (
          <BarGraph
            influenceData={influenceData}
            sentimentData={sentimentData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TweetSegment;
