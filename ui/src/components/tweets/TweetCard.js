import "../../styles/App.css";

function TweetCard({ tweetData }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const {
    text,
    created_at,
    retweet_count,
    favorite_count,
    entities,
    sentiment,
    influence,
  } = tweetData;
  var date = Date.parse(created_at);
  var hours = new Date(date).getHours();
  var mins = new Date(date).getMinutes();
  var day = new Date(date).getDate();
  var month = new Date(date).getMonth();
  var year = new Date(date).getFullYear();

  return (
    <div className="card">
      <div>{text}</div>
      <label className="greytext">
        {String(hours).padStart(2, "0")}:{String(mins).padStart(2, "0")}{" "}
        {months[month]} {day}, {year}
      </label>
      <hr />
      <div>
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ textAlign: "center" }}>Retweets</td>
            <td style={{ textAlign: "center" }}>Likes</td>
            <td style={{ textAlign: "center" }}>Sentiment</td>
            <td style={{ textAlign: "center" }}>Influence</td>
          </tr>
          <tr>
            <th>{retweet_count}</th>
            <th>{favorite_count}</th>
            <th
              style={
                sentiment > 0
                  ? { backgroundColor: "#3dd19b", color: "white" }
                  : sentiment === 0
                  ? { backgroundColor: "#f7d474", color: "white" }
                  : { backgroundColor: "#fc6060", color: "white" }
              }
            >
              {Math.abs(sentiment)}
            </th>
            <th>{influence === 0 ? 0 : influence.toFixed(2)}</th>
          </tr>
        </table>
      </div>
      <hr />
    </div>
  );
}
export default TweetCard;
