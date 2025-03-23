import EarningReportCard from "./EarningReportCard";
import CategoryReport from "./CategoryReport";
const ReportPage = () => {
  return (
    <div className="flex w-full gap-4">
      <EarningReportCard />
      <CategoryReport />
    </div>
  );
};
export default ReportPage;
