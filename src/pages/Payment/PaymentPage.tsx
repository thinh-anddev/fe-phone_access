import {
  getListDistrict,
  getListProvince,
  getListWard,
} from "@/api/ghn_api/Address";
import { LoginContext } from "@/hooks/LoginStatus/LoginContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ghn from "../Cart/api/ghn";
import { ToastContext } from "@/hooks/ToastMessage/ToastContext";
import estShippingFee from "../Cart/api/estShippingFee";
import getAddressById from "../Account/api/getAddressById";
import saveOrder from "./api/saveOrder";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import getLinkVNPay from "./api/getLinkVNPay";
import { useTranslation } from "react-i18next";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [provinceIdSelected, setProvinceIdSelected] = useState(0);
  const [districtIdSelected, setDistrictIdSelected] = useState(0);
  const [wardIdSelected, setWardIdSelected] = useState(0);

  const [provinceValSelected, setProvinceValSelected] = useState("");
  const [districtValSelected, setDistrictValSelected] = useState("");
  const [wardValSelected, setWardValSelected] = useState("");
  const [subAddress, setSubAddtress] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState(1); // 1 là người bán trả, 2 là người mua trả
  const [listItem, setListItem] = useState<any>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const { user } = useContext(LoginContext);
  const { showToast } = useContext(ToastContext);
  const [listAddress, setListAddress] = useState<any[]>([]);
  const [pointAccepted, setPointAccepted] = useState(0);
  const [selectTypeAddress, setSelectTypeAddress] = useState(2); // 1 là chọn address cũ, 2 là chọn address mới
  const [loadingPaying, setLoadingPaying] = useState(false);
  const navigate = useNavigate();
  const queryParams: any = {};

  // State cho lỗi validation
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    subAddress: "",
    discount: "",
  });

  useEffect(() => {
    getListProvince().then((res) => {
      setListProvince(() => res.data);
    });
  }, []);

  const onChangeProvince = (e: ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value;
    setListDistrict(() => []);
    setListWard(() => []);
    setShippingFee(0);
    setDistrictIdSelected(() => 0);
    setWardIdSelected(() => 0);
    if (idSelected === "") {
      setProvinceIdSelected(() => 0);
      setProvinceValSelected(() => "");
      setErrors((prev) => ({ ...prev, province: t("province_required") }));
      return;
    }
    const valSelected = e.target.options[e.target.selectedIndex].text;
    setProvinceIdSelected(() => parseInt(idSelected));
    setProvinceValSelected(() => valSelected);
    setErrors((prev) => ({ ...prev, province: "" }));
    getListDistrict(parseInt(idSelected)).then((res) => {
      setListDistrict(() => res.data);
    });
  };

  const onChangeDistrict = (e: ChangeEvent<HTMLSelectElement>) => {
    const idSelected = e.target.value;
    setListWard(() => []);
    if (idSelected === "") {
      setDistrictIdSelected(() => 0);
      setDistrictValSelected(() => "");
      setErrors((prev) => ({ ...prev, district: t("district_required") }));
      return;
    }
    const valSelected = e.target.options[e.target.selectedIndex].text;
    setDistrictIdSelected(() => parseInt(idSelected));
    setDistrictValSelected(() => valSelected);
    setErrors((prev) => ({ ...prev, district: "" }));
    getListWard(parseInt(idSelected)).then((res) => {
      setListWard(() => res.data);
    });
  };

  const calTotalOrder = () => {
    if (listItem) {
      const totalWithoutDiscount = listItem.reduce(
        (total: number, item: any) => {
          return total + item.product.price * item.quantity;
        },
        0
      );
      return totalWithoutDiscount;
    }
    return 0;
  };

  const getFutureTimestamp = (hoursToAdd: number) => {
    const currentTime = new Date();
    const futureTime = new Date(
      currentTime.getTime() + hoursToAdd * 60 * 60 * 1000
    );
    return Math.floor(futureTime.getTime() / 1000);
  };

  const formatListItem = () =>
    listItem.map((item: any) => {
      return {
        name: item.product.name,
        description: item.product.description,
        quantity: item.product.quantity,
        price: item.product.price,
      };
    });

  const handleApplyDiscount = () => {
    if (discount < 0) {
      setErrors((prev) => ({ ...prev, discount: t("invalid_discount_points") }));
      showToast(t("invalid_discount_points"));
      return;
    }
    if (discount > user.point) {
      setErrors((prev) => ({ ...prev, discount: t("not_enough_discount_points") }));
      showToast(t("not_enough_discount_points"));
      return;
    }
    setErrors((prev) => ({ ...prev, discount: "" }));
    setPointAccepted(discount);
    setTotalOrder(calTotalOrder() - discount * 100);
  };

  const handleChangeAddress = (e: ChangeEvent<HTMLSelectElement>) => {
    if (listAddress.length > 0) {
      const idAddress = e.target.value;
      const addressObj = listAddress.find((address) => address.id == idAddress);
      updateAddress(addressObj);
    }
  };

  const updateAddress = (address: any) => {
    if (listAddress.length > 0) {
      setSubAddtress(address.subAddress);
      setWardIdSelected(address.wardId);
      setWardValSelected(address.wardValue);
      setDistrictIdSelected(address.districtId);
      setDistrictValSelected(address.districtValue);
      setProvinceIdSelected(address.provinceId);
      setProvinceValSelected(address.provinceValue);
      setErrors((prev) => ({
        ...prev,
        province: "",
        district: "",
        ward: "",
        subAddress: "",
      }));
    }
  };

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors };
    switch (fieldName) {
      case "name":
        if (!value.trim()) newErrors.name = t("name_required");
        else newErrors.name = "";
        break;
      case "phone":
        const phoneRegex = /^0[0-9]{9,10}$/;
        if (!value.trim()) newErrors.phone = t("phone_required");
        else if (!phoneRegex.test(value)) newErrors.phone = t("invalid_phone_format");
        else newErrors.phone = "";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.email = t("email_required");
        else if (!emailRegex.test(value)) newErrors.email = t("invalid_email_format");
        else newErrors.email = "";
        break;
      case "subAddress":
        if (!value.trim()) newErrors.subAddress = t("sub_address_required");
        else newErrors.subAddress = "";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      province: "",
      district: "",
      ward: "",
      subAddress: "",
      discount: errors.discount,
    };

    // Validate name
    if (!name.trim()) {
      newErrors.name = t("name_required");
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^0[0-9]{9,10}$/;
    if (!phone.trim()) {
      newErrors.phone = t("phone_required");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = t("invalid_phone_format");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = t("email_required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = t("invalid_email_format");
      isValid = false;
    }

    // Validate address fields
    if (!provinceValSelected) newErrors.province = t("province_required");
    if (!districtValSelected) newErrors.district = t("district_required");
    if (!wardValSelected) newErrors.ward = t("ward_required");
    if (!subAddress.trim()) newErrors.subAddress = t("sub_address_required");

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    let orderDetails: any;
    let tempListItem: any;
    let point = 0;
    let objShippingFee = 0;
    const vnpResponseCode = queryParams?.vnp_ResponseCode;

    if (vnpResponseCode && vnpResponseCode == "00") {
      const orderDetailsJSON = localStorage.getItem("orderDetails");
      if (orderDetailsJSON) {
        orderDetails = JSON.parse(orderDetailsJSON);
      }
      const listItemJson = localStorage.getItem("listItem");
      if (listItemJson) {
        tempListItem = JSON.parse(listItemJson);
        setListItem(tempListItem);
      }
      point = queryParams.point;
      objShippingFee = queryParams.shippingFee;
    } else {
      if (!validateForm()) return;

      orderDetails = {
        payment_type_id: payment,
        note: note,
        required_note: "KHONGCHOXEMHANG",
        return_phone: "0357747175",
        return_address: "DHNL",
        return_district_id: null,
        return_ward_code: "",
        client_order_code: "",
        from_name: "Gia Bảo Shop",
        from_phone: "0357747175",
        from_address:
          "DHNL, Phường Linh Tây, Thành Phố Thủ Đức 1, Hồ Chí Minh, Vietnam",
        from_ward_name: "Phường 14",
        from_district_name: "Quận 10",
        from_province_name: "HCM",
        to_name: name,
        to_phone: phone,
        to_address: `${subAddress}, ${wardValSelected}, ${districtValSelected}, ${provinceValSelected}`,
        to_ward_name: wardValSelected,
        to_district_name: districtValSelected,
        to_province_name: provinceValSelected,
        cod_amount: payment == 1 ? 0 : totalOrder,
        content: "HEHEHE",
        weight: 200,
        length: 20,
        width: 10,
        height: 10,
        cod_failed_amount: 0,
        pick_station_id: null,
        deliver_station_id: null,
        insurance_value: calTotalOrder(),
        service_id: 0,
        service_type_id: 2,
        coupon: null,
        pickup_time: getFutureTimestamp(3),
        pick_shift: [2],
        items: formatListItem(),
      };

      localStorage.removeItem("orderDetails");
      localStorage.removeItem("listItem");
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      localStorage.setItem("listItem", JSON.stringify(listItem));

      if (payment == 1) {
        const listId = listItem.map((item: any) => {
          return { id: item.id };
        });

        const res = await getLinkVNPay(pointAccepted, listId, shippingFee);
        window.location.href = res.data;
        return;
      }
    }

    setLoadingPaying(true);
    ghn(orderDetails)
      .then((data) => {
        const code = data.data.order_code;

        const listIdCartDetail = tempListItem
          ? tempListItem.map((item: any) => item.id)
          : listItem.map((item: any) => item.id);
        const order = {
          cartDetailIds: [...listIdCartDetail],
          customerId: user.id,
          deliveryId: code,
          paymentStatus: vnpResponseCode ? 1 : payment,
          address: vnpResponseCode
            ? `${orderDetails.to_address}`
            : `${subAddress}, ${wardValSelected}, ${districtValSelected}, ${provinceValSelected}`,
          note: vnpResponseCode ? orderDetails.note : note,
          point: vnpResponseCode ? point : pointAccepted,
          shippingFee: vnpResponseCode ? objShippingFee : shippingFee,
        };
        saveOrder(order)
          .then(() => {
            user.point = vnpResponseCode
              ? user.point - point
              : user.point - pointAccepted;
            showToast("Mua hàng thành công");
            setLoadingPaying(false);
            navigate("/payment_success");
          })
          .catch(() => {
            setLoadingPaying(false);
          });
      })
      .catch(() => {
        setLoadingPaying(false);
      });
  };

  useEffect(() => {
    let items = localStorage.getItem("cartCheckout");
    items = items && JSON.parse(items);
    setListItem(items);
  }, []);

  const estFee = async () => {
    if (wardIdSelected && districtIdSelected && provinceIdSelected) {
      const orderDetails = {
        service_type_id: 2,
        from_district_id: 1452,
        to_district_id: districtIdSelected,
        to_ward_code: wardIdSelected.toString(),
        height: 10,
        length: 20,
        weight: 200,
        width: 10,
        insurance_value: calTotalOrder(),
        coupon: null,
        items: formatListItem(),
      };
      estShippingFee(orderDetails)
        .then((data) => setShippingFee(data.data.total))
        .catch((error) => console.error(error));
    }
  };
  useEffect(() => {
    estFee();
  }, [wardIdSelected, districtIdSelected, provinceIdSelected]);

  useEffect(() => {
    setTotalOrder(calTotalOrder());
  }, [listItem]);

  useEffect(() => {
    const getAddresses = async () => {
      if (user) {
        const listAddress = await getAddressById(user.id);
        setListAddress(listAddress.data);
      }
    };
    getAddresses();
  }, [user]);

  useEffect(() => {
    if (user) {
      const url = window.location.href;
      console.log(url);

      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      params.forEach((value, key) => {
        queryParams[key] = value;
      });

      const vnpResponseCode = queryParams?.vnp_ResponseCode;
      if (vnpResponseCode) {
        if (vnpResponseCode == "00") handleSubmit();
        else {
          showToast(t("payment_failed"));
          navigate("/payment");
        }
      }
    }
  }, [user]);

  return (
    <div>
      <div className="flex justify-between mx-auto max-w-7xl">
        <div className="w-full p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="grid h-8 text-lg font-bold text-white rounded-full place-items-center aspect-square bg-primary">
              1
            </div>
            <div className="text-lg font-bold">{t("user_info")}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: "" }));
                }}
                onBlur={() => validateField("name", name)} // Validation khi rời chuột
                type="text"
                className="w-full p-2 border rounded outline-primary border-line"
                placeholder={t("full_name") + "*"}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                onBlur={() => validateField("phone", phone)} // Validation khi rời chuột
                type="text"
                className="w-full p-2 border rounded outline-primary border-line"
                placeholder={t("phone") + "*"}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => ({ ...prev, email: "" }));
                }}
                onBlur={() => validateField("email", email)} // Validation khi rời chuột
                type="email"
                className="w-full p-2 border rounded outline-primary border-line"
                placeholder="Email*"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex gap-x-2 items-center">
              <button
                onClick={() => setSelectTypeAddress(2)}
                className={`${selectTypeAddress == 2 && "bg-primary"} py-1 flex-1 rounded border border-primary`}
              >
                {t("new_address")}
              </button>
              <p>{t("or")}</p>
              <button
                onClick={() => {
                  if (listAddress) {
                    updateAddress(listAddress[0]);
                  }
                  setSelectTypeAddress(1);
                }}
                className={`${selectTypeAddress == 1 && "bg-primary"} py-1 flex-1 rounded border border-primary`}
              >
                {t("existing_address")}
              </button>
            </div>
            {selectTypeAddress == 1 &&
              (listAddress.length > 0 ? (
                <select
                  onChange={(e) => handleChangeAddress(e)}
                  className="w-full p-2 border rounded outline-primary border-line"
                >
                  {listAddress?.map((item: any, index: number) => (
                    <option
                      key={index}
                      value={item.id}
                    >{`${item.subAddress}, ${item.wardValue}, ${item.districtValue}, ${item.provinceValue}`}</option>
                  ))}
                </select>
              ) : (
                <p>{t("no_address_yet")}</p>
              ))}
            {selectTypeAddress == 2 && (
              <>
                <div>
                  <select
                    value={provinceIdSelected}
                    onChange={(e) => onChangeProvince(e)}
                    onBlur={() => {
                      if (!provinceValSelected) {
                        setErrors((prev) => ({ ...prev, province: t("province_required") }));
                      }
                    }} // Validation khi rời chuột
                    className="w-full p-2 border rounded outline-primary border-line"
                  >
                    <option value="">{t("province_city")}</option>
                    {listProvince?.map((province: any) => (
                      <option
                        key={province.ProvinceID}
                        value={province.ProvinceID}
                      >
                        {province.ProvinceName}
                      </option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
                </div>
                <div>
                  <select
                    value={districtIdSelected}
                    onChange={(e) => onChangeDistrict(e)}
                    onBlur={() => {
                      if (!districtValSelected) {
                        setErrors((prev) => ({ ...prev, district: t("district_required") }));
                      }
                    }} // Validation khi rời chuột
                    className="w-full p-2 border rounded outline-primary border-line"
                  >
                    <option value="">{t("district")}</option>
                    {listDistrict?.map((district: any) => (
                      <option
                        key={district.DistrictID}
                        value={district.DistrictID}
                      >
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                </div>
                <div>
                  <select
                    value={wardIdSelected}
                    onChange={(e) => {
                      setWardIdSelected(parseInt(e.target.value));
                      setWardValSelected(e.target.options[e.target.selectedIndex].text);
                      setErrors((prev) => ({ ...prev, ward: "" }));
                    }}
                    onBlur={() => {
                      if (!wardValSelected) {
                        setErrors((prev) => ({ ...prev, ward: t("ward_required") }));
                      }
                    }} // Validation khi rời chuột
                    className="w-full p-2 border rounded outline-primary border-line"
                  >
                    <option value="">{t("ward_commune")}</option>
                    {listWard?.map((ward: any) => (
                      <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                  {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
                </div>
                <div>
                  <input
                    value={subAddress}
                    onChange={(e) => {
                      setSubAddtress(e.target.value);
                      setErrors((prev) => ({ ...prev, subAddress: "" }));
                    }}
                    onBlur={() => validateField("subAddress", subAddress)} // Validation khi rời chuột
                    type="text"
                    className="w-full p-2 border rounded outline-primary border-line"
                    placeholder={t("street_house_number_required")}
                  />
                  {errors.subAddress && <p className="text-red-500 text-sm">{errors.subAddress}</p>}
                </div>
              </>
            )}
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              cols={5}
              rows={5}
              className="w-full p-2 border rounded outline-primary border-line"
              placeholder={t("note")}
            ></textarea>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="grid h-8 text-lg font-bold text-white rounded-full place-items-center aspect-square bg-primary">
              2
            </div>
            <div className="text-lg font-bold">{t("payment_method")}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div
              onClick={() => setPayment(1)}
              className="flex items-center gap-4"
            >
              <input
                defaultChecked={payment == 1}
                type="radio"
                name="payment"
                id="visa"
              />
              <label htmlFor="visa">{t("pay_with_vnpay")}</label>
            </div>
            <div
              onClick={() => setPayment(2)}
              className="flex items-center gap-4"
            >
              <input
                defaultChecked={payment == 2}
                type="radio"
                name="payment"
                id="cod"
              />
              <label htmlFor="cod">{t("cod_payment")}</label>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="grid h-8 text-lg font-bold text-white rounded-full place-items-center aspect-square bg-primary">
              3
            </div>
            <div className="text-lg font-bold">{t("cart_info")}</div>
          </div>
          <div className="w-full">
            <div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-start">{t("product")}</th>
                    <th className="text-nowrap">{t("quantity")}</th>
                    <th>{t("total")}</th>
                  </tr>
                </thead>
                <tbody>
                  {listItem.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="py-4 font-bold text-primary">
                        {item.product.name}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">
                        {item.quantity * item.product.price}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="font-bold">{t("provisional")}</div>
                <div>{totalOrder}đ</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">{t("shipping_fee")}</div>
                <div>{shippingFee}đ</div>
              </div>
              <p className="w-full text-end">
                {t("you_have_points", { points: user?.point })}
              </p>
              <div className="flex justify-between items-center">
                <div className="font-bold">{t("use_reward_points")}</div>
                <div className="flex flex-col items-end gap-2">
                  <input
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setDiscount(value);
                      setErrors((prev) => ({ ...prev, discount: "" }));
                    }}
                    value={discount}
                    onBlur={() => {
                      if (discount < 0) {
                        setErrors((prev) => ({ ...prev, discount: t("invalid_discount_points") }));
                        showToast(t("invalid_discount_points"));
                      } else if (discount > (user?.point || 0)) {
                        setErrors((prev) => ({ ...prev, discount: t("not_enough_discount_points") }));
                        showToast(t("not_enough_discount_points"));
                      }
                    }} // Validation khi rời chuột
                    inputMode="numeric"
                    pattern="[0-9]"
                    className="p-2 w-32 border rounded outline-primary border-line"
                    placeholder={t("you_have_points_input", { points: user?.point })}
                    onKeyDown={(event) => {
                      const charCode = event.which ? event.which : event.keyCode;
                      if (
                        (charCode < 48 || charCode > 57) &&
                        charCode !== 8 &&
                        charCode !== 46
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {errors.discount && <p className="text-red-500 text-sm">{errors.discount}</p>}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleApplyDiscount}
                    className="px-4 py-1 text-base font-bold duration-300 border-2 border-solid rounded-full w-fit border-primary text-primary hover:bg-purple-500 hover:text-white"
                  >
                    {t("apply")}
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-3xl font-bold">
                <div>{t("total")}</div>
                <div className="text-primary">{totalOrder + shippingFee}đ</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              isLoading={loadingPaying}
              disabled={loadingPaying}
              onClick={() => !loadingPaying && handleSubmit()}
              className="hover:text-white transition-all hover:bg-primary mt-10 text-[30px] px-4 py-1 rounded-2xl border-primary border-2 text-primary"
            >
              {t("place_order")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentPage;