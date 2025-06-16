import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryBar = () => {
  const { t } = useTranslation();
  const categories = ["home", "products", "contact", "policy"];
  const urlCategories = ["", "products", "contact", "policy"];
  const pathname = useLocation().pathname;
  const [activeTab, setActiveTab] = useState(categories[0]);
  const navigate = useNavigate();

  const handleClickTab = (index: number) => {
    setActiveTab(categories[index]);
    navigate(`/${urlCategories[index]}`);
  };

  useEffect(() => {
    if (pathname === "/") return setActiveTab("home");
    if (pathname === "/products") return setActiveTab("products");
    if (pathname === "/contact") return setActiveTab("contact");
    if (pathname === "/policy") return setActiveTab("policy");
    setActiveTab("");
  }, [pathname]);

  return (
      <div className="w-full p-2 bg-primary">
        <div className="flex justify-center gap-10 mx-auto font-bold max-w-7xl">
          {categories.map((key, index) => (
              <div
                  key={key}
                  onClick={() => handleClickTab(index)}
                  className={`${
                      activeTab === key ? "" : "text-opacity-70"
                  } transition-all cursor-pointer text-[16px] text-stroke hover:text-opacity-70`}
              >
                <p>{t(key)}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default CategoryBar;
