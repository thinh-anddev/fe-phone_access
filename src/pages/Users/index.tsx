import { useState } from "react";
import Login from "./LoginPage";
import Register from "./RegisterPage";

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className="my-4 w-[600px] max-w-[90%] border border-line mx-auto rounded">
      <div className="flex border-b-2 border-line">
        <p
          onClick={() => handleChangeActiveTab(0)}
          className={`cursor-pointer transition-all flex-1 text-center text-primary py-2  border-b-2 ${
            activeTab == 0 ? "border-primary" : "border-transparent"
          }`}
        >
          Đăng nhập
        </p>
        <p
          onClick={() => handleChangeActiveTab(1)}
          className={`cursor-pointer transition-all flex-1 text-center text-primary py-2  border-b-2 ${
            activeTab == 1 ? "border-primary" : "border-transparent"
          }`}
        >
          Đăng ký
        </p>
      </div>
      <div className="p-4">{activeTab == 0 ? <Login /> : <Register />}</div>
    </div>
  );
};

export default LoginRegister;
