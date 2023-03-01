import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { UserCreate } from "../types/user";

export const createUser = async (payload: UserCreate): Promise<void> => {
    await api.post<void>(apiUrls.user, payload);
}