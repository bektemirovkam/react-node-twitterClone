import { LoadingStatus } from "../../../types";
import { IUser } from './../../user/contracts/state';



export interface AuthorsState {
    authors: IUser[],
    loadingStatus: LoadingStatus
}