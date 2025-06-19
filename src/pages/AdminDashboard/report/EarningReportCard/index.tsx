import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Chart from "./Chart";
import { getAllYears, getRevenueInYear } from "@/api/Order";
import { useTranslation } from "react-i18next";

export type SeriesItem = {
  name: string;
  data: number[];
};

const EarningReportCard = () => {
  const [years, setYears] = useState<number[]>([]);
  const [activeYear, setActiveYear] = useState(years && years[0]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [yAxis, setYAxis] = useState<SeriesItem[]>([]);
  const { t } = useTranslation();
  const xUnique = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleActiveYear = (year: number) => {
    setActiveYear(year);
  };

  const [toggleYear, setToggleYear] = useState(false);
  const handleToggleYear = () => {
    setToggleYear(!toggleYear);
  };
  const getRevenue = async (year: number) => {
    setXAxis(xUnique);
    const response = await getRevenueInYear(year);
    if (response.success) {
      console.log();
      setYAxis([
        {
          name: "Orders",
          data: response.data,
        },
      ]);
    }
  };
  useEffect(() => {
    getRevenue(activeYear);
  }, [activeYear]);
  useEffect(() => {
    const getYears = async () => {
      const response = await getAllYears();
      if (response.success) setYears(response.data);
      setActiveYear(response.data[0]);
      getRevenue(response.data[0]);
    };
    getYears();
  }, []);

  return (
    <div className="flex flex-col w-1/2 gap-2 p-8 rounded shadow-lg ">
      <div className="flex flex-col gap-6 bg-white rounded-md text-blacks shadow-chart-report">
        <div className="flex justify-between">
          <div className="flex flex-col gap-[2px]">
            <div className="text-[18px] font-medium leading-6 opacity-90">
              {t("revenue_report")}
            </div>
            <div className="left-5 text-[13px] opacity-50">
              {t("overview")} {activeYear}
            </div>
          </div>
          <div>
            <FaEllipsisV
              onClick={() => handleToggleYear()}
              className="opacity-50 cursor-pointer"
            />
            <div className="relative select-none">
              <div
                className={`absolute top-0 right-0 z-[1] flex-col mr-2 border bg-white border-gray-200 divide-y divide-gray-200 rounded shadow-sm cursor-pointer 
            ${toggleYear ? "flex" : "hidden"}`}
              >
                {years &&
                  years.map((year) => {
                    return (
                      <div
                        key={year}
                        onClick={() => handleActiveYear(year)}
                        className={`px-8 py-2 hover:bg-gray-200 ${
                          activeYear === year ? "bg-gray-200" : ""
                        }`}
                      >
                        {year}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <Chart xAxis={xAxis} yAxis={yAxis} />
      </div>
    </div>
  );
};
export default EarningReportCard;
