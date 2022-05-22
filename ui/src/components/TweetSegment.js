import UserCard from "./tweets/UserCard";
import TweetCard from "./tweets/TweetCard";
import BarGraph from "./graphs/BarGraph";

const TweetSegment = ({ data }) => {
  const { user, tweets } = data;
  var influenceData = [["", "Influence"]];
  var infpolData = [["", "Influence Polarity"]];
  var sentimentData = [["", "Sentiment", { role: 'style' }]];
  tweets.map((tweet, index) => {
    influenceData.push(["", tweet.influence]);
    infpolData.push(["", tweet.influence_polarity]);
    sentimentData.push(["", tweet.sentiment,tweet.sentiment>0?"green":tweet.sentiment===0?"yellow":"red"]);
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
            infpolData={infpolData}
            sentimentData={sentimentData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TweetSegment;
