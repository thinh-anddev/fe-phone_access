/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
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

interface PopupViewDetailProps {
  order: OrderType | undefined;
  hide: () => void;
}

const PopupViewDetail: React.FC<PopupViewDetailProps> = ({ order, hide }) => {
  const [orderStatus, setOrderStatus] = useState(order?.status);
<<<<<<< master
  const toast = useContext(ToastContext);
  const change = async (orderId: number, s: number) => {
    if (s === ShippingStatus.CANCELLED)
      return toast.showToast("Đơn hàng đã được huỷ");
    if (s === ShippingStatus.SUCCESS)
      return toast.showToast("Đơn hàng đã được giao thành công");
    if (s === ShippingStatus.FAIL)
      return toast.showToast("Đơn hàng đã thất bại");
    if (s === ShippingStatus.RETURNED)
      return toast.showToast("Đơn hàng đã được trả lại");
    if (s === ShippingStatus.DELIVERY)
      return toast.showToast("Đơn hàng đang giao hàng, không thể huỷ");
    if (s === ShippingStatus.DELAYED)
      return toast.showToast("Đơn hàng đang chờ giao lại, không thể huỷ");

    const response = await update(orderId, s);
    if (response.success) {
      hide();
      toast.showToast("Cập nhật thành công");
    }
  };
  const saveChangeOrder = (order: OrderType) => {
    change(order.id, orderStatus || 0);
=======

  const saveChangeOrder = (order: OrderType) => {
    console.log(order);
>>>>>>> gbao
  };

  return (
    <div className="fixed top-0 left-0 grid w-full h-full duration-500 bg-black place-items-center bg-opacity-60">
      <div className="bg-gray-50 p-3 rounded max-w-[1024px] flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex flex-col w-1/3 gap-1">
            <div className="flex items-center gap-3">
              <div className="flex gap-2 w-fit">
                <div>Mã đơn hàng:</div> <div>#{order?.id}</div>
              </div>
              <PaymentStatusComp status={order?.paymentStatus} />
            </div>
            <div>Ngày đặt: {order?.createDate}</div>
          </div>
          <IoMdClose
            className="text-stroke text-[35px] cursor-pointer hover:text-primary"
            onClick={hide}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 p-2 bg-white rounded shadow-lg">
            <strong>Thông tin người nhận</strong>
            <div>#{order?.customer.id + " - " + order?.customer.username}</div>
            <div className="flex gap-2">
              <FaHome className="text-primary" />
              <div> {order?.address}</div>{" "}
            </div>
          </div>
          <div className="flex flex-col gap-1 p-2 max-w-[300px] bg-white rounded shadow-lg">
            <strong>Ghi chú</strong>
            <div>{order?.note}</div>
          </div>
          <div className="flex flex-col gap-1 p-2 min-w-[250px] bg-white rounded shadow-lg">
            <strong>Tổng tiền</strong>
            <div className="flex justify-between">
              <div>Tạm tính:</div>
              <div>
                {formatPrice((order?.total || 0) + (order?.discount || 0))}
              </div>
            </div>
            <div className="flex justify-between">
              <div>Giảm giá:</div>
              <div className="text-orange-400">
                -{formatPrice(order?.discount || 0)}
              </div>
            </div>
            <div className="flex justify-between">
              <strong>Tổng tiền:</strong>
              <strong className="text-red-500">
                {formatPrice(order?.total || 0)}
              </strong>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <strong>Thông tin vận chuyển</strong>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(parseInt(e.target.value))}
          >
            <option value={ShippingStatus.PENDING}>
              {ShippingLabel.PENDING}
            </option>
            <option value={ShippingStatus.PROCESSING}>
              {ShippingLabel.PROCESSING}
            </option>
            <option value={ShippingStatus.CONFIRMED}>
              {ShippingLabel.CONFIRMED}
            </option>
            <option value={ShippingStatus.RETURNED}>
              {ShippingLabel.RETURNED}
            </option>
            <option value={ShippingStatus.CANCELLED}>
              {ShippingLabel.CANCELLED}
            </option>
            <option value={ShippingStatus.DELAYED}>
              {ShippingLabel.DELAYED}
            </option>
            <option value={ShippingStatus.DELIVERY}>
              {ShippingLabel.DELIVERY}
            </option>
            <option value={ShippingStatus.FAIL}>{ShippingLabel.FAIL}</option>
            <option value={ShippingStatus.SUCCESS}>
              {ShippingLabel.SUCCESS}
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-2 p-2 bg-white rounded shadow-lg">
          <strong>Sản phẩm</strong>
          {order?.orderDetails?.map((detail) => {
            return (
              <div key={detail.id} className="flex gap-10">
                <img
                  className="w-[92px] rounded h-[92px]"
                  src={detail.product.images[0].url}
                  alt=""
                />
                <div className="flex flex-col max-w-[250px]">
                  <strong>{detail.product.name}</strong>
                  <div>{detail.phoneCategory?.name || ""}</div>
                </div>
                <div>SL: {detail.quantity}</div>
                <div>{formatPrice(detail.price)}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={hide}
            className="px-5 py-2 bg-white rounded-2xl hover:bg-gray-200"
          >
            Huỷ
          </button>
          <button
            onClick={() => order && saveChangeOrder(order)}
            className="px-5 py-2 bg-primary rounded-2xl bg-opacity-90 hover:bg-opacity-100"
          >
            Cập nhật
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
  useEffect(() => {
    // call api to get all orders
    getAllOrders().then((response) => {
      response.success && setOrders(response.orders);
    });
  }, []);
<<<<<<< master

=======
>>>>>>> gbao
  const handleViewDetail = (order: OrderType) => {
    setViewDetail(true);
    setOrderEditing(order);
  };

  return (
    <div className="flex flex-col w-full gap-2 p-1 rounded shadow-sm">
      {viewDetail && (
        <PopupViewDetail
          order={orderEditing}
          hide={() => setViewDetail(false)}
        />
      )}
      <div className="text-[25px]">{"Quản lý đơn hàng"}</div>
      <div className="flex items-center justify-end gap-2">
        <input
          type="search"
          className="px-4 py-2 mx-2 text-base border border-black rounded outline-none h-fit opacity-80"
          placeholder="Tìm kiếm..."
        />
        <button className="focus:outline-none text-white bg-primary hover:bg-purple-800  font-medium rounded-lg text-base px-4 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300">
          Thêm
        </button>
        <button className="focus:outline-none text-white bg-primary hover:bg-purple-800  font-medium rounded-lg text-base px-4 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300">
          Xoá
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-12 pb-2 border-b border-black text-nowrap text-stroke ">
          <div className="flex col-span-1 gap-2">
            <input type="checkbox" className="w-6 " />
            <div>Mã DH</div>
          </div>
          <div className="flex w-full col-span-2 line-clamp-1 ">
            <div className="w-4/5">Khách hàng</div>
            <div className="w-1/5">SL</div>
          </div>
          <div className="flex w-full col-span-1 gap-3">
            <div>Tổng tiền</div>
          </div>
          {/* <div className="w-full col-span-1"></div> */}
          <div className="w-full col-span-1">Ngày đặt</div>
          <div className="flex items-center w-full col-span-3 text-center">
            <div className="w-1/2 line-clamp-2">Địa chỉ</div>
            <div className="w-1/2 line-clamp-2">Ghi chú</div>
          </div>
          <div className="flex items-center w-full col-span-3 gap-4 text-center">
            <div className="w-1/2">Thanh toán</div>
            <div className="w-1/2">Giao hàng</div>
          </div>
          {/* <div className="w-full col-span-1"></div> */}
          <div className="col-span-1 "></div>
        </div>
        {orders.map((order) => {
          return (
            <div
              key={order.id}
              className="grid items-center grid-cols-12 pb-2 border-b border-stroke text-stroke"
            >
              <div className="flex col-span-1 gap-2">
                <input type="checkbox" className="w-6 " />
                <div className="">#{order.id}</div>
              </div>
              <div className="flex w-full col-span-2 line-clamp-1 ">
                <div className="w-4/5">
                  {"#" + order.customer.id + "-" + order.customer.username}
                </div>
                <div className="w-1/5">{order.orderDetails.length}</div>
              </div>
              <div className="flex w-full col-span-1 gap-3">
                <div>{formatPrice(order.total)}</div>
              </div>
              <div className="w-full col-span-1">
                {order.createDate.slice(0, 10)}
              </div>
              <div className="flex items-center w-full col-span-3 text-center">
                <div className="w-1/2">{order.address}</div>
                <div className="w-1/2 line-clamp-2">{order.note}</div>
              </div>
              <div className="flex w-full col-span-3 gap-4 mx-auto">
                {/* payment status */}
                <PaymentStatusComp status={order.paymentStatus} />
                {/* shipping status */}
                <ShippingStatusComp status={order.status} />
              </div>
              <div className="flex items-center col-span-1 gap-2 text-xl ">
                <FaPen
                  onClick={() => handleViewDetail(order)}
                  className="cursor-pointer hover:text-primary"
                />
                <RiDeleteBin5Line className="cursor-pointer hover:text-primary" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrdersManagePage;
