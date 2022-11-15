import { service } from "../../axios";

export const getBuys = async (params: any) => {
    try {
        const res = await service.get("/buy", {
            params
        });
        return res.data;
    } catch (error) {
        console.log(error)
    }
};