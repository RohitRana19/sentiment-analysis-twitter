import UserCard from "./tweets/UserCard";
import TweetCard from "./tweets/TweetCard";
import Graph from "./graphs/Graph";

const TweetSegment = ({ data }) => {
  const { user, tweets } = data;
  var influenceData = [["Timeline", "Influence"]];
  var infpolData = [["Timeline", "Influence Polarity"]];
  var sentimentData = [["Timeline", "Sentiment", { role: "style" }]];
  var splitSentiment = [["Timeline", "Negative", "Neutral", "Positive"]];
  var frequencyData = [["Timeline", "No. of Tweets"]];
  var sumMetrics = [["Influence Type", "Avg. Influence Score"]];
  var lenMetrics = [["Sentiment Type", "No. of Tweets"]];
  var { sum_metrics, len_metrics, date_metrics } = user;

  sumMetrics.push(["Negative", Math.abs(sum_metrics[0])], ["Positive", sum_metrics[2]]);
  lenMetrics.push(
    ["Negative", len_metrics[0]],
    ["Neutral", len_metrics[1]],
    ["Positive", len_metrics[2]]
  );
  console.log(sumMetrics);

  tweets.map((tweet, index) => {
    influenceData.push([tweet.created_at, tweet.influence]);
    infpolData.push([tweet.created_at, tweet.influence_polarity]);
    sentimentData.push([
      tweet.created_at,
      tweet.sentiment,
      tweet.sentiment > 0
        ? "#3dd19b"
        : tweet.sentiment === 0
        ? "#f7d474"
        : "#fc6060",
    ]);
  });

  Object.keys(date_metrics).map((key) => {
    splitSentiment.push([
      key,
      date_metrics[key][0],
      date_metrics[key][1],
      date_metrics[key][2],
    ]);

    frequencyData.push([key, date_metrics[key].reduce((a, b) => a + b, 0)]);
  });

  return (
    <div style={{ display: "flex" }}>
      <div>
        <UserCard userData={user} />
        <div style={{ height: "80vh", overflow: "scroll" }}>
          {tweets.map((tweet, index) => {
            return <TweetCard key={index} tweetData={tweet} />;
          })}
        </div>
      </div>
      <div style={{ height: "90vh", overflow: "scroll" }}>
        {influenceData ? (
          <Graph
            influenceData={influenceData}
            infpolData={infpolData}
            sentimentData={sentimentData}
            frequencyData={frequencyData}
            splitSentiment={splitSentiment}
            sumMetrics={sumMetrics}
            lenMetrics={lenMetrics}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TweetSegment;
