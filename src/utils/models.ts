import {
  CommonStatus,
  PaymentStatus,
  ProductStatus,
  ShippingStatus,
} from "./enum";

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  sold: number;
  createAt: string;
  images: Image[];
  category: CategoryType;
  status: ProductStatus;
  productPhoneCategories: ProductPhoneCategoriesType[];
};
export type ProductPhoneCategoriesType = {
  product: ProductType;
  phoneCategory: PhoneCategoryType;
};

export type PhoneCategoryType = {
  id: number;
  name: string;
  status: CommonStatus;
  products: ProductType[];
};
export type CategoryType = {
  id: number;
  name: string;
  products: ProductType[];
};
export type Image = {
  id: number;
  url: string;
};
export type CartDetailType = {
  id: number;
  product: ProductType;
  phoneCategory: PhoneCategoryType;
  customer: CustomerType;
  quantity: number;
  status: number;
};
export type CustomerType = {
  id: number;
  email: string;
  password: string;
  phone: string;
  point: number;
  role: number;
  status: number;
  username: string;
  email_code: string;
  email_code_time: string;
};
export type OrderType = {
  id: number;
  address: string;
  createDate: string;
  delivery_id: string;
  discount: number;
  paymentDate: string;
  paymentStatus: PaymentStatus;
  status: ShippingStatus;
  total: number;
  note: string;
  customer: CustomerType;
  orderDetails: OrderDetailType[];
};
export type OrderDetailType = {
  id: number;
  price: number;
  quantity: number;
  status: number;
  order: OrderType;
  product: ProductType;
  phoneCategory: PhoneCategoryType;
};

