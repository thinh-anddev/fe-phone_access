import { useParams } from "react-router-dom";
import { detailProduct } from "./api/detailProduct";
import InfoProduct from "./components/InfoProduct";
import { useEffect, useState } from "react";
import { ProductType } from "@/utils/models";
import { useTranslation } from "react-i18next";

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductType>({} as ProductType);
  const { t } = useTranslation();

  const getProduct = async () => {
    try {
      const response = await detailProduct(Number.parseInt(params.id || "1"));
      if (response.success) {
        setProduct(response.product);
      }
    } catch (error) {
      console.error(t("product_detail.error_fetch"), error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [params.id]);

  return (
      <div className="max-w-[1280px] mx-auto p-4">
        <InfoProduct product={product} />

      </div>
  );
};

export default ProductDetailPage;