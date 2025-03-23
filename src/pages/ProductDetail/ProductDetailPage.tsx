import { useParams } from "react-router-dom";
import { detailProduct } from "./api/detailProduct";
import InfoProduct from "./components/InfoProduct";
import { useEffect, useState } from "react";
import { ProductType } from "@/utils/models";

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>({} as ProductType);

  const getProduct = () => {
    const response = detailProduct(Number.parseInt(params.id || "1"));

    response.then((res) => {
      if (res.success) {
        setProduct(() => res.product);
        console.log(res.product);
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <InfoProduct product={product} />
      <div className="mt-10">{/* <ViewedProduct /> */}</div>
    </div>
  );
};

export default ProductDetailPage;
