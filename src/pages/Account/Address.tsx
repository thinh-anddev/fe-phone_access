/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import getAddressById from "./api/getAddressById";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import deleteAddressById from "./api/deteleAddressById";
import FormAddAddress from "./components/FormAddAddress";
import FormEditAddress from "./components/FormEditAddress";

const Address = () => {
  const { t } = useTranslation();
  const { user } = useContext(LoginContext);
  const [addresses, setAddresses] = useState<any>();
  const { showToast } = useContext(ToastContext);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingAddress, setEditingAddtress] = useState();

  const formatAddress = (address: any) => {
    return `${address?.subAddress}, ${address?.wardValue}, ${address?.districtValue}, ${address?.provinceValue}`;
  };

  const removeAddress = async (id: number) => {
    const res = await deleteAddressById(id);
    showToast(res.message);
    update();
  };

  const getAddresses = async () => {
    const addresses = await getAddressById(user.id);
    setAddresses(addresses.data);
  };

  const update = () => {
    getAddresses();
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
      <div className="flex flex-col gap-2">
        {showAdd && (
            <FormAddAddress hide={() => setShowAdd(false)} update={update} />
        )}
        {showEdit && (
            <FormEditAddress
                hide={() => setShowEdit(false)}
                update={update}
                address={editingAddress}
            />
        )}
        <div className="text-[25px] p-5">{t("address")}</div>
        <div className="flex flex-col gap-2">
          <p
              onClick={() => setShowAdd(true)}
              className="underline hover:text-blue-400 w-fit cursor-pointer"
          >
            {t("add_address")}
          </p>
          <div className="flex flex-col border border-black divide-y divide-black">
            {addresses &&
                addresses.map((address: any, index: number) => {
                  return (
                      <div
                          key={index}
                          className="flex px-2 justify-between items-center"
                      >
                        <div className="py-3 place-items-center line-clamp-1">
                          <p>{formatAddress(address)}</p>
                        </div>
                        <div className="flex gap-x-2">
                          <p
                              onClick={() => {
                                setEditingAddtress(address);
                                setShowEdit(true);
                              }}
                              className="cursor-pointer underline hover:text-blue-400"
                          >
                            {t("edit")}
                          </p>
                          <p
                              onClick={() => removeAddress(address.id)}
                              className="cursor-pointer underline hover:text-blue-400"
                          >
                            {t("remove")}
                          </p>
                        </div>
                      </div>
                  );
                })}
          </div>
        </div>
      </div>
  );
};

export default Address;
