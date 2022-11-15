import { AxiosError } from "axios";
import { service } from "../../axios";

export const getCategory = async () => {
  try {
    const res = await service.get("/product/getAllCategory");
    return res.data;
  } catch (error) {}
};

export const getProduct = async (params: any) => {
  const res = await service.get("/product", {
    params,
  });
  return res.data;
};

export const getSingleProduct = async (id: any) => {
  try {
    const res = await service.get("/product/" + id);
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addProduct = async (data: any) => {
  try {
    const res = await service.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    return error.response.data;
  }
};

export const editProduct = async (data: any, id: any) => {
  try {
    const res = await service.put("/product/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await service.delete("/product/" + id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
