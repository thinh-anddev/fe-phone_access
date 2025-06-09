import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { useContext, useState } from "react";
import updateInfo from "./api/updateInfo";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { user, setUser } = useContext(LoginContext);
  const [userName, setUserName] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const { showToast } = useContext(ToastContext);
  const { t } = useTranslation();

  const isNotChange = () => {
    return user?.username === userName && user?.phone === phone;
  };

  const check = async () => {
    if (!userName || !phone) {
      showToast(t("fill_all_information"));
      return;
    } else {
      if (/\D/.test(phone)) {
        showToast(t("invalid_phone"));
        return;
      }
    }
    const res = await updateInfo(user.id, userName, phone);
    setUser(res.data);
    showToast(res.message); // Giả sử message này đã được server dịch
  };

  const handleSubmit = () => {
    isNotChange()
        ? showToast(t("no_changes"))
        : check();
  };

  return (
      <div className="flex flex-col gap-2 p-5">
        <div className="text-[25px]">{t("user_profile")}</div>
        <div className="flex flex-col items-center gap-1 px-10 py-4 gap-y-2">
          <div className="grid items-center w-full grid-cols-8 select-none">
            <div className="col-span-1">{t("full_name")}</div>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-1/2 col-span-7 px-3 py-1 border border-gray-300 rounded outline-primary "
            />
          </div>
          <div className="grid items-center w-full grid-cols-8 select-none">
            <div className="col-span-1">{t("phone")}</div>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-1/2 col-span-7 px-3 py-1 border border-gray-300 rounded outline-primary "
            />
          </div>
          {/* Nếu bạn muốn dùng email sau này */}
          {/* <div className="grid items-center w-full grid-cols-8 select-none">
          <div className="col-span-1">{t("email")}</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-1/2 col-span-7 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div> */}
          <button
              onClick={handleSubmit}
              className="px-4 py-2 m-2 rounded select-none bg-primary hover:bg-opacity-80 w-fit"
          >
            {t('update')}
          </button>
        </div>
      </div>
  );
};

export default UserProfile;
