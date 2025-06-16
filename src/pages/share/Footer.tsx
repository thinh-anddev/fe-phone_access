import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/image-common/logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();
    const urlPaths = ["", "products", "contact", "policy"];
    const pathname = useLocation().pathname;
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const handleClickLink = (index: number) => {
        setActiveIndex(index);
        navigate(`/${urlPaths[index]}`);
    };

    useEffect(() => {
        const index = urlPaths.findIndex((path) => pathname === "/" + path || (path === "" && pathname === "/"));
        setActiveIndex(index !== -1 ? index : -1);
    }, [pathname]);

    const translatedLinks = [
        t("home"),
        t("products"),
        t("contact"),
        t("policy"),
    ];

    return (
        <div className="w-full bg-purple-500 text-black font-bold p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="w-1/3">
                    <img src={logo} alt="logo" className="h-[100px]" />
                </div>
                <div className="w-2/3 flex justify-around">
                    <div className="flex flex-col gap-2">
                        {[0, 1].map((index) => (
                            <div
                                key={index}
                                onClick={() => handleClickLink(index)}
                                className={`${
                                    activeIndex === index ? "" : "opacity-70"
                                } cursor-pointer text-stroke hover:text-opacity-70 transition-opacity`}
                            >
                                <p>{translatedLinks[index]}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        {[2, 3].map((index) => (
                            <div
                                key={index}
                                onClick={() => handleClickLink(index)}
                                className={`${
                                    activeIndex === index ? "" : "opacity-70"
                                } cursor-pointer text-stroke hover:text-opacity-70 transition-opacity`}
                            >
                                <p>{translatedLinks[index]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
