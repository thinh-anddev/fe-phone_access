import { useEffect, useState } from "react";
import ManageDashboard from "./components/manage-dashboard";
import { getAllProduct } from "@/api/Product";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { useContext } from "react";
import {searchApi} from "@/pages/AdminDashboard/api/searchProduct.ts.tsx";
import {ProductType} from "@/utils/models.ts";

const ProductsManagePage = () => {
  const [allProduct, setAllProduct] = useState<ProductType[]>([]);
  const { showToast } = useContext(ToastContext);

  const getProducts = async () => {
    try {
      const res = await getAllProduct();
      setAllProduct(res.data);
    } catch (error: any) {
      showToast("Không thể tải danh sách sản phẩm!");
    }
  };

  const handleSearch = async (name: string) => {
    try {
      const res = await searchApi(name);
      if (res.success) {
        setAllProduct(res.products);
      } else {
        showToast(res.message);
        setAllProduct([]);
      }
    } catch (error: any) {
      showToast("Lỗi khi tìm kiếm sản phẩm!");
      setAllProduct([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
      <ManageDashboard
          subjectName="Sản Phẩm"
          prouducts={allProduct}
          updateList={getProducts}
          onSearch={handleSearch}
      />
  );
};

export default ProductsManagePage;