import {
  getListDistrict,
  getListProvince,
  getListWard,
} from "@/api/ghn_api/Address";
import { Button } from "@chakra-ui/react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import addAddress from "../api/addAddress";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";

interface FormAddAddressProps {
  hide: () => void;
  update: () => void;
}

const FormAddAddress: React.FC<FormAddAddressProps> = ({ hide, update }) => {
  const { user } = useContext(LoginContext);
  const { showToast } = useContext(ToastContext);
  const [subAddress, setSubAddress] = useState("");

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [provinceIdSelected, setProvinceIdSelected] = useState(-1);
  const [districtIdSelected, setDistrictIdSelected] = useState(-1);
  const [wardIdSelected, setWardIdSelected] = useState(-1);

  const [provinceValSelected, setProvinceValSelected] = useState("");
  const [districtValSelected, setDistrictValSelected] = useState("");
  const [wardValSelected, setWardValSelected] = useState("");

  useEffect(() => {
    getListProvince().then((res) => {
      setListProvince(() => res.data);
    });
  }, []);

  const onChangeProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value;
    setListDistrict(() => []);
    setListWard(() => []);
    if (idSelected === "") {
      setProvinceIdSelected(() => -1);
      setProvinceValSelected(() => "");
      return;
    }

    const valSelected = e.target.options[e.target.selectedIndex].text;
    setProvinceIdSelected(() => parseInt(idSelected));
    setProvinceValSelected(() => valSelected);
    getListDistrict(parseInt(idSelected)).then((res) => {
      setListDistrict(() => res.data);
    });
  };

  const onChangeDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value;
    setListWard(() => []);
    if (idSelected === "") {
      setDistrictIdSelected(() => -1);
      setDistrictValSelected(() => "");
      return;
    }

    const valSelected = e.target.options[e.target.selectedIndex].text;
    setDistrictIdSelected(() => parseInt(idSelected));
    setDistrictValSelected(() => valSelected);
    getListWard(parseInt(idSelected)).then((res) => {
      setListWard(() => res.data);
    });
  };

  const handleChangeWard = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value && e.target.options[e.target.selectedIndex].text) {
      setWardIdSelected(parseInt(e.target.value));
      setWardValSelected(e.target.options[e.target.selectedIndex].text);
    }
  };

  const insertAddress = async () => {
    if (
      !subAddress ||
      !wardIdSelected ||
      !wardValSelected ||
      !districtIdSelected ||
      !districtValSelected ||
      !provinceIdSelected ||
      !provinceValSelected
    ) {
      showToast("Hãy thêm đầy đủ địa chỉ");
      return;
    }

    const data = {
      provinceIdSelected,
      provinceValSelected,
      districtIdSelected,
      districtValSelected,
      wardIdSelected,
      wardValSelected,
      subAddress,
      customerId: user.id,
    };
    console.log(data);

    const res = await addAddress(data);
    showToast(res.message);
    hide();
    update();
  };

  return (
    <>
      <div
        onClick={hide}
        className="fixed z-[1] w-screen h-screen top-0 left-0 bg-black/30"
      ></div>
      <div className="flex gap-4 flex-col p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] bg-slate-300 w-[400px]">
        <p className="text-2xl">thêm địa chỉ mới</p>
        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Đường, số nhà"
          value={subAddress}
          onChange={(e) => setSubAddress(e.target.value)}
        />

        <select
          onChange={(e) => onChangeProvince(e)}
          className="p-2 rounded border"
        >
          <option value="">Tỉnh/Thành phố</option>
          {listProvince.map((province: any) => (
            <option key={province.ProvinceID} value={province.ProvinceID}>
              {province.ProvinceName}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => onChangeDistrict(e)}
          className="p-2 rounded border"
        >
          <option value="">Quận/Huyện</option>
          {listDistrict.map((district: any) => (
            <option key={district.DistrictID} value={district.DistrictID}>
              {district.DistrictName}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleChangeWard(e)}
          className="p-2 rounded border"
        >
          <option value="">Phường/Xã</option>
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
            Huỷ
          </Button>
          <Button
            onClick={insertAddress}
            className="flex-1 py-1 rounded bg-primary hover:bg-white"
          >
            Thêm
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormAddAddress;
