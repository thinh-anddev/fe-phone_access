import { useNavigate } from "react-router-dom";
import logo from "../../assets/image-common/logo.png";
import { useState, useContext, useEffect } from "react";
import ProductsManagePage from "./ProductsManagePage";
import OrdersManagePage from "./OrdersManagePage";
import AccountsManagePage from "./AccountsManagePage";
import ReportPage from "./report";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { getUserFromSession } from "@/utils/User";
import ContactManagePage from "./ContactManagePage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useContext(LoginContext);

  function navigateTo(link: string) {
    navigate(link);
  }

  useEffect(() => {
    const userSession: any | null = getUserFromSession();
    if (userSession) {
      setUser(userSession);
      if (userSession.role !== 1) {
        navigate("/");
      }
    } else {
      navigate("/user");
    }
  }, [setUser, navigate]);
  const tabs = [
    "Báo cáo thu nhập",
    "Quản lý sản phẩm",
    "Quản lý đơn hàng",
    "Quản lý người dùng",
    "Quản lý phản hồi",
  ];
  const [tabActive, setTabActive] = useState(tabs[0]);
  const handleClickTab = (tab: string) => {
    setTabActive(tab);
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center w-[12%] h-screen gap-4 shadow-lg">
        <div
          className="border-b-2 border-gray-300 cursor-pointer"
        // onClick={() => navigateTo("/")}
        >
          <img className="w-1/2 mx-auto" src={logo} alt="" />
        </div>
        <div className="flex flex-col w-full text-base text-center uppercase">
          {tabs.map((tab) => {
            return (
              <div
                key={tab}
                onClick={() => handleClickTab(tab)}
                className={`py-2 m-1 rounded cursor-pointer border-b-gray-300 duration-100 hover:bg-primary hover:bg-opacity-70
                    ${tab === tabActive ? "bg-primary " : ""}
                    `}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center w-[88%] gap-2 m-2">
        <div className="flex w-full items-center h-[60px] bg-primary bg-opacity-70 rounded shadow-lg gap-x-10">
          <div className="flex flex-row font-bold justify-evenly gap-2 ml-4">
            <div
              onClick={() => navigateTo("/account")}
              className="transition-all cursor-pointer hover:text-primary"
            >
              {user ? user.username : "Khách"}
            </div>
            <div
              onClick={() => {
                handleLogout();
                navigateTo("/");
              }}
              className="transition-all cursor-pointer hover:text-primary"
            >
              Thoát
            </div>
          </div>
        </div>
        <div className="w-full h-10 rounded">
          {tabActive === tabs[0] && <ReportPage />}
          {tabActive === tabs[1] && <ProductsManagePage />}
          {tabActive === tabs[2] && <OrdersManagePage />}
          {tabActive === tabs[3] && <AccountsManagePage />}
          {tabActive === tabs[4] && <ContactManagePage />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;