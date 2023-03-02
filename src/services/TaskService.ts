import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { TaskCreate, TaskMinifield } from "../types/task";

export const getTasks = async (): Promise<TaskMinifield[]> => {
    const response = await api.get<TaskMinifield[]>(apiUrls.task);
    return response.data;
}

export const createTask = async (payload: TaskCreate): Promise<TaskMinifield> => {
    const response = await api.post<TaskMinifield>(apiUrls.task, payload);
    
    return response.data;
}