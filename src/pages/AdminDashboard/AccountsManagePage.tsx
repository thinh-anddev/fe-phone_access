import { useEffect, useState, useContext } from "react";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import { getAllAccounts, updateUserRole, updateUserStatus,  } from "@/api/User";
import { CustomerType } from "@/utils/models";
import { useTranslation } from "react-i18next";

const AccountsManagePage = () => {
  const [accounts, setAccounts] = useState<CustomerType[]>([]);
  const toast = useContext(ToastContext);
  const { t } = useTranslation();

  const fetchUsers = async () => {
    const response = await getAllAccounts();
    if (response.success) setAccounts(response.users);
  };

  const handleUpdateRole = async (userId: number, newRole: number) => {
    const response = await updateUserRole(userId, newRole);
    if (response.success) {
      toast.showToast(t("update_role_success"));
      fetchUsers();
    } else {
      toast.showToast(t("update_role_failed"));
    }
  };

  const handleUpdateStatus = async (userId: number, newStatus: number) => {
    const response = await updateUserStatus(userId, newStatus);
    if (response.success) {
      toast.showToast(t("update_status_success"));
      fetchUsers();
    } else {
      toast.showToast(t("update_status_failed"));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <div className="flex flex-col w-full gap-2 p-1 rounded shadow-sm">
        <div className="text-[25px]">{t("account_management")}</div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-12 pb-2 border-b border-black text-nowrap text-stroke">
            <div className="col-span-1">{t("id")}</div>
            <div className="col-span-3">{t("username")}</div>
            <div className="col-span-4">{t("email")}</div>
            <div className="col-span-2 text-center">{t("role")}</div>
            <div className="col-span-2 text-center">{t("status")}</div>
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
                    <option value={0}>{t("user")}</option>
                    <option value={1}>{t("admin")}</option>
                  </select>
                </div>
                <div className="col-span-2 text-center">
                  <select
                      value={user.status || 0}
                      onChange={(e) => handleUpdateStatus(user.id, parseInt(e.target.value))}
                      className="p-2 border border-gray-300 rounded-md w-full sm:w-40 focus:ring-2 focus:ring-primary"
                  >
                    <option value={0}>{t("active")}</option>
                    <option value={1}>{t("inactive")}</option>
                  </select>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default AccountsManagePage;
