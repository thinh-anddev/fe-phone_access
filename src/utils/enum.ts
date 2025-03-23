export enum CommonStatus {
  DELETED = 0,
  ACTIVE = 1,
}
export enum ProductStatus {
  DELETED = 0,
  ACTIVE = 1,
  OUT_OF_STOCK = 2,
}
export enum ShippingStatus {
  PENDING = 0,
  PROCESSING = 1,
  CONFIRMED = 2,
  DELIVERY = 3,
  DELAYED = 4,
  RETURNED = 5,
  CANCELLED = 6,
  FAIL = 7,
  SUCCESS = 8,
}

export enum ShippingLabel {
  PENDING = "Chờ xác nhận",
  PROCESSING = "Đang xử lý",
  CONFIRMED = "Đã xác nhận",
  DELIVERY = "Đang giao hàng",
  DELAYED = "Hoãn, chờ giao lại",
  RETURNED = "Đã trả hàng",
  CANCELLED = "Đã hủy",
  FAIL = "Thất bại",
  SUCCESS = "Thành công",
}
export enum PaymentStatus {
  UNPAID = 0,
  PAID = 1,
}
