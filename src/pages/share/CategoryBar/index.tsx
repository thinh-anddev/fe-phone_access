import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const categories = ["Trang chủ", "Sản phẩm", "Liên hệ", "Chính sách đổi trả"];
  const urlCategories = ["", "products", "contact", "policy"];
  const pathname = useLocation().pathname;
  const [activeTab, setActiveTab] = useState(categories[0]);
  const navigate = useNavigate();
  const handleClickTab = (index: number) => {
    setActiveTab(categories[index]);
    navigate(`/${urlCategories[index]}`);
  };
  useEffect(() => {
    if (pathname === "/") {
      return setActiveTab(categories[0]);
    }
    if (pathname === "/products") {
      return setActiveTab(categories[1]);
    }
    if (pathname === "/contact") {
      return setActiveTab(categories[2]);
    }
    if (pathname === "/policy") {
      return setActiveTab(categories[3]);
    }
    setActiveTab("");
  }, [pathname]);
  return (
    <div className="w-full p-2 bg-primary">
      <div className="flex justify-center gap-10 mx-auto font-bold max-w-7xl">
        {categories.map((category, index) => {
          return (
            <div
              key={category}
              onClick={() => handleClickTab(index)}
              className={`${
                activeTab === category ? "" : "text-opacity-70"
              } transition-all cursor-pointer text-[16px] text-stroke hover:text-opacity-70`}
            >
              <p>{category}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryBar;
