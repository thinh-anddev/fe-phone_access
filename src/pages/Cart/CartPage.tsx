import { useNavigate } from "react-router-dom";
import CartRow from "./Components/CartRow";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCarts, getTotalPrice } from "./api";
import { CartDetailType } from "@/utils/models";
import { getUserFromSession } from "@/utils/User";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { formatPrice } from "@/utils";

interface CartPageContextProps {
  calTotal: () => void;
  setTotal: Dispatch<SetStateAction<number>>;
}

export const CartPageContext = createContext<CartPageContextProps>({
  calTotal: () => { },
  setTotal: () => { },
});

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartDetailType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const toast = useContext(ToastContext);
  const [itemsSelected, setItemsSelected] = useState<CartDetailType[]>([]);
  const { showToast } = useContext(ToastContext);

  function navigateTo(link: string) {
    navigate(link);
  }
  const user = getUserFromSession();

  const handlePay = () => {
    if (itemsSelected.length <= 0) {
      showToast("Vui lòng chọn ít nhất 1 sản phẩm");
      return;
    }
    console.log(itemsSelected);

    localStorage.removeItem("cartCheckout"); // clear items before checkout
    localStorage.setItem("cartCheckout", JSON.stringify(itemsSelected)); // stringify list item and save to local storage

    navigateTo("/payment");
  };

  useEffect(() => {
    if (user) {
      getCarts().then((res) => {
        console.log("=============", res);
        setCart(res.data);
        setItemsSelected(res.data);
      });
    } else {
      toast.showToast("Vui lòng đăng nhập để xem giỏ hàng");
    }
  }, []);
  const calTotal = async () => {
    const data = itemsSelected.map((item) => {
      return { id: item.id };
    });
    console.log(data);
    const res = await getTotalPrice(data);
    if (res.success) {
      setTotal(() => res.data.data);
    } else {
      showToast(res.message);
    }
  };
  useEffect(() => {
    calTotal();
  }, [itemsSelected]);

  const value = {
    calTotal,
    setTotal,
  };

  return (
      <CartPageContext.Provider value={value}>
        <div>
          <section className="mx-auto mt-10 overflow-auto max-w-7xl">
            <table className="w-full table-fixed min-w-[1200px]">
              <thead>
              <tr className="border-2 border-solid ">
                <th className="py-2 w-[50px]"></th>
                <th className="py-2 font-extrabold ">Sản phẩm</th>
                <th className="py-2 font-extrabold">Mô tả</th>
                <th className="py-2 font-extrabold">Phân loại</th>

                <th className="py-2 font-extrabold">Giá</th>
                <th className="py-2 font-extrabold">Số lượng</th>
                <th className="py-2 font-extrabold">Tổng</th>
                <th className="py-2 font-extrabold"></th>
              </tr>
              </thead>
              <tbody>
              {cart.map((item) => {
                return (
                    <CartRow
                        cartDetail={item}
                        listItem={itemsSelected}
                        handleSelect={setItemsSelected}
                    />
                );
              })}
              </tbody>
            </table>
          </section>
          <section>
            <div className="flex justify-end mt-10 max-w-7xl">
              <div className="flex flex-col items-end gap-5">
                <div className="flex justify-between gap-20">
                  <div className="text-3xl font-extrabold text-primary ">
                    Tạm tính
                  </div>
                  <div className="text-3xl font-extrabold text-primary ">
                    {formatPrice(total)}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                      onClick={() => navigateTo("/")}
                      className="px-10 py-3 text-xl font-extrabold text-white duration-300 rounded-full bg-primary hover:bg-purple-500"
                  >
                    Tiếp tục mua hàng
                  </button>
                  <button
                      onClick={handlePay}
                      className="px-10 py-3 text-xl font-extrabold duration-300 border-2 border-solid rounded-full border-primary text-primary hover:bg-purple-500 hover:text-white"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center mx-auto mt-16 max-w-7xl gap-7">
            {/* <div className="text-3xl font-black">Các sản phẩm đã xem</div>
        <div className="grid gap-12 my-6 xl:grid-cols-5 md:grid-cols-2 sm:grid-cols-2 ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div> */}
          </section>
        </div>
      </CartPageContext.Provider>
  );
};
export default CartPage;
