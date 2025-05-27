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
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State để quản lý hình ảnh hiện tại
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

  // Thêm đoạn code xử lý trùng lặp ở đây
  const uniquePhoneCategories = Array.from(
      new Map(
          product.productPhoneCategories?.map((phCate) => [
            phCate.phoneCategory.id,
            phCate,
          ])
      ).values()
  );

  // Chuyển đến hình ảnh trước
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Chuyển đến hình ảnh tiếp theo
  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
      <div className="flex gap-4">
        <div className="flex-1 max-w-[50%]">
          {/* Hình ảnh lớn với nút điều hướng */}
          <div className="relative">
            <img
                src={product.images && product.images[currentImageIndex].url}
                alt=""
                className="w-full h-auto"
            />
            <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &lt;
            </button>
            <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
          <div className="flex justify-center max-w-full mt-4 overflow-auto gap-x-4">
            {product.images?.map((image, index) => (
                <div
                    className="h-[105px] aspect-square cursor-pointer border-2 border-transparent hover:border-purple-300"
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
          <div>
            <p className="text-[25px] font-extrabold">{product.name}</p>
          </div>
          <p className="text-[25px] font-extrabold">
            {formatPrice(product.price)}
          </p>
          <div className="flex gap-x-4">
            <p className="text-lg">Phân loại</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {uniquePhoneCategories &&
                  uniquePhoneCategories.map((phCate) => (
                      <p
                          onClick={() =>
                              handleSelectPhoneCategory(phCate.phoneCategory.id)
                          }
                          key={phCate.phoneCategory.id}
                          className={`${
                              phoneCatIdeSelected === phCate.phoneCategory.id
                                  ? "bg-primary"
                                  : ""
                          } pw-full max-w-[150px] px-2 py-1 text-center text-black border rounded cursor-pointer text-md opacity-80 hover:bg-primary border-stroke truncate overflow-hidden text-ellipsis whitespace-nowrap`}
                      >
                        {phCate.phoneCategory.name}
                      </p>
                  ))}
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
                className="flex-1 py-3 rounded bg-purple-300 hover:brightness-110"
            >
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 py-3 rounded bg-purple-300 hover:brightness-110">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
  );
};

export default InfoProduct;