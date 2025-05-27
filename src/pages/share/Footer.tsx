import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/image-common/logo.png";

const Footer = () => {
    const links = ["Trang chủ", "Sản Phẩm", "Liên hệ", "Chính sách đổi trả"];
    const urlPaths = ["", "products", "contact", "policy"];
    const pathname = useLocation().pathname;
    const [activeLink, setActiveLink] = useState(links[0]);
    const navigate = useNavigate();

    const handleClickLink = ({index}: { index: any }) => {
        setActiveLink(links[index]);
        navigate(`/${urlPaths[index]}`);
    };

    useEffect(() => {
        if (pathname === "/") {
            return setActiveLink(links[0]);
        }
        if (pathname === "/products") {
            return setActiveLink(links[1]);
        }
        if (pathname === "/contact") {
            return setActiveLink(links[2]);
        }
        if (pathname === "/policy") {
            return setActiveLink(links[3]);
        }
        setActiveLink("");
    }, [pathname]);

    return (
        <div className="w-full bg-purple-500 text-black font-bold p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="w-1/3">
                    <img src={logo} alt="logo" className="h-[100px]" />
                </div>
                <div className="w-2/3 flex justify-around">
                    <div className="flex flex-col gap-2">
                        {links.slice(0, 2).map((link, index) => (
                            <div
                                key={link}
                                onClick={() => handleClickLink({index: index})}
                                className={`${
                                    activeLink === link ? "" : "opacity-70"
                                } cursor-pointer text-stroke hover:text-opacity-70 transition-opacity`}
                            >
                                <p>{link}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        {links.slice(2, 4).map((link, index) => (
                            <div
                                key={link}
                                onClick={() => handleClickLink({index: index + 2})}
                                className={`${
                                    activeLink === link ? "" : "opacity-70"
                                } cursor-pointer text-stroke hover:text-opacity-70 transition-opacity`}
                            >
                                <p>{link}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;