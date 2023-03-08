import apiUrls from "../constants/apiUrls";
import api from "../lib/api";
import { TaskPayload, TaskMinifield, TaskStatus } from "../types/task";

export const getTasks = async (): Promise<TaskMinifield[]> => {
    const response = await api.get<TaskMinifield[]>(apiUrls.task.base);
    return response.data;
}

export const createTask = async (payload: TaskPayload): Promise<TaskMinifield> => {
    const response = await api.post<TaskMinifield>(apiUrls.task.base, payload);

    return response.data;
}

export const updateTask = async (id: string, payload: TaskPayload): Promise<void> => {
    await api.post<void>(apiUrls.task.id(id), payload);
}

export const changeStatusTask = async (id: string, status: TaskStatus): Promise<void> => {
    await api.put<void>(apiUrls.task.id(id), { status });
}

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete<void>(apiUrls.task.id(id));
}