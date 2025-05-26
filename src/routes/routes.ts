import PaymentPage from "@/pages/Payment/PaymentPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AccountPage from "../pages/Account";
import CartPage from "../pages/Cart/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import LoginRegister from "../pages/Users";
import ForgotPassPage from "../pages/Users/FogotPassPage";
import SearchPage from "@/pages/SearchPage";
import PaymentSuccess from "@/pages/PaymentSuccess/PaymentSuccess";
import ContactPage from "@/pages/Contact/ContactPage.tsx";

const pathName = {
  homepage: "/",
  user: "/user",
  forgot_pass: "/forgot_pass",
  account: "/account",
  product_detail: "/product_detail/:id",
  products: "/products",
  contact: "/contact",
  cart: "/cart",
  payment: "/payment",
  admin: "/admin_dashboard",
  search: "/search",
  payment_success: "/payment_success",
};

const routes = [
  { path: pathName.homepage, element: HomePage },
  { path: pathName.user, element: LoginRegister },
  { path: pathName.forgot_pass, element: ForgotPassPage },
  { path: pathName.account, element: AccountPage },
  { path: pathName.product_detail, element: ProductDetailPage },
  { path: pathName.products, element: ProductsPage },
  { path: pathName.contact, element: ContactPage },
  { path: pathName.cart, element: CartPage },
  { path: pathName.payment, element: PaymentPage },
  { path: pathName.admin, element: AdminDashboard },
  { path: pathName.search, element: SearchPage },
  { path: pathName.payment_success, element: PaymentSuccess },
];

export default routes;
