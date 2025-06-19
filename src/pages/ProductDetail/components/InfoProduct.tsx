import { useContext, useEffect, useState } from "react";
import UpdateQuantity from "../../../components/Quantity/UpdateQuantity";
import { CartDetailType, ProductType } from "@/utils/models";
import { formatPrice } from "@/utils";
import { getCarts, insertNewCartDetail } from "@/pages/Cart/api";
import { getUserFromSession } from "@/utils/User";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import Comments from "./Comments";
import { useTranslation } from "react-i18next";

interface ProductProps {
  product: ProductType;
}

const InfoProduct: React.FC<ProductProps> = ({ product }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const toast = useContext(ToastContext);
  const [carts, setCarts] = useState<CartDetailType[]>([]);
  const [phoneCatIdeSelected, setPhoneCateIdSelected] = useState<number>(0);
  const user = getUserFromSession();

  useEffect(() => {
    if (user) {
      getCarts().then((res) => setCarts(res.data));
    } else {
      toast.showToast(t("please_login_to_view_cart"));
    }
  }, []);

  const addToCart = async (cartDetail: any) => {
    if (phoneCatIdeSelected === 0 && product.productPhoneCategories.length > 0) {
      toast.showToast(t("please_select_product_variant"));
      return;
    }

    const response = await insertNewCartDetail(cartDetail);
    if (response.success) {
      toast.showToast(t("add_to_cart_success"));
      setCarts([...carts, response.data]);
    } else {
      toast.showToast(t("add_to_cart_failed"));
    }
  };

  const handleAddToCart = () => {
    if (user) {
      const cartQuantity = document.querySelector("#cart-quantity")?.innerHTML;
      document.querySelector("#cart-quantity")!.innerHTML = (
        Number.parseInt(cartQuantity || "0") + quantity
      ).toString();
      const cartDetail = {
        productId: product.id,
        phoneCategoryId: phoneCatIdeSelected,
        customerId: user.id,
        quantity: quantity,
      };
      addToCart(cartDetail);
    } else {
      toast.showToast(t("please_login_to_add_to_cart"));
    }
  };

  const handleSelectPhoneCategory = (phoneCateId: number) => {
    setPhoneCateIdSelected(phoneCateId);
  };

  const uniquePhoneCategories = Array.from(
    new Map(
      product.productPhoneCategories?.map((phCate) => [
        phCate.phoneCategory.id,
        phCate,
      ])
    ).values()
  );

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 max-w-[50%]">
        <div className="relative">
          <img
            src={product.images && product.images[currentImageIndex].url}
            alt=""
            className="w-full h-auto"
          />
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition"
          >
            &lt;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition"
          >
            &gt;
          </button>
        </div>
        <div className="flex justify-center max-w-full mt-4 overflow-auto gap-x-4">
          {product.images?.map((image, index) => (
            <div
              className={`h-[105px] aspect-square cursor-pointer border-2 ${currentImageIndex === index ? "border-purple-500" : "border-transparent"
                } hover:border-purple-300 transition`}
              key={index}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                className="object-cover w-full h-full"
                src={image.url}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-y-8">
        <p className="text-[25px] font-extrabold">{product.name}</p>
        <p className="text-[25px] font-extrabold text-purple-600">
          {formatPrice(product.price)}
        </p>
        <div className="flex gap-x-4">
          <p className="text-lg font-medium">{t("category")}</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {uniquePhoneCategories.map((phCate) => (
              <p
                onClick={() => handleSelectPhoneCategory(phCate.phoneCategory.id)}
                key={phCate.phoneCategory.id}
                className={`max-w-[150px] px-2 py-1 text-center border rounded cursor-pointer text-md opacity-80 hover:bg-purple-100 transition ${phoneCatIdeSelected === phCate.phoneCategory.id
                  ? "bg-purple-200 border-purple-500"
                  : "border-gray-300"
                  } truncate`}
              >
                {phCate.phoneCategory.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="text-lg font-medium">{t("quantity")}</p>
          <UpdateQuantity
            productQuantity={product.quantity}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
        <div className="flex items-center gap-x-4 text-gray-600">
          <p className="font-medium">{t("in_stock")}</p>
          <p>{product.quantity}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 rounded bg-purple-300 hover:bg-purple-400 text-white font-medium transition"
          >
            {t("add_to_cart")}
          </button>
          {/*<button className="flex-1 py-3 rounded bg-purple-500 hover:bg-purple-600 text-white font-medium transition">*/}
          {/*  {t("buy_now")}*/}
          {/*</button>*/}
        </div>
        <Comments productId={product.id} />
      </div>
    </div>
  );
};

export default InfoProduct;
