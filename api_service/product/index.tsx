import { service } from "../axios";

export const getProduct = async (params: any) => {
  try {
    const res = await service.get("/product", {
      params,
    });
    return res.data.data;
  } catch (error) {
    console.log(error)
  }
};

export const getSingleProduct = async (id: number) => {
  try {
    const res = await service.get("/product/" + id);
    return res.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const buyProduct = async (product_id: string, user_id: string) => {
  try {
    const res = await service.post("/buy", {
      user_id,
      product_id,
    });
    return res;
  } catch (error:any) {
    console.log(error);
    return error.response.data;
  }
};
