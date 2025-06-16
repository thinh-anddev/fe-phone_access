import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { searchApi } from "./api";
import { ProductType } from "@/utils/models";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // 🆕

  const handleInputChange = (e: any) => {
    const query = e.target.value;
    setQuery(query);
    if (query.length > 1) {
      setShowForm(true);
      searchApi(query).then((response) => {
        response.success && setResults(response.products);
      });
    } else {
      setShowForm(false);
      setResults([]);
    }
  };

  return (
      <div className="relative w-[300px]">
        <div className="flex items-center justify-center w-full overflow-hidden border-2 border-black border-opacity-50 rounded bg-tertiary ">
          <input
              onFocus={() => setShowForm(true)}
              id="search"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder={t("search_placeholder")} // 🆕
              className="w-full px-3 py-1 text-lg leading-4 text-black outline-none bg-tertiary placeholder:text-black placeholder:text-opacity-50"
          />
          <div
              onClick={() => {
                setShowForm(false);
                navigate("/search?name=" + query);
              }}
              className="pr-2 cursor-pointer bg-tertiary text-primary hover:text-secondary"
          >
            <IoSearch className=" text-[24px]" />
          </div>
        </div>

        <div
            className={`${
                showForm && results.length > 0 ? "flex p-2" : "hidden "
            } absolute left-0 z-10 bg-white max-h-[240px] flex-col w-full overflow-y-scroll divide-y divide-black rounded shadow-2xl bg-tertiary top-full`}
        >
          {results.map((product: ProductType) => {
            return (
                <Link
                    key={product.id}
                    onClick={() => {
                      setShowForm(false);
                    }}
                    to={`/product_detail/${product.id}`}
                >
                  <div className="flex items-center w-full gap-4 py-1 text-black cursor-pointer hover:text-opacity-70 ">
                    <img
                        className="w-10 aspect-auto"
                        src={product.images[0].url}
                        alt=""
                    />
                    <div>{product.name}</div>
                  </div>
                </Link>
            );
          })}

          <Link
              onClick={() => {
                setShowForm(false);
              }}
              to={"/search?name=" + query}
              className={`${
                  showForm && results.length > 3 ? "block py-1" : "hidden"
              }  text-center text-gray-900 bg-tertiary hover:opacity-70`}
          >
            {t("view_all")} {/* 🆕 */}
          </Link>
        </div>
      </div>
  );
};

export default SearchBar;
