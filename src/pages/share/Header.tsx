import { useNavigate } from "react-router-dom";
import logo from "../../assets/image-common/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { getUserFromSession } from "@/utils/User";
import { useContext, useEffect } from "react";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { getCartsByCustomerId } from "../Cart/api";
import SearchBar from "./Search";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import CategoryBar from "./CategoryBar";
import { CartDetailType } from "@/utils/models";

const Header = () => {
  const { user, setUser, handleLogout, cartQuantity, setCartQuantity } =
    useContext(LoginContext);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const toast = useContext(ToastContext);
  const url = window.location.href;

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
      getCartsByCustomerId(user.id).then((res) => {
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
      toast.showToast("Vui lòng đăng nhập để xem giỏ hàng");
    }
  };

  useEffect(() => {
    checkLogged();
  }, [url]);
  useEffect(() => {
    getCartQuantity();
  }, [user, url]);

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-14 ">
          <div
            className="h-full cursor-pointer"
            onClick={() => navigateTo("/")}
          >
            <img className="h-full" src={logo} alt="" />
          </div>

          {/* <div className="flex overflow-hidden items-center w-[400px] h-9 border-2 border-primary rounded-lg">
            <div className="flex-1 px-1 py-1 overflow-hidden rounded-md">
              <input
                className="w-full px-2 focus:outline-none"
                type="search"
                placeholder="Tìm kiếm sản phẩm"
              />
            </div>
            <div className="bg-primary h-full aspect-[1.2] grid place-items-center text-[16px] text-white cursor-pointer hover:bg-purple-800 transition-all duration-700">
              <FaSearch />
            </div>
          </div> */}
          <SearchBar />

          <div className="flex items-center gap-x-10">
            <div className="flex flex-col font-bold justify-evenly">
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
                  Thoát
                </div>
              ) : (
                <div
                  onClick={() => navigateTo("/user")}
                  className="transition-all cursor-pointer hover:text-primary"
                >
                  Đăng nhập
                </div>
              )}
            </div>
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
              <FaShoppingCart className="text-[30px] " />
            </div>
          </div>
        </div>
      </div>
      <CategoryBar />
    </div>
  );
};
export default Header;
