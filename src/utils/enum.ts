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
  PENDING = "pending_confirmation",
  PROCESSING = "processing",
  CONFIRMED = "confirmed",
  DELIVERY = "delivering",
  DELAYED = "rescheduled",
  RETURNED = "returned",
  CANCELLED = "cancel",
  FAIL = "fail",
  SUCCESS = "successful",
}
export enum PaymentStatus {
  UNPAID = 0,
  PAID = 1,
}
