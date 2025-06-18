const apiAddress = import.meta.env.VITE_API_GHN_DEV + "/master-data";
const token = import.meta.env.VITE_API_GHN_TOKEN;
export const getListProvince =
  async (): // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise<any> => {
    try {
      const res = await fetch(`${apiAddress}/province`, {
        method: "GET",
        headers: {
          Token: token,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
export const getListDistrict = async (
  provinceId: number
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<any> => {
  if (provinceId == 0) return;
  try {
    const res = await fetch(
      `${apiAddress}/district?province_id=${provinceId}`,
      {
        method: "GET",
        headers: {
          Token: token,
        },
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getListWard = async (
  districtId: number
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<any> => {
  if (districtId == 0) return;

  try {
    const res = await fetch(`${apiAddress}/ward?district_id=${districtId}`, {
      method: "GET",
      headers: {
        Token: token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
