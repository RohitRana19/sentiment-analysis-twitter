import { Chart } from "react-google-charts";
import "../../styles/App.css";

const BarGraph = ({ influenceData,sentimentData }) => {
  return (
    <div style={{ width: "500px", margin: "20px" }}>
      <Chart
        chartType="LineChart"
        data={influenceData}
        options={{
          title: "Analysis",
          hAxis: { title: "" },
          vAxis: { title: "Influence Score" },
        }}
      />
      <br/>
      <Chart
        chartType="ColumnChart"
        data={sentimentData}
        options={{
          title: "Analysis",
          hAxis: { title: "" },
          vAxis: { title: "Sentiment Score" },
        }}
      />
    </div>
  );
}
export default BarGraph;
