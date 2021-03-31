import { axios } from "../../core/axios";
import { IUser } from "../../store/ducks/user/contracts/state";

interface ResponseApi {
  status: string;
  data: IUser[];
}


export const AuthorsApi = {
  fetchAuthors: async (): Promise<ResponseApi['data']> => {
    const { data } = await axios.get<ResponseApi>("/authors");
    return data.data;
  },
};
