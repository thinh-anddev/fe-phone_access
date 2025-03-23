import { Link, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { ProductType } from "@/utils/models";
import { searchApi } from "../share/Search/api";
import ProductCard from "@/components/ProductCard/ProductCard";

const SearchPage = () => {
  const pathname = useLocation().search;
  const searchParams = new URLSearchParams(pathname);
  const query = searchParams.get("name");
  const [results, setResults] = useState<ProductType[]>([]);

  useEffect(() => {
    if (query) {
      if (query.length > 1) {
        searchApi(query).then((response) => {
          response.success && setResults(response.products);
        });
      } else {
        setResults([]);
      }
    }
  }, [query]);
  return (
    <div className="flex flex-col gap-5 py-5 mx-auto max-w-7xl">
      <div className="text-[40px] text-center">Kết quả tìm kiếm</div>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {results.map((product) => {
          return (
            <Link key={product.id} to={`/product_detail/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SearchPage;
