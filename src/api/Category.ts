const apiAddress = import.meta.env.VITE_API_END_POINT + "/categories";

export const getAllCategories =
  async (): // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Promise<any> => {
    try {
      const res = await fetch(`${apiAddress}`);
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
