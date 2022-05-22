import { Chart } from "react-google-charts";
import "../../styles/App.css";

const BarGraph = ({ influenceData, infpolData, sentimentData }) => {
  return (
    <div style={{ width: "500px", margin: "20px" }}>
      <Chart
        chartType="ColumnChart"
        data={sentimentData}
        options={{
          title: "Sentiment Score of Tweets",
          hAxis: { title: "" },
          vAxis: { title: "Score" },
          legend:"none"
        }}
      />
      <br />
      <Chart
        chartType="LineChart"
        data={influenceData}
        options={{
          title: "Influence Score of Tweets",
          hAxis: { title: "" },
          vAxis: { title: "Influence" },
          legend:"none"
        }}
      />
      <br />
      <Chart
        chartType="LineChart"
        data={infpolData}
        options={{
          title: "Influence Polarity of Tweets",
          hAxis: { title: "" },
          vAxis: { title: "Polarity" },
          colors:["black"],
          legend:"none"
        }}
      />
    </div>
  );
};
export default BarGraph;
