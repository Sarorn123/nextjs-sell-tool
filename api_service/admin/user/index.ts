import { service } from "../../axios";

export const getAllusers = async (params: any) => {
  const res = await service.get("/user", {
    params
  });
  return res.data;
};

export const getSingleUser = async (id: any) => {
  try {
      const res = await service.get("/user/" + id);
      return res.data;
  } catch (error) {
      console.log("error", error);
  }
}

export const chargeMoney = async (data: any) => {
  try {
      const res = await service.post("/user/chargeMoney", data);
      return res;
  } catch (error) {
      console.log("error", error);
  }
}