import { useEffect, useState } from "react";
import banner1 from "../../assets/image-common/banner-1.jpeg";
import banner2 from "../../assets/image-common/banner-2.png";
import banner3 from "../../assets/image-common/banner-3.jpg";
import "./css/banner.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import clsx from "clsx";
import { sortProducts } from "@/api/Product";
import { ProductType } from "@/utils/models";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const banners = [banner1, banner2, banner3];
  const [bannerActive, setBannerActive] = useState<number>(0);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const [bestSaleProducts, setBestSaleProducts] = useState<ProductType[]>([]);

  const classes = clsx("absolute max-w-full");

  // Khởi tạo banner
  useEffect(() => {
    if (banners.length > 0) {
      setBannerActive(0);
    }
  }, []);

  // Cập nhật banner khi bannerActive thay đổi
  useEffect(() => {
    const bannerImg = document.getElementById("banner-img");
    if (bannerImg) {
      bannerImg.innerHTML = `<img id='img' src=${banners[bannerActive]} className='${classes}' alt='' />`;
    }
  }, [bannerActive]);

  // Xử lý chuyển đổi hình banner
  const handleChangeImage = (direction: number) => {
    setBannerActive((prev) => {
      if (direction === 1) {
        return prev === banners.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? banners.length - 1 : prev - 1;
      }
    });
    const bannerImg = document.getElementById("banner-img");
    if (bannerImg) {
      const img = document.getElementById("img");
      img?.classList.add(direction === 1 ? "fade-to-right" : "fade-to-left");
    }
  };

  // Lấy dữ liệu sản phẩm
  const getProducts = async () => {
    try {
      const latestRes = await sortProducts("", 1, "4", "desc", "createAt");
      if (latestRes.status === "ok") {
        setLatestProducts(latestRes.data.products);
      }
      const bestSaleRes = await sortProducts("", 1, "4", "desc", "sold");
      if (bestSaleRes.status === "ok") {
        setBestSaleProducts(bestSaleRes.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
      <div>
        <section className="relative select-none">
          <div
              className="absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer z-[1]"
              onClick={() => handleChangeImage(0)}
          >
            <IoIosArrowBack className="text-[50px]" />
          </div>
          <div id="banner-img" className="relative">
            <div id="wrapper1"></div>
            <div id="wrapper2"></div>
          </div>
          <div
              className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer z-[1]"
              onClick={() => handleChangeImage(1)}
          >
            <IoIosArrowForward className="text-[50px]" />
          </div>
        </section>

        <section className="flex flex-col items-center gap-2 mx-auto mt-16 max-w-7xl">
          <div className="text-3xl font-black">{t('new_products')}</div>
          <div className="grid my-6 xl:grid-cols-4 gap-14 md:grid-cols-2 sm:grid-cols-2">
            {latestProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <button
              onClick={() => navigate("/products")}
              className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-7 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300"
          >
            {t('view_more')}
          </button>
        </section>

        <section className="flex flex-col items-center gap-2 mx-auto mt-16 max-w-7xl">
          <div className="text-3xl font-black">{t('top_selling_product')}</div>
          <div className="grid my-6 xl:grid-cols-4 gap-14 md:grid-cols-2 sm:grid-cols-2">
            {bestSaleProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
          </div>
          <button
              onClick={() => navigate("/products")}
              className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-7 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300"
          >
            {t('view_more')}
          </button>
        </section>
      </div>
  );
};

export default HomePage;