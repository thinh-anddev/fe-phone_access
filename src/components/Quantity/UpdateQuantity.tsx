import { useContext } from "react";
import { ToastContext } from "../../hooks/ToastMessage/ToastContext";
import { updateCarts } from "@/pages/Cart/api";
import { useTranslation } from "react-i18next";

interface UpdateQuantityProps {
  productQuantity: number;
  quantity: number;
  setQuantity: (quatity: number) => void;
  cartDetailID?: number;
}

const UpdateQuantity: React.FC<UpdateQuantityProps> = ({
  quantity,
  productQuantity,
  setQuantity,
  cartDetailID,
}) => {
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  const increaseQuantity = async () => {
    if (quantity >= productQuantity)
      return showToast(t("not_enough_stock"));
    setQuantity(quantity + 1);

    if (cartDetailID) {
      await updateCarts(cartDetailID, quantity + 1);
    }
  };

  const decreaseQuantity = async () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
      cartDetailID && (await updateCarts(cartDetailID, quantity - 1));
    } else showToast(t('quantity_must_be_positive'));
  };

  return (
    <div className="flex border rounded border-line w-fit">
      <p
        onClick={() => decreaseQuantity()}
        className="grid h-10 border-r cursor-pointer select-none hover:bg-gray-200 aspect-square place-items-center border-line"
      >
        -
      </p>
      <input
        disabled
        className="w-16 text-center focus:outline-none"
        value={quantity}
      />
      <p
        onClick={() => increaseQuantity()}
        className="grid h-10 border-l cursor-pointer select-none hover:bg-gray-200 aspect-square place-items-center border-line"
      >
        +
      </p>
    </div>
  );
};

export default UpdateQuantity;
