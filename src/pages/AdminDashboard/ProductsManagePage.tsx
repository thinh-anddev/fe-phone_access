import { useEffect, useState } from "react";
import ManageDashboard from "./components/manage-dashboard";
import { getAllProduct } from "@/api/Product";

const ProductsManagePage = () => {
  const [allProduct, setAllProduct] = useState<any[]>([]);

  const getProducts = async () => {
    const res = await getAllProduct();
    setAllProduct(res.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ManageDashboard
      subjectName="sản phẩm"
      prouducts={allProduct}
      updateList={getProducts}
    />
  );
};
export default ProductsManagePage;
