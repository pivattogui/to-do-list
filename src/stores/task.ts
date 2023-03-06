import { create } from 'zustand'
import { TaskCreate, TaskMinifield } from '../types/task'
import { createTask, getTasks } from '../services/TaskService'
import produce from 'immer'

export type TaskState = {
    tasks: TaskMinifield[]
    selectedTask: TaskMinifield | null
    loading: boolean

    getTasks: () => Promise<void>
    createTask: (payload: TaskCreate) => Promise<void>
    clearSelectedTask: () => void
    selectTask: (id: string) => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    selectedTask: null,
    loading: false,

    getTasks: async () => {
        set({ loading: true })

        const tasks = await getTasks()
        set(produce((state) => {
            state.tasks = tasks
            state.loading = false
        }))
    },
    createTask: async (payload) => {
        const task = await createTask(payload)
        set({ tasks: [...get().tasks, task] })
    },
    clearSelectedTask: () => {
        set({ selectedTask: null })
    },
    selectTask: (id) => {
        set({ selectedTask: get().tasks.find((task) => task.id === id) })
    }
}))
