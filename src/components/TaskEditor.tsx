import { shallow } from "zustand/shallow"
import { useTaskStore } from "../stores/task"
import { useState } from "react"
import { toast } from "react-toastify"
import { toastPromiseUpdate } from "../helpers/toastPromise"
import Button from "./Button"

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
        if (loading) return toast.error('Tarefa já está sendo criada!')

        if (!title || !content) return toast.error('Preencha todos os campos!')

        setLoading(true)
        return selectedTask ? handleUpdateTask() : handleCreateTask()
    }

    const handleCreateTask = () => {
        const toastId = toast.loading('Criando tarefa...')

        createTask({ title, content }).then(() => {
            toast.update(toastId, toastPromiseUpdate('success', 'Tarefa criada com sucesso!'))
            setLoading(false)
        })
    }

    const handleUpdateTask = () => {
        if (title === selectedTask.title && content === selectedTask.content) {
            setLoading(false)
            return toast.error('Não há alterações para serem salvas!')
        }

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
        <div className="sm:bg-white sm:p-6 sm:shadow sm:rounded-xl max-w-6xl w-full">
            <div className="flex items-center w-full sm:px-0 px-4">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer" onClick={closeTask}>
                    <i className="fas fa-chevron-left text-gray-600" />
                </div>
                <span className="ml-2 font-semibold text-gray-500">Voltar</span>
            </div>

            <div className="relative mt-4 px-4 h-[70vh] sm:flex sm:flex-col sm:justify-center">
                <div className="border-gray-200 rounded-lg shadow-sm overflow-hidden border ring-0 focus-within:ring-0 focus-within:ring-gray-200">
                    <input
                        placeholder="Título"
                        className="focus:outline-none text-2xl focus:border-0 block w-full px-4 py-2 font-bold transition-colors text-gray-800 placeholder-gray-500 bg-white"
                        value={title}
                        onChange={(e) => setTitle(e?.target?.value)}
                    />
                    <div className="border-b"></div>
                    <textarea
                        placeholder="Descrição"
                        rows={18}
                        className="focus:outline-none focus:border-0 resize-none block w-full px-4 py-2 text-gray-700 transition-colors text-sm placeholder-gray-500 bg-white"
                        value={content}
                        onChange={(e) => setContent(e?.target?.value)}
                    />
                    <div className="border-t px-3"></div>

                    <div className="px-2 py-2 flex justify-end items-center space-x-3 sm:px-3">
                        <div className="flex-shrink-0">
                            <Button
                                action={handleSaveTask}
                                text="Salvar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}