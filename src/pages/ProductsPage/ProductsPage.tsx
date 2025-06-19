import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CategoryType, ProductType } from "@/utils/models";
import { sortProducts } from "@/api/Product";
import { getAllCategories } from "@/api/Category";
import { useTranslation } from "react-i18next";  // <-- thêm import

const ProductsPage = () => {
  const { t } = useTranslation();  // <-- hook i18n

  const [hiddenFilters, setHiddenFilters] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const sortTabs = [
    t("sort.none"),
    t("sort.newest"),
    t("sort.priceLowToHigh"),
    t("sort.priceHighToLow"),
  ];
  const [sortTab, setSortTab] = useState<string>(sortTabs[0]);
  const [activeCategory, setActiveCategory] = useState<string>(t("category2.allProducts"));
  const [pageCount, setPageCount] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const handleToggleFilters = () => {
    setHiddenFilters(!hiddenFilters);
  };

  const handleClickCategory = (category: string) => {
    setSortTab(t("sort.none"));
    setHiddenFilters(true);
    if (category === t("category2.allProducts")) {
      setActiveCategory(category);
      setCategory("");
    } else {
      setActiveCategory(category);
      setCategory(category);
    }
  };

  const handleSort = (tab: string) => {
    if (tab === t("sort.none")) {
      setOrderBy("");
      setSortTab(tab);
    }
    if (tab === t("sort.newest")) {
      setOrderBy("createAt");
      setSortTab(tab);
    }
    if (tab === t("sort.priceLowToHigh")) {
      setOrderBy("price");
      setSortTab(tab);
      setOrder("desc");
    }
    if (tab === t("sort.priceHighToLow")) {
      setOrderBy("price");
      setSortTab(tab);
      setOrder("asc");
    }
  };

  const getProducts = () => {
    sortProducts(category, page, "8", order, orderBy).then((res) => {
      if (res.status === "ok") {
        setProducts(res.data.products);
        setPageCount(res.data.totalPage);
      }
    });
  };

  const handlePagination = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getProducts();
    getAllCategories().then((response) => {
      response.status === "ok" && setCategories(response.data);
    });
    products.length > 0 && setPageCount(Math.ceil(products.length / 4));
  }, [activeCategory, order, page, orderBy]);

  return (
      <div className="flex flex-col py-2 mx-auto max-w-7xl">
        <div className="relative flex justify-end w-full">
          <div
              onClick={() => handleToggleFilters()}
              className="flex items-center gap-2 py-2 border-2 rounded cursor-pointer select-none w-fit hover:bg-primary px-7 border-primary"
          >
            <div>{t("filter.sortBy")}</div>
            <FaAngleDown />
          </div>
          <div
              className={
                hiddenFilters
                    ? "hidden "
                    : "absolute z-[1] select-none  top-12 right-0 flex flex-col overflow-hidden bg-white rounded shadow-form"
              }
          >
            {sortTabs.map((tab) => {
              return (
                  <div
                      onClick={() => handleSort(tab)}
                      className={`flex items-center py-2 border-b cursor-pointer hover:bg-primary px-7 ${
                          sortTab === tab ? "bg-primary" : ""
                      }`}
                      key={tab}
                  >
                    {tab}
                  </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-10 ">
          <div className="flex flex-col w-1/5 mx-5">
            <div className="p-3 pb-2 text-xl font-bold border-b-2 text-primary border-primary">
              {t("category2.productCategories")}
            </div>
            <div className="flex flex-col gap-2 p-3 ">
              <div
                  onClick={() => handleClickCategory(t("category2.allProducts"))}
                  className={`${
                      activeCategory === t("category2.allProducts") ? "text-primary" : ""
                  } cursor-pointer hover:text-primary w-fit`}
              >
                {t("category2.allProducts")}
              </div>
              {categories.map((category) => {
                return (
                    <div
                        onClick={() => handleClickCategory(category.name)}
                        className={`${
                            activeCategory === category.name ? "text-primary" : ""
                        } cursor-pointer hover:text-primary w-fit`}
                        key={category.id}
                    >
                      {category.name}
                    </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center w-4/5 gap-5 min-h-[600px]">
            <div className="grid grid-cols-4 gap-5 pt-3 min-h-[500px]">
              {products &&
                  products.map((product) => {
                    return <ProductCard product={product} key={product.id} />;
                  })}
            </div>
            <div className="grid grid-flow-col overflow-hidden border divide-x rounded">
              {pageCount > 1 &&
                  Array.from({ length: pageCount }, (_, index) => {
                    return (
                        <div
                            onClick={() => handlePagination(index + 1)}
                            key={index}
                            className={`px-4 py-1.5 cursor-pointer select-none hover:bg-primary ${
                                page === index + 1 ? "bg-primary" : ""
                            }`}
                        >
                          {index + 1}
                        </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductsPage;
