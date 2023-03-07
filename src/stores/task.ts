import { create } from 'zustand'
import { TaskMinifield, TaskPayload } from '../types/task'
import { createTask, getTasks, updateTask } from '../services/TaskService'
import produce from 'immer'

export type TaskState = {
    tasks: TaskMinifield[]
    selectedTask: TaskMinifield | null
    loading: boolean

    getTasks: () => Promise<void>
    updateTask: (id: string, payload: TaskPayload) => Promise<void>
    setTaskTitle: (id: string, title: string) => void
    setTaskContent: (id: string, content: string) => void
    createTask: (payload: TaskPayload) => Promise<void>
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
    }
}))
