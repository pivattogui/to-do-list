import { shallow } from "zustand/shallow"
import { useTaskStore } from "../stores/task"
import Tiptap from "./TipTap"
import { useState } from "react"
import { toast } from "react-toastify"
import { toastPromiseUpdate } from "../helpers/toastPromise"

export function TaskEditor() {
    const { selectedTask, clearSelectedTask, updateTask, setShowTask, createTask } = useTaskStore((state) => ({
        selectedTask: state.selectedTask,
        clearSelectedTask: state.clearSelectedTask,
        updateTask: state.updateTask,
        setShowTask: state.setShowTask,
        createTask: state.createTask
    }), shallow)
    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(selectedTask?.title || '')
    const [content, setContent] = useState<string>(selectedTask?.content || '')


    const handleSaveTask = () => {
        if(loading) return toast.error('Tarefa já está sendo criada!')
        setLoading(true)

        return selectedTask ? handleUpdateTask() : handleCreateTask()
    }

    const handleCreateTask = () => {
        if (!title || !content) return toast.error('Preencha todos os campos!')
        
        const toastId = toast.loading('Criando tarefa...')

        createTask({ title, content }).then(() => {
            toast.update(toastId, toastPromiseUpdate('success', 'Tarefa criada com sucesso!'))
            setLoading(false)
        })
    }

    const handleUpdateTask = () => {
        if (!title || !content) return toast.error('Preencha todos os campos!')

        if(title === selectedTask.title && content === selectedTask.content) return toast.error('Não há alterações para serem salvas!')

        const toastId = toast.loading('Atualizando tarefa...')

        updateTask(selectedTask.id, { title, content }).then(() => {
            toast.update(toastId, toastPromiseUpdate('success', 'Tarefa atualizada com sucesso!'))
            setLoading(false)
        })
    }

    const closeTask = () => {
        clearSelectedTask()
        setShowTask(false)
    }


    return (
        <div className="flex items-center justify-center">
            <div className="bg-white py-6 px-4 shadow sm:rounded-xl sm:px-7 mt-6 max-w-6xl w-full max-h-[87vh]">
                <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer" onClick={closeTask}>
                        <i className="fas fa-chevron-left text-gray-600" />
                    </div>
                    <span className="ml-2 font-semibold text-gray-500">Voltar</span>
                </div>
                <div className="mt-4">
                    <Tiptap setTitle={setTitle} title={title} setContent={setContent} content={content} saveTask={handleSaveTask} />
                </div>
            </div>
        </div>
    )
}