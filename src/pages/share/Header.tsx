import { useNavigate } from "react-router-dom";
import logo from "../../assets/image-common/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { getUserFromSession } from "@/utils/User";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { getCarts } from "../Cart/api";
import SearchBar from "./Search";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import CategoryBar from "./CategoryBar";
import { CartDetailType } from "@/utils/models";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, setUser, handleLogout, cartQuantity, setCartQuantity } =
      useContext(LoginContext);
  const navigate = useNavigate();
  const toast = useContext(ToastContext);
  const url = window.location.href;
  const { i18n, t } = useTranslation();

  // Khởi tạo selectedLanguage dựa trên localStorage
  const languages = [
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
  ];

  const getInitialLanguage = () => {
    const savedLanguageCode = localStorage.getItem("language");
    const selectedLang = languages.find(
        (lang) => lang.code === savedLanguageCode
    );
    return selectedLang ? selectedLang.name : "Tiếng Việt"; // Mặc định là Tiếng Việt nếu không tìm thấy
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function navigateTo(link: string) {
    navigate(link);
  }

  const logout = () => {
    handleLogout();
    navigate("/");
  };

  const checkLogged = () => {
    const userSession = getUserFromSession();
    setUser(() => (userSession ? userSession : null));
  };

  const getCartQuantity = () => {
    if (user)
      getCarts().then((res) => {
        setCartQuantity(() => {
          return res?.data?.reduce((total: number, item: CartDetailType) => {
            return total + item.quantity;
          }, 0);
        });
      });
    else setCartQuantity(0);
  };

  const goToCartPage = () => {
    if (user) {
      navigateTo("/cart");
    } else {
      toast.showToast(t("cart_login_required"));    }
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng.code);
    localStorage.setItem("language", lng.code);
    setSelectedLanguage(lng.name);
    setIsDropdownOpen(false);
  };

  // Đồng bộ ngôn ngữ khi component mount
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
  }, [i18n, languages]);

  useEffect(() => {
    checkLogged();
  }, [url]);

  useEffect(() => {
    getCartQuantity();
  }, [user, url]);

  return (
      <div>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center justify-between h-14 gap-2">
              <div
                  className="h-full cursor-pointer"
                  onClick={() => navigateTo("/")}
              >
                <img className="h-full" src={logo} alt="" />
              </div>
              <div className="relative">
                <button
                    className="flex items-center gap-2 px-3 py-1 font-bold text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedLanguage}
                  <svg
                      className={`w-4 h-4 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
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
            </div>

            <SearchBar />

            <div className="flex items-center gap-x-6">
              <div className="flex flex-row font-bold justify-evenly gap-2">
                <div
                    onClick={() => navigateTo("/account")}
                    className="transition-all cursor-pointer hover:text-primary"
                >
                  {user?.username}
                </div>
                {user ? (
                    <div
                        onClick={logout}
                        className="transition-all cursor-pointer hover:text-primary"
                    >
                      {t("logout")}
                    </div>
                ) : (
                    <div
                        onClick={() => navigateTo("/user")}
                        className="transition-all cursor-pointer hover:text-primary"
                    >
                      {t("login")}
                    </div>
                )}
              </div>
              <div className="flex items-center gap-x-4">
                <div
                    onClick={() => goToCartPage()}
                    className="relative transition-all cursor-pointer hover:text-primary"
                >
                  <div
                      id="cart-quantity"
                      className="absolute grid place-items-center left-full top-0 rounded-full h-5 aspect-square bg-red-500 text-white text-[13px] -translate-x-1/2 -translate-y-1/2"
                  >
                    {cartQuantity}
                  </div>
                  <FaShoppingCart className="text-[30px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CategoryBar />
      </div>
  );
};

export default Header;