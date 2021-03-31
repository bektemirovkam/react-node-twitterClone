import { axios } from "../../core/axios";
import { IUser } from "../../store/ducks/user/contracts/state";

interface ResponseApi {
  status: string;
  data: IUser | undefined;
}

export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface RegisterDataInterface {
  email: string;
  username: string;
  fullname: string;
  password: string;
  confirm: string;
}

export const AuthApi = {
  login: async (
    loginData: LoginDataInterface
  ): Promise<ResponseApi["data"]> => {
    const { data } = await axios.post<ResponseApi>("/auth/login", loginData);
    return data.data;
  },
  register: async (
    registerData: RegisterDataInterface
  ): Promise<ResponseApi["data"]> => {
    const { data } = await axios.post<ResponseApi>(
      "/auth/register",
      registerData
    );
    return data.data;
  },
  getMe: async (): Promise<ResponseApi["data"]> => {
    const { data } = await axios.get<ResponseApi>("/users/me");
    return data.data;
  },
};

//@ts-ignore
window.AuthApi = AuthApi;
