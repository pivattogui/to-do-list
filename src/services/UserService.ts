import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { RegisterUser } from "../types/register";

export const registerUser = async (payload: RegisterUser): Promise<void> => {
    await api.post<void>(apiUrls.register, payload);
}