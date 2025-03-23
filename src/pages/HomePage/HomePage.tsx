import { useEffect, useState } from "react";
import banner1 from "../../assets/image-common/banner-1.jpeg";
import banner2 from "../../assets/image-common/banner-2.png";
import banner3 from "../../assets/image-common/banner-3.jpg";
import "./css/banner.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import clsx from "clsx";
import { sortProducts } from "@/api/Product";
import { ProductType } from "@/utils/models";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const banners = [banner1, banner2, banner3];
  const [bannerActive, setBannerActive] = useState<number>(0);
  const toggle = useState<boolean>(false);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const [bestSaleProducts, setBestSaleProducts] = useState<ProductType[]>([]);

  const classes = clsx("absolute max-w-full");
  useEffect(() => {
    if (banners.length > 0) {
      setBannerActive(0);
    }
  }, []);

  const handleChangeImage = (direction: number) => {
    const bannerImg = document.getElementById("banner-img");
    if (direction === 1) {
      if (toggle) {
        if (bannerImg)
          bannerImg.innerHTML = `<img id='img' src=${banners[bannerActive]} className='${classes}' alt=""/>`;
        setBannerActive(
          bannerActive === banners.length - 1 ? 0 : bannerActive + 1
        );
        if (bannerImg)
          bannerImg.innerHTML = `<img id='img' src=${banners[bannerActive]} className='${classes}' alt=""/>`;
      }
    } else {
      setBannerActive(
        bannerActive === 0 ? banners.length - 1 : bannerActive - 1
      );
      if (bannerImg)
        bannerImg.innerHTML = `<img id='img' src=${banners[bannerActive]} className='${classes}' alt="" />`;
    }
    const img = document.getElementById("img");
    img?.classList.add(direction === 1 ? "fade-to-right" : "fade-to-left");
  };
  const getProducts = () => {
    sortProducts("", 1, "4", "desc", "createAt").then((res) => {
      if (res.status === "ok") {
        setLatestProducts(res.data.products);
      }
    });
    sortProducts("", 1, "4", "desc", "sold").then((res) => {
      if (res.status === "ok") {
        setBestSaleProducts(res.data.products);
      }
    });
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    const bannerImg = document.getElementById("banner-img");
    bannerImg &&
      (bannerImg.innerHTML = `<img src=${banners[bannerActive]} className ='${classes}' alt=""/>`);
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
        <div className="text-3xl font-black">Sản phẩm mới</div>
        <div className="grid my-6 xl:grid-cols-4 gap-14 md:grid-cols-2 sm:grid-cols-2 ">
          {latestProducts.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
        <button
          onClick={() => navigate("/products")}
          className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-7 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300"
        >
          Xem thêm
        </button>
      </section>
      <section className="flex flex-col items-center gap-2 mx-auto mt-16 max-w-7xl">
        <div className="text-3xl font-black">Sản phẩm bán chạy</div>
        <div className="grid my-6 xl:grid-cols-4 gap-14 md:grid-cols-2 sm:grid-cols-2 ">
          {bestSaleProducts.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
        <button
          onClick={() => navigate("/products")}
          className="focus:outline-none text-white bg-primary hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-base px-7 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-300"
        >
          Xem thêm
        </button>
      </section>
    </div>
  );
};
export default HomePage;
