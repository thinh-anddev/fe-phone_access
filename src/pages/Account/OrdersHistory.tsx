import { cancel, getByCustomer } from "@/api/Order";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { formatPrice } from "@/utils";
import { PaymentStatus, ShippingStatus } from "@/utils/enum";
import { OrderType } from "@/utils/models";
import { useContext, useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const OrdersHistory = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [popup, setPopup] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [currentOrderId, setCurrentOrderId] = useState<number>();
  const toast = useContext(ToastContext);

  const { user } = useContext(LoginContext);

  const handleOpenDetail = (i: number) => {
    setOrderIndex(i);
    setOpenDetail(!openDetail);
  };
  // const checkLogged = () => {
  //   const userSession = getUserFromSession();
  //   setUser(() => (userSession ? userSession : null));
  // };
  const getOrders = async () => {
    const response = await getByCustomer(user.id);
    response.success && setOrders(response.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const handleClickCancel = async (id: number, index: number) => {
    if (orders[index].status === ShippingStatus.CANCELLED)
      return toast.showToast("Đơn hàng đã được huỷ");
    if (orders[index].status === ShippingStatus.SUCCESS)
      return toast.showToast("Đơn hàng đã được giao thành công");
    if (orders[index].status === ShippingStatus.FAIL)
      return toast.showToast("Đơn hàng đã thất bại");
    if (orders[index].status === ShippingStatus.RETURNED)
      return toast.showToast("Đơn hàng đã được trả lại");
    if (orders[index].status === ShippingStatus.DELIVERY)
      return toast.showToast("Đơn hàng đang giao hàng, không thể huỷ");
    if (orders[index].status === ShippingStatus.DELAYED)
      return toast.showToast("Đơn hàng đang chờ giao lại, không thể huỷ");
    if (orders[index].status === ShippingStatus.CONFIRMED)
      return toast.showToast("Đơn hàng đã được xác nhận, không thể huỷ");
    setPopup(true);
    setCurrentOrderId(id);
  };
  const handleCancel = async (id: number) => {
    setPopup(false);
    const response = await cancel(id);
    response.success && getOrders();
  };

  return (
    <div className="flex flex-col gap-2">
      {popup && (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full overflow-hidden bg-stroke bg-opacity-60">
          <div
            className={`bg-tertiary items-center w-[500px] relative z-[1] bg-white h-fit p-5 py-12 rounded  flex-col gap-3 ${
              popup ? "flex-col flex" : "hidden"
            }`}
          >
            <div className="font-bold text-[28px]">
              Bạn chắc chắn muốn huỷ đơn này?
            </div>
            <div className="flex gap-8 pt-5 text-[18px]">
              <div
                className="cursor-pointer hover:text-primary"
                onClick={() => setPopup(false)}
              >
                Không
              </div>
              <div
                className="cursor-pointer hover:text-primary"
                onClick={() => {
                  handleCancel(currentOrderId || 1);
                }}
              >
                Đồng ý huỷ
              </div>
            </div>
          </div>
        </div>
      )}
      {openDetail && (
        <div
          id={`detail-${orderIndex}`}
          className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full overflow-hidden bg-stroke bg-opacity-60"
        >
          <div
            id="form"
            className={`bg-tertiary w-[750px] relative z-[1] bg-white h-fit p-5 pt-0 rounded  flex-col gap-3 ${
              openDetail ? "flex-col flex" : "hidden"
            }`}
          >
            <div className="flex flex-col ">
              <div
                className="text-[40px] text-right cursor-pointer hover:text-primary"
                onClick={() => setOpenDetail(false)}
              >
                x
              </div>
              <div className="flex flex-row gap-2">
                <div> {orders[orderIndex].customer.username}</div>
                <div> {orders[orderIndex].customer.phone}</div>
              </div>
              <div>{orders[orderIndex].address}</div>
              <div>Thanh toán khi nhận hàng</div>
              <div>Ghi chú: {orders[orderIndex].note}</div>
            </div>
            <div className="flex flex-col gap-2 py-4">
              <div className="grid grid-cols-10 py-1 text-center text-white bg-gray-700 rounded-sm">
                <div className="col-span-5">Sản phẩm</div>
                <div className="col-span-1">Số lượng</div>
                <div className="col-span-2">Đơn giá</div>
                <div className="col-span-2">Thành tiền</div>
              </div>
              {orders[orderIndex].orderDetails.map((orderDetail) => {
                console.log(orderDetail);

                return (
                  <div
                    key={orderDetail.id}
                    className="grid grid-cols-10 text-center"
                  >
                    <div className="col-span-5">
                      {orderDetail.product.name +
                        ", " +
                        orderDetail.phoneCategory.name}
                    </div>
                    <div className="col-span-1 ">{orderDetail.quantity}</div>
                    <div className="col-span-2">
                      {formatPrice(orderDetail.product.price)}
                    </div>
                    <div className="col-span-2 ">
                      {formatPrice(
                        orderDetail.product.price * orderDetail.quantity
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col items-end gap-1 p-3">
                <div>
                  <strong>TỔNG TIỀN:</strong>{" "}
                  {formatPrice(
                    orders[orderIndex].orderDetails.reduce(
                      (acc, cur) => acc + cur.product.price * cur.quantity,
                      0
                    )
                  )}
                </div>
                <div>
                  <strong>PHÍ VẬN CHUYỂN:</strong>
                  {" + "}
                  {formatPrice(
                    orders[orderIndex].orderDetails.reduce(
                      (acc, cur) => acc + cur.product.price * cur.quantity,
                      0
                    ) - orders[orderIndex].total
                  )}
                </div>
                <div>
                  <strong>KHUYẾN MẠI:</strong>
                  {" - "}
                  {formatPrice(orders[orderIndex].discount)}
                </div>
                <div>
                  <strong>TỔNG CỘNG:</strong>{" "}
                  {formatPrice(
                    2 *
                      orders[orderIndex].orderDetails.reduce(
                        (acc, cur) => acc + cur.product.price * cur.quantity,
                        0
                      ) -
                      orders[orderIndex].total
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-[25px]  p-5">Lịch sử đặt hàng</div>

      <div className="flex flex-col gap-2 divide-y-2 divide-black">
        <div className="grid grid-cols-6 font-bold place-items-center ">
          <div>Mã đơn hàng</div>
          <div>Ngày</div>
          <div>Tổng đơn</div>
          <div>Thanh toán</div>
          <div>Trạng thái</div>
          <div></div>
        </div>
        {orders.map((order, index) => {
          return (
            <div className="flex flex-col divide-y divide-black">
              <div className="flex flex-col">
                <div className="grid grid-cols-6 py-3 place-items-center">
                  <div className="font-bold text-primary">{order.id}</div>
                  <div>{order.createDate.slice(0, 10)}</div>
                  <div>{formatPrice(order.total)}</div>
                  {order.paymentStatus === PaymentStatus.PAID ? (
                    <div>Đã thanh toán</div>
                  ) : (
                    <div>Chưa thanh toán</div>
                  )}
                  {order.status === ShippingStatus.CANCELLED && (
                    <div>Đã huỷ</div>
                  )}
                  {order.status === ShippingStatus.CONFIRMED && (
                    <div>Đã xác nhận</div>
                  )}
                  {order.status === ShippingStatus.DELAYED && (
                    <div>Hoãn, chờ giao lại</div>
                  )}
                  {order.status === ShippingStatus.DELIVERY && (
                    <div>Đang giao hàng</div>
                  )}
                  {order.status === ShippingStatus.FAIL && <div>Thất bại</div>}
                  {order.status === ShippingStatus.PENDING && (
                    <div>Chờ xác nhận</div>
                  )}
                  {order.status === ShippingStatus.PROCESSING && (
                    <div>Đang xử lý</div>
                  )}
                  {order.status === ShippingStatus.RETURNED && (
                    <div>Đã trả hàng</div>
                  )}
                  {order.status === ShippingStatus.SUCCESS && (
                    <div>Thành công</div>
                  )}
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`detail-${orderIndex}`}
                      onClick={() => handleOpenDetail(index)}
                      className={
                        "flex items-center gap-2 cursor-pointer hover:text-primary" +
                        (openDetail ? " text-primary" : "")
                      }
                    >
                      <div className="text-nowrap"> Chi tiết</div>
                      <FaInfoCircle className="text-2xl " />
                    </label>
                    <div
                      onClick={() => handleClickCancel(order.id, index)}
                      className="grid h-full px-2 py-1 bg-gray-400 rounded cursor-pointer hover:bg-red-500 text-nowrap place-items-center"
                    >
                      Huỷ đơn
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrdersHistory;
