import { useEffect, useState, useContext } from "react";
import { FaUserShield } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { getAllAccounts, updateUserRole, updateUserStatus, deleteUser } from "@/api/User";
import { CustomerType } from "@/utils/models";

const AccountsManagePage = () => {
  const [accounts, setAccounts] = useState<CustomerType[]>([]);
  const toast = useContext(ToastContext);

  const fetchUsers = async () => {
    const response = await getAllAccounts();
    if (response.success) setAccounts(response.users);
  };

  const handleUpdateRole = async (userId: number, newRole: number) => {
    const response = await updateUserRole(userId, newRole);
    if (response.success) {
      toast.showToast("Cập nhật vai trò người dùng thành công");
      fetchUsers();
    } else {
      toast.showToast("Cập nhật role thất bại");
    }
  };

  const handleUpdateStatus = async (userId: number, newStatus: number) => {
    const response = await updateUserStatus(userId, newStatus);
    if (response.success) {
      toast.showToast("Cập nhật trạng thái người dùng thành công");
      fetchUsers();
    } else {
      toast.showToast("Cập nhật trạng thái thất bại");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    const response = await deleteUser(userId);
    if (response.message === "ok") {
      toast.showToast("Xoá người dùng thành công");
      fetchUsers();
    } else {
      toast.showToast("zzzzz");
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
          <div className="col-span-2 text-center">Quyền</div>
          <div className="col-span-2 text-center">Trạng thái</div>
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
              <select
                value={user.role}
                onChange={(e) => handleUpdateRole(user.id, parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-2 focus:ring-primary"

              >
                <option value={0}>User</option>
                <option value={1}>Admin</option>
              </select>
            </div>
            <div className="col-span-2 text-center">
              <select
                value={user.status || 0} // Giả định status mặc định là 0 nếu chưa có
                onChange={(e) => handleUpdateStatus(user.id, parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-2 focus:ring-primary"

              >
                <option value={0}>Active</option>
                <option value={1}>Inactive</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountsManagePage;