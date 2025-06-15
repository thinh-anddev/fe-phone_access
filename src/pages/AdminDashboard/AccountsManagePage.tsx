import { useEffect, useState, useContext } from "react";
import { FaUserShield } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { getAllAccounts, setAdminRole, deleteUser } from "@/api/User";
import { CustomerType } from "@/utils/models";

const AccountsManagePage = () => {
  const [accounts, setAccounts] = useState<CustomerType[]>([]);
  const toast = useContext(ToastContext);

  const fetchUsers = async () => {
    const response = await getAllAccounts();
    if (response.success) setAccounts(response.users);
  };

  const handleSetAdmin = async (userId: number) => {
    const response = await setAdminRole(userId);
    if (response.success) {
      toast.showToast("Cập nhật quyền admin thành công");
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const response = await deleteUser(userId);
    if (response.success) {
      toast.showToast("Xoá người dùng thành công");
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <div className="flex flex-col w-full gap-2 p-1 rounded shadow-sm">
        <div className="text-[25px]">Quản lý tài khoản</div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-12 pb-2 border-b border-black text-nowrap text-stroke">
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Tên người dùng</div>
            <div className="col-span-4">Email</div>
            <div className="col-span-2 text-center">Role</div>
            <div className="col-span-2 text-center">Hành động</div>
          </div>

          {accounts.map((user) => (
              <div
                  key={user.id}
                  className="grid items-center grid-cols-12 py-2 border-b border-stroke text-stroke"
              >
                <div className="col-span-1">#{user.id}</div>
                <div className="col-span-3">{user.username}</div>
                <div className="col-span-4">{user.email}</div>
                <div className="col-span-2 text-center">
              <span
                  className={`px-3 py-1 rounded-full ${
                      user.role === 1
                          ? "bg-green-200 text-green-700"
                          : "bg-gray-200 text-gray-700"
                  }`}
              >
                {user.role}
              </span>
                </div>
                <div className="flex items-center justify-center gap-3 col-span-2 text-xl">
                  {user.role !== 1 && (
                      <FaUserShield
                          className="cursor-pointer hover:text-primary"
                          title="Set Admin"
                          onClick={() => handleSetAdmin(user.id)}
                      />
                  )}
                  <RiDeleteBin5Line
                      className="cursor-pointer hover:text-red-500"
                      title="Xoá người dùng"
                      onClick={() =>
                          handleDeleteUser(user.id)
                  }
                  />
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default AccountsManagePage;
