import { Chart } from "react-google-charts";
import "../../styles/App.css";

const Graph = ({
  influenceData,
  infpolData,
  sentimentData,
  frequencyData,
  splitSentiment,
  sumMetrics,
  lenMetrics,
}) => {
  return (
    <div style={{ width: "500px", margin: "20px" }}>
      <Chart
        chartType="ColumnChart"
        data={sentimentData}
        options={{
          title: "Sentiment Score of Tweets",
          hAxis: { title: "Timeline" },
          vAxis: { title: "Score" },
          legend: "none",
        }}
      />
      <br />
      <Chart
        chartType="ColumnChart"
        data={frequencyData}
        options={{
          title: "Frequency of Tweets",
          hAxis: { title: "Date" },
          vAxis: { title: "No. of Tweets" },
          legend: "none",
          colors: ["#74b6f7"],
        }}
      />
      <br />
      <Chart
        chartType="LineChart"
        data={splitSentiment}
        options={{
          title: "Sentiment Classification",
          hAxis: { title: "Date" },
          vAxis: { title: "Sentiment" },
          legend: "none",
          colors: ["#fc6060", "#f7d474", "#3dd19b"],
        }}
      />
      <br />
      <Chart
        chartType="LineChart"
        data={influenceData}
        options={{
          title: "Influence Score of Tweets",
          hAxis: { title: "Timeline" },
          vAxis: { title: "Influence" },
          legend: "none",
          colors: ["#74b6f7"],
        }}
      />
      <br />
      <Chart
        chartType="LineChart"
        data={infpolData}
        options={{
          title: "Influence Polarity of Tweets",
          hAxis: { title: "Timeline" },
          vAxis: { title: "Polarity" },
          colors: ["#74b6f7"],
          legend: "none",
        }}
      />
      <br />
      <Chart
        chartType="PieChart"
        data={lenMetrics}
        options={{
          title: "Sentiment Type Distribution",
          legend: "none",
          pieHole: 0.4,
          colors: ["#fc6060", "#f7d474", "#3dd19b"],
        }}
      />
      <br />
      <Chart
        chartType="PieChart"
        data={sumMetrics}
        options={{
          title: "Influence Type Distribution",
          legend: "none",
          colors: ["#fc6060", "#3dd19b"],
        }}
      />
    </div>
  );
};
export default Graph;
