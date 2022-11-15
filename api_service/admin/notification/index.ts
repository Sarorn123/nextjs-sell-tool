import { service } from '../../axios';
export const addNotification = async (data: any) => {
  try {
    const res = await service.post("/notification/", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const get10Notification = async () => {
  try {
    const res = await service.get("/notification/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateNotification = async (id: number) => {
  try {
    const res = await service.put("/notification/"+id);
    return res;
  } catch (error) {
    console.log(error);
  }
};
