import {
  getListDistrict,
  getListProvince,
  getListWard,
} from "@/api/ghn_api/Address";
import { Button } from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import updateAddress from "../api/updateAddress";
import { useTranslation } from "react-i18next";

interface FormEditAddressProps {
  hide: () => void;
  update: () => void;
  address: any;
}

const FormEditAddress: React.FC<FormEditAddressProps> = ({
  hide,
  update,
  address,
}) => {
  const { t } = useTranslation();
  const { user } = useContext(LoginContext);
  const { showToast } = useContext(ToastContext);
  const [subAddress, setSubAddress] = useState(address?.subAddress);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [provinceIdSelected, setProvinceIdSelected] = useState(address.provinceId);
  const [districtIdSelected, setDistrictIdSelected] = useState(address.districtId);
  const [wardIdSelected, setWardIdSelected] = useState(address.wardId);

  const [provinceValSelected, setProvinceValSelected] = useState(address.provinceValue);
  const [districtValSelected, setDistrictValSelected] = useState(address.districtValue);
  const [wardValSelected, setWardValSelected] = useState(address.wardValue);

  const onChangeProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value;
    setListDistrict([]);
    setListWard([]);
    if (idSelected === "") {
      setProvinceIdSelected(-1);
      setProvinceValSelected("");
      return;
    }

    setDistrictIdSelected(0);
    setWardIdSelected(0);
    const valSelected = e.target.options[e.target.selectedIndex].text;
    setProvinceIdSelected(parseInt(idSelected));
    setProvinceValSelected(valSelected);
    getListDistrict(parseInt(idSelected)).then((res) => {
      setListDistrict(res.data);
    });
  };

  const onChangeDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value;
    setListWard([]);
    if (idSelected === "") {
      setDistrictIdSelected(-1);
      return;
    }
    setDistrictValSelected("");
    setWardIdSelected(0);
    const valSelected = e.target.options[e.target.selectedIndex].text;
    setDistrictIdSelected(parseInt(idSelected));
    setDistrictValSelected(valSelected);
    getListWard(parseInt(idSelected)).then((res) => {
      setListWard(res.data);
    });
  };

  const handleChangeWard = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value && e.target.options[e.target.selectedIndex].text) {
      setWardIdSelected(parseInt(e.target.value));
      setWardValSelected(e.target.options[e.target.selectedIndex].text);
    }
  };

  const editAddress = async () => {
    if (
      !subAddress ||
      !wardIdSelected ||
      !wardValSelected ||
      !districtIdSelected ||
      !districtValSelected ||
      !provinceIdSelected ||
      !provinceValSelected
    ) {
      showToast(t("fill_address_completely"));
      return;
    }

    const data = {
      id: address.id,
      provinceIdSelected,
      provinceValSelected,
      districtIdSelected,
      districtValSelected,
      wardIdSelected,
      wardValSelected,
      subAddress,
      customerId: user.id,
    };

    const res = await updateAddress(data);
    showToast(res.message);
    hide();
    update();
  };

  useEffect(() => {
    getListProvince().then((res) => {
      setListProvince(res.data);
    });
  }, []);

  useEffect(() => {
    if (listProvince.length) {
      const province = document.getElementById("province") as HTMLSelectElement;
      if (province) {
        province.value = String(provinceIdSelected);
        getListDistrict(provinceIdSelected).then((res) => {
          setListDistrict(res.data);
        });
      }
    }
  }, [listProvince]);

  useEffect(() => {
    if (listDistrict.length) {
      const district = document.getElementById("district") as HTMLSelectElement;
      if (district) {
        district.value = String(districtIdSelected);
        getListWard(districtIdSelected).then((res) => {
          setListWard(res.data);
        });
      }
    }
  }, [listDistrict]);

  useEffect(() => {
    if (listWard.length) {
      const ward = document.getElementById("ward") as HTMLSelectElement;
      if (ward) {
        ward.value = String(wardIdSelected);
      }
    }
  }, [listWard]);

  return (
    <>
      <div
        onClick={hide}
        className="fixed z-[1] w-screen h-screen top-0 left-0 bg-black/30"
      ></div>
      <div className="flex gap-4 flex-col p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] bg-slate-300 w-[400px]">
        <p className="text-2xl">{t("add_new_address")}</p>
        <input
          className="p-2 border rounded"
          type="text"
          placeholder={t("street_house_number")}
          value={subAddress || address.subAddress}
          onChange={(e) => setSubAddress(e.target.value)}
        />
        <select
          id="province"
          onChange={onChangeProvince}
          className="p-2 rounded border"
        >
          <option value="">{t("province_city")}</option>
          {listProvince.map((province: any) => (
            <option key={province.ProvinceID} value={province.ProvinceID}>
              {province.ProvinceName}
            </option>
          ))}
        </select>
        <select
          id="district"
          onChange={onChangeDistrict}
          className="p-2 rounded border"
        >
          <option value="">{t("district")}</option>
          {listDistrict.map((district: any) => (
            <option key={district.DistrictID} value={district.DistrictID}>
              {district.DistrictName}
            </option>
          ))}
        </select>
        <select
          id="ward"
          defaultValue={wardIdSelected}
          onChange={handleChangeWard}
          className="p-2 rounded border"
        >
          <option value="">{t("ward_commune")}</option>
          {listWard.map((ward: any) => (
            <option key={ward.WardCode} value={ward.WardCode}>
              {ward.WardName}
            </option>
          ))}
        </select>

        <div className="flex gap-x-2">
          <Button
            onClick={hide}
            className="flex-1 py-1 border rounded hover:border-black"
          >
            {t("no")}
          </Button>
          <Button
            onClick={editAddress}
            className="flex-1 py-1 rounded bg-primary hover:bg-white"
          >
            {t("add")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormEditAddress;
