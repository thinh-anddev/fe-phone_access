import { useContext, useEffect, useState } from "react";
import UpdateQuantity from "../../../components/Quantity/UpdateQuantity";
import { CartDetailType, ProductType } from "@/utils/models";
import { formatPrice } from "@/utils";
import { getCartsByCustomerId, insertNewCartDetail } from "@/pages/Cart/api";
import { getUserFromSession } from "@/utils/User";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";

interface ProductProps {
  product: ProductType;
}
const InfoProduct: React.FC<ProductProps> = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const toast = useContext(ToastContext);
  const [carts, setCarts] = useState<CartDetailType[]>([]);
  const [phoneCatIdeSelected, setPhoneCateIdSelected] = useState<number>(0);
  const user = getUserFromSession();

  useEffect(() => {
    if (user) {
      getCartsByCustomerId(user.id).then((res) => {
        setCarts(res.data);
      });
    } else {
      toast.showToast("Vui lòng đăng nhập để xem giỏ hàng");
    }
  }, []);

  // add products to cart
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = async (cartDetail: any) => {
    if (phoneCatIdeSelected == 0 && product.productPhoneCategories.length > 0) {
      toast.showToast("Vui lòng chọn phân loại sản phẩm");
      return;
    }

    const response = await insertNewCartDetail(cartDetail);
    response.success && toast.showToast("Thêm vào giỏ hàng thành công");
    response.success && setCarts([...carts, response.data]);
    !response.success && toast.showToast("Thêm vào giỏ hàng thất bại");
  };

  const handleAddToCart = () => {
    if (user) {
      const cartQuantity = document.querySelector("#cart-quantity")?.innerHTML;
      document.querySelector("#cart-quantity")!.innerHTML = (
        Number.parseInt(cartQuantity || "0") + quantity
      ).toString();
      const cartDetail = {
        productId: product?.id,
        phoneCategoryId: phoneCatIdeSelected,
        customerId: user.id,
        quantity: quantity,
      };
      addToCart(cartDetail);
    } else {
      toast.showToast("Vui lòng đăng nhập để thêm vào giỏ hàng");
    }
  };
  const handleSelectPhoneCategory = (phoneCateId: number) => {
    setPhoneCateIdSelected(phoneCateId);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 max-w-[50%]">
        <img src={product.images && product.images[0].url} alt="" />
        <div className="flex justify-center max-w-full mt-4 overflow-auto gap-x-4">
          {product.images?.map((image, index) => {
            return (
              <div className="h-[105px] aspect-square" key={index}>
                <img
                  className="object-cover w-full h-full"
                  src={image.url}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-y-8">
        <div>
          <p className="text-[25px] font-extrabold">{product.name}</p>
        </div>
        <p className="text-[25px] font-extrabold">
          {formatPrice(product.price)}
        </p>
        <div className="flex gap-x-4">
          <p className="text-lg">Phân loại</p>
          <div className="grid grid-cols-5 gap-2">
            {product.productPhoneCategories &&
              product.productPhoneCategories.map((phCate) => {
                return (
                  <p
                    onClick={() =>
                      handleSelectPhoneCategory(phCate.phoneCategory.id)
                    }
                    key={phCate.phoneCategory.id}
                    className={`${
                      phoneCatIdeSelected === phCate.phoneCategory.id
                        ? "bg-primary"
                        : ""
                    } px-4 py-1 text-center text-black border rounded cursor-pointer text-md opacity-80 hover:bg-primary text-nowrap border-stroke`}
                  >
                    {phCate.phoneCategory.name}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <p className="text-lg">Số lượng</p>
          <UpdateQuantity
            productQuantity={product.quantity}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
        <div className="flex items-center opacity-80 gap-x-4">
          <p className="">Còn lại</p>
          <p>{product?.quantity}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleAddToCart()}
            className="flex-1 py-3 rounded bg-primary hover:brightness-110"
          >
            Thêm vào giỏ hàng
          </button>
          <button className="flex-1 py-3 rounded bg-primary hover:brightness-110">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
