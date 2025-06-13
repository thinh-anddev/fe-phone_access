import UpdateQuantity from "../../../components/Quantity/UpdateQuantity";
import { CartDetailType } from "@/utils/models";
import { formatPrice } from "@/utils";
import { useNavigate } from "react-router-dom";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { deleteCartDetail } from "../api";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { CartPageContext } from "../CartPage";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { useTranslation } from "react-i18next";

interface CartRowProps {
  cartDetail: CartDetailType;
  listItem: any[];
  handleSelect: Dispatch<SetStateAction<any[]>>;
}

const CartRow: React.FC<CartRowProps> = (props) => {
  const { cartDetail, handleSelect, listItem } = props;
  const [quantity, setQuantity] = useState<number>(cartDetail.quantity || 0);
  const toast = useContext(ToastContext);
  const navigate = useNavigate();
  const { setTotal } = useContext(CartPageContext);
  const [isChecked, setIsChecked] = useState(true);
  const { setCartQuantity } = useContext(LoginContext);
  const { t } = useTranslation();

  const handleDeleteRow = () => {
    deleteCartDetail(cartDetail.id).then(() => {
      toast.showToast(t('product_deleted_successfully'));
      window.location.reload();
    });
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsChecked(true);
      handleSelect(() => [...listItem, cartDetail]);
    } else {
      setIsChecked(false);
      const list = listItem.filter((item) => {
        return item.id !== cartDetail.id;
      });
      handleSelect(() => list);
    }
  };
  const handleUpdate = () => {
    const listTemp = listItem.filter((item: CartDetailType) => {
      return item.id != cartDetail.id;
    });
    cartDetail.quantity = quantity;
    for (let i = 0; i < listItem.length; i++) {
      if (listItem[i].id == cartDetail.id) {
        listItem[i].quantity = quantity;
      }
    }
    listTemp.push(cartDetail);
    setCartQuantity(() =>
      listTemp.reduce((total: number, item: CartDetailType) => {
        return total + item.quantity;
      }, 0)
    );
    const totalPriceThisItem = quantity * cartDetail.product.price;
    let total = 0;
    for (let i = 0; i < listTemp.length; i++) {
      if (listTemp[i].id != cartDetail.id) {
        total += listTemp[i].product.price * listTemp[i].quantity;
      }
    }

    if (isChecked) {
      total += totalPriceThisItem;
    }
    setTotal(total);
  };

  useEffect(() => {
    handleUpdate();
  }, [quantity]);

  return (
    <tr className="mt-4 border-2 border-solid">
      <td className="text-center">
        <input
          onChange={handleCheck}
          defaultChecked={isChecked}
          type="checkbox"
        />
      </td>
      <td className="py-4">
        <img
          onClick={() => navigate(`/product_detail/${cartDetail?.product?.id}`)}
          className="w-24 mx-auto rounded-md cursor-pointer"
          src={cartDetail?.product?.images?.[0]?.url}
          alt=""
        />
      </td>
      <td className="py-4 text-base text-center ">
        <div
          onClick={() => navigate(`/product_detail/${cartDetail?.product?.id}`)}
          className="cursor-pointer hover:text-primary"
        >
          {cartDetail?.product?.name}
        </div>
      </td>
      <td className="py-4 text-base font-bold text-center">
        <div>{cartDetail?.phoneCategory?.name || "Không có"}</div>
      </td>
      <td className="py-4 text-base font-bold text-center">
        <div>{formatPrice(cartDetail?.product?.price || 0)}</div>
      </td>
      <td className="py-4 text-base text-center ">
        <div className="mx-auto w-fit">
          <UpdateQuantity
            productQuantity={cartDetail?.product?.quantity || 0}
            quantity={quantity}
            setQuantity={setQuantity}
            cartDetailID={cartDetail.id}
          />
        </div>
      </td>
      <td className="py-4 text-base font-bold text-center">
        <div className="total">
          {formatPrice(quantity * (cartDetail?.product?.price || 0))}
        </div>
      </td>
      <td className="py-4 text-xl font-black text-center cursor-pointer">
        <div onClick={() => handleDeleteRow()} className="hover:text-primary">
          Xóa
        </div>
      </td>
    </tr>
  );
};
export default CartRow;
