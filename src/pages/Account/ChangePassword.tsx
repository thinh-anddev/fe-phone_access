import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { useContext, useState } from "react";
import updatePassword from "./api/updatePassword";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [retypeNewPass, setRetypeNewPass] = useState("");
  const { showToast } = useContext(ToastContext);
  const { user } = useContext(LoginContext);

  const handleSubmit = async () => {
    if (!oldPass || !newPass || !retypeNewPass) {
      showToast("Vui lòng nhập đầy đủ");
      return;
    }
    if (newPass !== retypeNewPass) {
      showToast("Mật khẩu không trùng khớp");
      return;
    }

    const res = await updatePassword(user.id, oldPass, newPass);
    showToast(res.message);
    reset();
  };

  const reset = () => {
    setOldPass("");
    setNewPass("");
    setRetypeNewPass("");
  };

  return (
    <div className="flex flex-col gap-2 p-5">
      <div className="text-[25px]">Đổi mật khẩu</div>
      <div className="flex flex-col items-center gap-1 px-10 py-4 gap-y-2">
        <div className="grid items-center w-full grid-cols-5 select-none">
          <div className="col-span-1">Mật khẩu cũ</div>
          <input
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            className="w-1/2 col-span-4 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div>
        <div className="grid items-center w-full grid-cols-5 select-none">
          <div className="col-span-1">Mật khẩu mới</div>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-1/2 col-span-4 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div>
        <div className="grid items-center w-full grid-cols-5 select-none">
          <div className="col-span-1">Xác nhận mật khẩu</div>
          <input
            type="password"
            value={retypeNewPass}
            onChange={(e) => setRetypeNewPass(e.target.value)}
            className="w-1/2 col-span-4 px-3 py-1 border border-gray-300 rounded outline-primary "
          />
        </div>
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
export default ChangePassword;
