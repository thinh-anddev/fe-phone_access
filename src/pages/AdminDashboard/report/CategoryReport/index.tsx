import { getAllYears, getRevenueByCategory } from "@/api/Order";
import { useEffect, useState } from "react";
import Chart from "./Chart";

const CategoryReport = () => {
  const [seri, setSeri] = useState<number[]>([]);
  const [labs, setLabs] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const months = [
    "Tháng 01",
    "Tháng 02",
    "Tháng 03",
    "Tháng 04",
    "Tháng 05",
    "Tháng 06",
    "Tháng 07",
    "Tháng 08",
    "Tháng 09",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const getYears = async () => {
    const response = await getAllYears();
    if (response.success) setYears(response.data);
  };
  const getData = async (month: number, year: number) => {
    const response = await getRevenueByCategory(month, year);
    if (response.success) {
      setSeri(response.data.data);
      setLabs(response.data.labels);
    }
  };

  useEffect(() => {
    getYears();
    getData(selectedMonth, selectedYear);
  }, []);
  useEffect(() => {
    getData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickMonth = (e: any) => {
    setSelectedMonth(e.target.value.slice(6, 8));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickYear = (e: any) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="flex flex-col w-1/2 gap-5 p-8 rounded shadow-lg h-fit">
      <div className="flex justify-between">
        <div>Thống kê</div>
        <div>
          <select
            name="month"
            value={months[selectedMonth - 1]}
            id=""
            onChange={(e) => handleClickMonth(e)}
          >
            {months.map((month) => {
              return <option value={month}>{month}</option>;
            })}
          </select>
          <select
            name="year"
            value={selectedYear}
            id=""
            onChange={(e) => handleClickYear(e)}
          >
            {years.length > 0 &&
              years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            {years.length == 0 && <option value={2025}>2025</option>}
          </select>
        </div>
      </div>
      {seri.length > 0 && <Chart series={seri} labels={labs} />}
    </div>
  );
};
export default CategoryReport;
