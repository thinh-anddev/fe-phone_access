import { cancel, getByCustomer } from '@/api/Order';
import { LoginContext } from '@/hooks/LoginStatus/LoginContext';
import { ToastContext } from '@/hooks/ToastMessage/ToastContext';
import { formatPrice } from '@/utils';
import { PaymentStatus, ShippingStatus } from '@/utils/enum';
import { OrderType } from '@/utils/models';
import { useContext, useEffect, useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const OrdersHistory = () => {
  const [openDetail, setOpenDetail] = useState(false);
  const [popup, setPopup] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [orderIndex, setOrderIndex] = useState<number>(0);
  const [currentOrderId, setCurrentOrderId] = useState<number>();
  const toast = useContext(ToastContext);
  const { user } = useContext(LoginContext);
  const { t } = useTranslation();

  const handleOpenDetail = (i: number) => {
    setOrderIndex(i);
    setOpenDetail(!openDetail);
  };

  const getOrders = async () => {
    const response = await getByCustomer(user.id);
    response.success && setOrders(response.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleClickCancel = async (id: number, index: number) => {
    const status = orders[index].status;

    const statusMessages: { [key: string]: string } = {
      [ShippingStatus.CANCELLED]: t('order_cancelled'),
      [ShippingStatus.SUCCESS]: t('order_delivered'),
      [ShippingStatus.FAIL]: t('order_failed'),
      [ShippingStatus.RETURNED]: t('order_returned'),
      [ShippingStatus.DELIVERY]: t('order_shipping_cannot_cancel'),
      [ShippingStatus.DELAYED]: t('order_delayed_cannot_cancel'),
      [ShippingStatus.CONFIRMED]: t('order_confirmed_cannot_cancel'),
    };

    if (statusMessages[status]) return toast.showToast(statusMessages[status]);

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
              <div className="bg-tertiary w-[500px] relative z-[1] bg-white h-fit p-5 py-12 rounded flex-col gap-3 flex">
                <div className="font-bold text-[28px]">
                  {t('confirm_cancel')}
                </div>
                <div className="flex gap-8 pt-5 text-[18px]">
                  <div
                      className="cursor-pointer hover:text-primary"
                      onClick={() => setPopup(false)}
                  >
                    {t('no')}
                  </div>
                  <div
                      className="cursor-pointer hover:text-primary"
                      onClick={() => handleCancel(currentOrderId || 1)}
                  >
                    {t('confirm')}
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
                  className="bg-tertiary w-[750px] relative z-[1] bg-white h-fit p-5 pt-0 rounded flex-col gap-3 flex"
              >
                <div className="flex flex-col">
                  <div
                      className="text-[40px] text-right cursor-pointer hover:text-primary"
                      onClick={() => setOpenDetail(false)}
                  >
                    x
                  </div>
                  <div className="flex flex-row gap-2">
                    <div>{orders[orderIndex].customer.username}</div>
                    <div>{orders[orderIndex].customer.phone}</div>
                  </div>
                  <div>{orders[orderIndex].address}</div>
                  <div>{t('pay_on_delivery')}</div>
                  <div>{t('note')}: {orders[orderIndex].note}</div>
                </div>

                <div className="flex flex-col gap-2 py-4">
                  <div className="grid grid-cols-10 py-1 text-center text-white bg-gray-700 rounded-sm">
                    <div className="col-span-5">{t('product')}</div>
                    <div className="col-span-1">{t('quantity')}</div>
                    <div className="col-span-2">{t('unit_price')}</div>
                    <div className="col-span-2">{t('total_price')}</div>
                  </div>

                  {orders[orderIndex].orderDetails.map((orderDetail) => (
                      <div key={orderDetail.id} className="grid grid-cols-10 text-center">
                        <div className="col-span-5">
                          {orderDetail.product.name + ', ' + orderDetail.phoneCategory.name}
                        </div>
                        <div className="col-span-1">{orderDetail.quantity}</div>
                        <div className="col-span-2">{formatPrice(orderDetail.product.price)}</div>
                        <div className="col-span-2">
                          {formatPrice(orderDetail.product.price * orderDetail.quantity)}
                        </div>
                      </div>
                  ))}

                  <div className="flex flex-col items-end gap-1 p-3">
                    <div>
                      <strong>{t('total')}:</strong>{' '}
                      {formatPrice(
                          orders[orderIndex].orderDetails.reduce(
                              (acc, cur) => acc + cur.product.price * cur.quantity,
                              0
                          )
                      )}
                    </div>
                    <div>
                      <strong>{t('shipping_fee')}:</strong>{' '}
                      {' + '}
                      {formatPrice(
                          orders[orderIndex].orderDetails.reduce(
                              (acc, cur) => acc + cur.product.price * cur.quantity,
                              0
                          ) - orders[orderIndex].total
                      )}
                    </div>
                    <div>
                      <strong>{t('promotion')}:</strong>{' '}
                      {' - '}
                      {formatPrice(orders[orderIndex].discount)}
                    </div>
                    <div>
                      <strong>{t('final_total')}:</strong>{' '}
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

        <div className="text-[25px] p-5">{t('order_history')}</div>

        <div className="flex flex-col gap-2 divide-y-2 divide-black">
          <div className="grid grid-cols-6 font-bold place-items-center">
            <div>{t('order_id')}</div>
            <div>{t('order_date')}</div>
            <div>{t('order_total')}</div>
            <div>{t('payment_method')}</div>
            <div>{t('order_status')}</div>
            <div></div>
          </div>

          {orders.map((order, index) => (
              <div key={order.id} className="flex flex-col divide-y divide-black">
                <div className="grid grid-cols-6 py-3 place-items-center">
                  <div className="font-bold text-primary">{order.id}</div>
                  <div>{order.createDate.slice(0, 10)}</div>
                  <div>{formatPrice(order.total)}</div>
                  <div>
                    {order.paymentStatus === PaymentStatus.PAID
                        ? t('paid')
                        : t('unpaid')}
                  </div>
                  <div>
                    {t(`shipping_status`)}
                  </div>
                  <div className="flex items-center gap-2">
                    <label
                        htmlFor={`detail-${orderIndex}`}
                        onClick={() => handleOpenDetail(index)}
                        className={`flex items-center gap-2 cursor-pointer hover:text-primary${
                            openDetail ? ' text-primary' : ''
                        }`}
                    >
                      <div className="text-nowrap">{t('order_detail')}</div>
                      <FaInfoCircle className="text-2xl" />
                    </label>
                    <div
                        onClick={() => handleClickCancel(order.id, index)}
                        className="grid h-full px-2 py-1 bg-gray-400 rounded cursor-pointer hover:bg-red-500 text-nowrap place-items-center"
                    >
                      {t('cancel_order')}
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default OrdersHistory;
