import { Chart } from "react-google-charts";
import "../../styles/App.css";

function BarGraph() {
  const data = [
    ["Sentiment", "Tweets"],
    ["01 Apr", 23],
    ["02 Apr", 40],
    ["03 Apr", 35],
    ["04 Apr", 15],
    ["05 Apr", 20],
    ["06 Apr", 33],
  ];
  return (
    <div style={{ width: "500px", margin: "20px" }}>
      <Chart
        chartType="ColumnChart"
        data={data}
        options={{
          title: "Analysis",
          hAxis: { title: "Sentiment" },
          vAxis: { title: "No. of Tweets" },
        }}
      />
    </div>
  );
}
export default BarGraph;
