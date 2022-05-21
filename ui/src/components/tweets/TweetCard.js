import "../../styles/App.css";

function TweetCard({ tweetData }) {
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const {
    text,
    created_at,
    retweet_count,
    favorite_count,
    entities,
    sentiment,
    influence
  } = tweetData;
  var date=Date.parse(created_at);
  var hours=new Date(date).getHours();
  var mins=new Date(date).getMinutes();
  var day=new Date(date).getDate();
  var month=new Date(date).getMonth();
  var year=new Date(date).getFullYear();
  console.log(entities.hashtags);

  return (
    <div className="card">
      <div>{text}</div>
      <label className="greytext">
        {String(hours).padStart(2, "0")}:{String(mins).padStart(2, "0")}{" "}
        {months[month]} {day}, {year}
      </label>
      <hr />
      <div>
        <b>{retweet_count}</b> Retweets
        <b> {favorite_count}</b> Likes
      </div>
      <hr />
      <div>Sentiment Score: {sentiment}</div>
      <div>Influence Score: {influence}</div>
    </div>
  );
}
export default TweetCard;
