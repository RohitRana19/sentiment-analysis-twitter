import { Chart } from "react-google-charts";
import "../styles/App.css";

function LineGraph() {
  const data = [
    ["DateTime", "Score"],
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
        chartType="LineChart"
        data={data}
        options={{
          title: "Analysis",
          hAxis: { title: "DateTime" },
          vAxis: { title: "Influence score" },
        }}
      />
    </div>
  );
}
export default LineGraph;
