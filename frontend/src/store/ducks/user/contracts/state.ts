import { LoadingStatus } from "../../../types";

export interface IUser {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmed: boolean;
  confirmHash: string;
  location?: string;
  about?: string;
  website?: string;
  token?: string;
  createdAt: string;
  updatedAt: string;
}


export interface UserState {
  data: IUser | undefined;
  loadingStatus: LoadingStatus;
}
