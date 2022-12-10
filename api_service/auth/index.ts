import { service } from "../axios";

export const register = async (data: any) => {
    try {
        const res = await service.post("/auth/signUp", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res;
    } catch (error: any) {
        return error.response.data.message;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const res = await service.post("/auth/login", { email, password });
        return res;
    } catch (error: any) {
        return error?.response?.data?.message;
    }
}

export const logOut = async () => {
    try {
        const res = await service.post("/auth/logOut",);
        return res;
    } catch (error: any) {
        return error.response.data.message;
    }
}

export const checkAuthentication = async (cookie: any) => {
    try {
        const res = await service.post("/auth/getUserByToken", {}, {
            headers: {
                cookie: cookie
            }
        });
        return res;
    } catch (error) {
        console.log("error", error);
    }
}

export const getSingleUser = async (id: any) => {
    try {
        const res = await service.get("/user/" + id, {
            headers: {
                id: id
            }
        });
        return res.data;
    } catch (error) {
        console.log("error", error);
    }
}

export const editUser = async (id: string, data: any) => {
    try {
        const res = await service.patch("/user/" + id, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res;
    } catch (error: any) {
        return error;
    }
}