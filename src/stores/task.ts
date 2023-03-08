import { create } from 'zustand'
import { TaskMinifield, TaskPayload, TaskStatus } from '../types/task'
import { changeStatusTask, createTask, deleteTask, getTasks, updateTask } from '../services/TaskService'
import produce from 'immer'

export type TaskState = {
    tasks: TaskMinifield[]
    selectedTask: TaskMinifield | null
    showTask: boolean
    loading: boolean


    getTasks: () => Promise<void>
    setShowTask: (show: boolean) => void
    updateTask: (id: string, payload: TaskPayload) => Promise<void>
    setTaskTitle: (id: string, title: string) => void
    setTaskContent: (id: string, content: string) => void
    createTask: (payload: TaskPayload) => Promise<void>
    clearSelectedTask: () => void
    selectTask: (id: string) => void
    removeTask: (id: string) => Promise<void>
    changeStatusTask: (id: string, status: TaskStatus) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],
    selectedTask: null,
    loading: false,
    showTask: false,

    getTasks: async () => {
        set({ loading: true })

        const tasks = await getTasks()
        set(produce((state) => {
            state.tasks = tasks
            state.loading = false
        }))
    },
    setShowTask(show) {
        set({ showTask: show })
    },
    updateTask: async (id, payload) => {
        await updateTask(id, payload)

        set(produce((state) => {
            const task = state.tasks.find((task) => task.id === id)

            if (!task) return

            task.title = payload.title
            task.content = payload.content
        }))
    },
    setTaskTitle: (id, title) => {
        set(produce((state) => {
            const task = state.tasks.find((task) => task.id === id)

            if (!task) return

            task.title = title
        }))
    },
    setTaskContent: (id, content) => {
        set(produce((state) => {
            const task = state.tasks.find((task) => task.id === id)

            if (!task) return

            task.content = content
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
    },
    removeTask: async (id) => {
        await deleteTask(id)
        set({ tasks: get().tasks.filter((task) => task.id !== id) })
    },
    changeStatusTask: async (id, status) => {
        await changeStatusTask(id, status)
        set(produce((state) => {
            const task = state.tasks.find((task) => task.id === id)

            if (!task) return

            task.status = status
        }))
    }
}))
