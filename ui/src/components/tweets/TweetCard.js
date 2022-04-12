import "../../styles/App.css";

function TweetCard({ tweetData }) {
  const {
    text,
    created_at,
    retweet_count,
    favorite_count,
    entities,
    sentiment,
  } = tweetData;
  console.log(entities.hashtags);

  return (
    <div className="card">
      <label className="tweet">{text}</label>
      <label>{created_at}</label>
      <div>{retweet_count}</div>
      <div>{favorite_count}</div>
      <div>{sentiment}</div>
    </div>
  );
}
export default TweetCard;
