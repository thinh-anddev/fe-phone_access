import { useEffect, useState, useContext } from "react";
import ManageDashboard from "./components/manage-dashboard";
import { getAllProduct } from "@/api/Product";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { searchApi } from "@/pages/AdminDashboard/api/searchProduct.ts.tsx";
import { ProductType } from "@/utils/models.ts";
import { useTranslation } from "react-i18next";

const ProductsManagePage = () => {
  const [allProduct, setAllProduct] = useState<ProductType[]>([]);
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  const getProducts = async () => {
    try {
      const res = await getAllProduct();
      setAllProduct(res.data);
    } catch (error: any) {
      showToast(t("product_list_load_fail"));
    }
  };

  const handleSearch = async (name: string) => {
    try {
      const res = await searchApi(name);
      if (res.success) {
        setAllProduct(res.products);
      } else {
        showToast(t("product_search_not_found"));
        setAllProduct([]);
      }
    } catch (error: any) {
      showToast(t("product_search_error"));
      setAllProduct([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
      <ManageDashboard
          subjectName={t("product")}
          prouducts={allProduct}
          updateList={getProducts}
          onSearch={handleSearch}
      />
  );
};

export default ProductsManagePage;
