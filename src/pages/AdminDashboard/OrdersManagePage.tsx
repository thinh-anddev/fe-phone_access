/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPen,  } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { OrderType } from "@/utils/models";
import { getAllOrders, update } from "@/api/Order";
import { IoMdClose } from "react-icons/io";
import { formatPrice } from "@/utils";
import { FaHome } from "react-icons/fa";
import ShippingStatusComp from "./components/ShippingStatus";
import PaymentStatusComp from "./components/PaymentStatus";
import { ShippingLabel, ShippingStatus } from "@/utils/enum";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { useTranslation } from "react-i18next"

interface PopupViewDetailProps {
  order: OrderType | undefined;
  hide: () => void;
  onUpdateSuccess: () => void;
}

const PopupViewDetail: React.FC<PopupViewDetailProps> = ({ order, hide, onUpdateSuccess }) => {
  const [orderStatus, setOrderStatus] = useState(order?.status);
  const toast = useContext(ToastContext);
  const { t } = useTranslation();

  const change = async (orderId: number, s: number) => {
    if (s === ShippingStatus.CANCELLED)
      return toast.showToast(t("order_cancelled"));
    if (s === ShippingStatus.SUCCESS)
      return toast.showToast(t("order_delivered"));
    if (s === ShippingStatus.FAIL)
      return toast.showToast(t("order_failed"));
    if (s === ShippingStatus.RETURNED)
      return toast.showToast(t("order_returned"));
    if (s === ShippingStatus.DELIVERY)
      return toast.showToast(t("order_shipping"));
    if (s === ShippingStatus.DELAYED)
      return toast.showToast(t("order_delayed"));

    const response = await update(orderId, s);
    if (response.success) {
      toast.showToast(t("update_success"));
      onUpdateSuccess();
      hide();
    } else {
      toast.showToast(t("update_failed"));
    }
  };

  const saveChangeOrder = (order: OrderType) => {
    change(order.id, orderStatus || 0);
  };

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{t("order_code")}: #{order.id}</h2>
              <PaymentStatusComp status={order.paymentStatus} />
            </div>
            <p className="text-gray-600">{t("order_date")}: {order.createDate}</p>
          </div>
          <IoMdClose
            className="text-3xl cursor-pointer hover:text-primary transition"
            onClick={hide}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{t("recipient_info")}</h3>
            <p>#{order.customer.id} - {order.customer.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <FaHome className="text-primary" />
              <p>{order.address}</p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{t("note")}</h3>
            <p className="text-gray-600">{order.note || "Không có ghi chú"}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{t("total_amount")}</h3>
            <div className="flex justify-between">
              <span>{t("provisional")}:</span>
              <span>{formatPrice((order.total || 0) + (order.discount || 0))}</span>
            </div>
            <div className="flex justify-between text-orange-500">
              <span>{t("discount")}:</span>
              <span>-{formatPrice(order.discount || 0)}</span>
            </div>
            <div className="flex justify-between font-bold text-red-500">
              <span>{t("total_amount")}:</span>
              <span>{formatPrice(order.total || 0)}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">{t("shipping_status")}</h3>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(parseInt(e.target.value))}
            className="p-2 border border-gray-300 rounded-md w-full sm:w-64 focus:ring-2 focus:ring-primary"
            disabled={[ShippingStatus.CANCELLED, ShippingStatus.SUCCESS, ShippingStatus.FAIL, ShippingStatus.RETURNED, ShippingStatus.DELIVERY, ShippingStatus.DELAYED].includes(orderStatus || 0)}
          >
            <option value={ShippingStatus.PENDING}>{ShippingLabel.PENDING}</option>
            <option value={ShippingStatus.PROCESSING}>{ShippingLabel.PROCESSING}</option>
            <option value={ShippingStatus.CONFIRMED}>{ShippingLabel.CONFIRMED}</option>
            <option value={ShippingStatus.RETURNED}>{ShippingLabel.RETURNED}</option>
            <option value={ShippingStatus.CANCELLED}>{ShippingLabel.CANCELLED}</option>
            <option value={ShippingStatus.DELAYED}>{ShippingLabel.DELAYED}</option>
            <option value={ShippingStatus.DELIVERY}>{ShippingLabel.DELIVERY}</option>
            <option value={ShippingStatus.FAIL}>{ShippingLabel.FAIL}</option>
            <option value={ShippingStatus.SUCCESS}>{ShippingLabel.SUCCESS}</option>
          </select>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
          <h3 className="font-semibold mb-2">{t("products")}</h3>
          {order.orderDetails?.map((detail) => (
            <div key={detail.id} className="flex items-center gap-4 mb-3">
              <img
                className="w-20 h-20 rounded-md object-cover"
                src={detail.product.images[0].url}
                alt={detail.product.name}
              />
              <div className="flex-1">
                <p className="font-semibold">{detail.product.name}</p>
                <p className="text-gray-600">{detail.phoneCategory?.name || ""}</p>
              </div>
              <p>{t("quantity")}: {detail.quantity}</p>
              <p className="font-semibold">{formatPrice(detail.price)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={hide}
            className="px-5 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => saveChangeOrder(order)}
            className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            {t("update")}
          </button>
        </div>
      </div>
    </div>
  );
};

const OrdersManagePage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [orderEditing, setOrderEditing] = useState<OrderType>();
  const [viewDetail, setViewDetail] = useState(false);
  const toast = useContext(ToastContext);
  const { t } = useTranslation();

  const fetchOrders = async () => {
    const response = await getAllOrders();
    if (response.success) {
      setOrders(response.orders);
    } else {
      toast.showToast(t("fetch_orders_failed"));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetail = (order: OrderType) => {
    setViewDetail(true);
    setOrderEditing(order);
  };

  const handleUpdateSuccess = () => {
    fetchOrders();
  };

  return (
    <div className="flex flex-col w-full gap-4 p-4 bg-white rounded-lg shadow-sm">
      {viewDetail && (
        <PopupViewDetail
          order={orderEditing}
          hide={() => setViewDetail(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("manage_orders")}</h1>

      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-12 gap-4 bg-gray-50 p-3 rounded-t-md font-semibold text-gray-700">
            <div className="col-span-1 flex items-center gap-2">{t("order_code_short")}</div>
            <div className="col-span-2">{t("customer")}</div>
            <div className="col-span-2">{t("total")}</div>
            <div className="col-span-1">{t("order_date")}</div>
            <div className="col-span-2 text-center">{t("payment")}</div>
            <div className="col-span-2 text-center">{t("status")}</div>
            <div className="col-span-2 text-center">{t("action")}</div>
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-12 gap-4 p-3 border-b border-gray-200 hover:bg-gray-100 transition"
            >
              <div className="col-span-1 flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                #{order.id}
              </div>
              <div className="col-span-2">
                #{order.customer.id} - {order.customer.username}
                <p className="text-sm text-gray-500">SL: {order.orderDetails.length}</p>
              </div>
              <div className="col-span-2">{formatPrice(order.total)}</div>
              <div className="col-span-1">{order.createDate.slice(0, 10)}</div>
              <div className="col-span-2 flex justify-center">
                <PaymentStatusComp status={order.paymentStatus} />
              </div>
              <div className="col-span-2 flex justify-center">
                <ShippingStatusComp status={order.status} />
              </div>
              <div className="col-span-2 flex justify-center gap-3 text-lg">
                <FaPen
                  onClick={() => handleViewDetail(order)}
                  className="cursor-pointer hover:text-primary transition"
                  title={t("view_edit")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersManagePage;