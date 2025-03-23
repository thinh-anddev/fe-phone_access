const apiProduct = import.meta.env.VITE_API_END_POINT + "/products";

export const getAllProduct =
  async (): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<any> => {
    try {
      const res = await fetch(`${apiProduct}/getAll`);
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
export const getProductsByCategory = async (
  category: string
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> => {
  try {
    const res = await fetch(`${apiProduct}/getByCategory?category=${category}`);
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const sortProducts = async (
  category: string,
  page: number,
  limit: string,
  order: string,
  orderBy: string
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> => {
  try {
    const res = await fetch(
      `${apiProduct}/getByFilter?category=${category}&page=${page}&limit=${limit}&order=${order}&orderBy=${orderBy}`
    );
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
