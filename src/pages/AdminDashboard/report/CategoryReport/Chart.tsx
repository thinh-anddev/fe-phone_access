import ReactApexChart from "react-apexcharts";
interface ChartProps {
  series: number[];
  labels: string[];
}
const Chart: React.FC<ChartProps> = (props) => {
  const { series, labels } = props;
  const state = {
    series: series,
    options: {
      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="pie"
      width={380}
    />
  );
};
export default Chart;
