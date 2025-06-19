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
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useContext(LoginContext);
  const { t, i18n } = useTranslation();

  // Danh sách ngôn ngữ
  const languages = [
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
  ];

  // Khởi tạo ngôn ngữ từ localStorage
  const getInitialLanguage = () => {
    const savedLanguageCode = localStorage.getItem("language");
    const selectedLang = languages.find(
        (lang) => lang.code === savedLanguageCode
    );
    return selectedLang ? selectedLang.name : "Tiếng Việt";
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Danh sách tab
  const tabs = [
    t("revenue_report"),
    t("manage_products"),
    t("manage_orders"),
    t("manage_users"),
    t("manage_contacts"),
  ];
  // Lưu chỉ số tab đang chọn (mặc định là 0 - tab đầu tiên)
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  function navigateTo(link: string) {
    navigate(link);
  }

  // Xử lý thay đổi ngôn ngữ
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng.code);
    localStorage.setItem("language", lng.code);
    setSelectedLanguage(lng.name);
    setIsDropdownOpen(false);
  };

  // Kiểm tra ngôn ngữ khi component mount
  useEffect(() => {
    const savedLanguageCode = localStorage.getItem("language");
    if (savedLanguageCode && savedLanguageCode !== i18n.language) {
      i18n.changeLanguage(savedLanguageCode);
      const selectedLang = languages.find(
          (lang) => lang.code === savedLanguageCode
      );
      if (selectedLang) {
        setSelectedLanguage(selectedLang.name);
      }
    }
  }, [i18n]);

  // Kiểm tra trạng thái đăng nhập
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

  const handleClickTab = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
      <div className="flex w-full">
        <div className="flex flex-col items-center w-[12%] h-screen gap-4 shadow-lg">
          <div
              className="border-b-2 border-gray-300 cursor-pointer"
              onClick={() => navigateTo("/")}
          >
            <img className="w-1/2 mx-auto" src={logo} alt="" />
          </div>
          {/* Tabs điều hướng */}
          <div className="flex flex-col w-full text-base text-center uppercase">
            {tabs.map((tab, index) => (
                <div
                    key={tab}
                    onClick={() => handleClickTab(index)}
                    className={`py-2 m-1 rounded cursor-pointer border-b-gray-300 duration-100 hover:bg-primary hover:bg-opacity-70
                ${index === activeTabIndex ? "bg-primary" : ""}`}
                >
                  {tab}
                </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center w-[88%] gap-2 m-2">
          <div className="flex w-full items-center h-[60px] bg-primary bg-opacity-70 rounded shadow-lg justify-between px-4">
            {/* Bộ chọn ngôn ngữ */}
            <div className="relative">
              <button
                  className="flex items-center justify-between px-3 py-1 font-bold text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedLanguage}
                <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {languages.map((language) => (
                        <div
                            key={language.code}
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleLanguageChange(language)}
                        >
                          {language.name}
                        </div>
                    ))}
                  </div>
              )}
            </div>
            {/* Tên người dùng và nút Thoát */}
            <div className="flex flex-row font-bold items-center gap-2">
              <div
                  onClick={() => navigateTo("/account")}
                  className="transition-all cursor-pointer hover:text-primary"
              >
                {user ? user.username : t("guest")}
              </div>
              <div
                  onClick={() => {
                    handleLogout();
                    navigateTo("/");
                  }}
                  className="transition-all cursor-pointer hover:text-primary"
              >
                {t("logout")}
              </div>
            </div>
          </div>
          <div className="w-full h-10 rounded">
            {activeTabIndex === 0 && <ReportPage />}
            {activeTabIndex === 1 && <ProductsManagePage />}
            {activeTabIndex === 2 && <OrdersManagePage />}
            {activeTabIndex === 3 && <AccountsManagePage />}
            {activeTabIndex === 4 && <ContactManagePage />}
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;