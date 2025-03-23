import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { useContext, useState } from "react";
import updateInfo from "./api/updateInfo";

const UserProfile = () => {
  const { user, setUser } = useContext(LoginContext);
  const [userName, setUserName] = useState(user?.username || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const { showToast } = useContext(ToastContext);

  const isNotChange = () => {
    return user?.username === userName && user?.phone === phone;
  };
  const check = async () => {
    if (!userName || !phone) {
      showToast("Vui lòng điền đầy đủ thông tin");
      return;
    } else {
      if (/\D/.test(phone)) {
        showToast("Số điện thoại không hợp lệ");
        return;
      }
    }
    const res = await updateInfo(user.id, userName, phone);
    setUser(res.data);

    showToast(res.message);
  };

  const handleSubmit = () => {
    isNotChange() ? showToast("Không có thông tin nào thay đổi") : check();
  };

  return (
    <div className="flex flex-col gap-2 p-5">
      <div className="text-[25px]">Thông tin cá nhân</div>
      <div className="flex flex-col items-center gap-1 px-10 py-4 gap-y-2">
        <div className="grid items-center w-full grid-cols-8 select-none">
          <div className="col-span-1">Họ tên</div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-1/2 col-span-7 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div>
        <div className="grid items-center w-full grid-cols-8 select-none">
          <div className="col-span-1">Điện thoại</div>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-1/2 col-span-7 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div>
        {/* <div className="grid items-center w-full grid-cols-8 select-none">
          <div className="col-span-1">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-1/2 col-span-7 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div> */}
        <button
          onClick={() => handleSubmit()}
          className="px-4 py-2 m-2 rounded select-none bg-primary hover:bg-opacity-80 w-fit"
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};
export default UserProfile;
