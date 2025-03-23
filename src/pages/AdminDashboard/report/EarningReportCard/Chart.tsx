import ReactApexChart from "react-apexcharts";
import { SeriesItem } from ".";

interface ChartProps {
  xAxis: string[];
  yAxis: SeriesItem[];
}
const Chart: React.FC<ChartProps> = (props) => {
  const { xAxis, yAxis } = props;
  const thisMonth = new Date().getMonth();
  const colors = Array(12).fill("#E8E7FD");
  colors[thisMonth] = "#7367F0";
  const chartConfigs = {
    options: {
      stacked: true,
      xaxis: {
        categories: xAxis,
        showForNullSeries: false,

        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
      colors: colors,
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "50%",
          distributed: true,
        },
      },
      dataLabels: { enabled: false },
      legend: { show: false },
    },
    series: yAxis,
  };
  return (
    <ReactApexChart
      options={chartConfigs.options}
      series={chartConfigs.series}
      type="bar"
    />
  );
};
export default Chart;
