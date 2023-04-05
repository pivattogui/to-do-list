import { shallow } from "zustand/shallow"
import { useTaskStore } from "../stores/task"
import { useState } from "react"
import { toast } from "react-toastify"
import { toastPromiseUpdate } from "../helpers/toastPromise"
import Button from "./Button"
import { PriorityOptionsMenu } from "./PriorityOptionsMenu"
import { TaskPriority } from "../types/task"

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
    const [priority, setPriority] = useState<TaskPriority>(selectedTask?.priority || 'MEDIUM')


    const handleSaveTask = () => {
        if (loading) return toast.error('Tarefa já está sendo criada!')

        if (!title || !content || !priority) return toast.error('Preencha todos os campos!')

        setLoading(true)
        return selectedTask ? handleUpdateTask() : handleCreateTask()
    }

    const handleCreateTask = () => {
        const toastId = toast.loading('Criando tarefa...')

        createTask({ title, content, priority }).then(() => {
            toast.update(toastId, toastPromiseUpdate('success', 'Tarefa criada com sucesso!'))
            setShowTask(false)
            setLoading(false)
        })
    }

    const handleUpdateTask = () => {
        if (title === selectedTask.title && content === selectedTask.content && priority === selectedTask.priority) {
            setLoading(false)
            return toast.error('Não há alterações para serem salvas!')
        }

        const toastId = toast.loading('Atualizando tarefa...')

        updateTask(selectedTask.id, { title, content, priority }).then(() => {
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

            <div className="relative mt-4 px-4 h-full sm:flex sm:flex-col sm:justify-center pb-3">
                <div className="border-gray-200 rounded-lg shadow-sm overflow-hidden border ring-0 focus-within:ring-0 focus-within:ring-gray-200">
                    <div className="flex items-center justify-between">
                        <input
                            placeholder="Título"
                            className="focus:outline-none text-2xl focus:border-0 block sm:w-[80%] w-full px-4 py-2 font-bold transition-colors text-gray-800 placeholder-gray-500 bg-white"
                            value={title}
                            onChange={(e) => setTitle(e?.target?.value)}
                        />
                        <div className="hidden sm:block">
                            <PriorityOptionsMenu
                                priority={priority}
                                setPriority={setPriority}
                            />
                        </div>
                        <div className="hidden sm:block flex-shrink-0 p-2">
                            <Button
                                action={handleSaveTask}
                                text="Salvar"
                            />
                        </div>
                    </div>
                    <div className="border-b"></div>
                    <textarea
                        placeholder="Escreva aqui a descrição da sua tarefa..."
                        rows={23}
                        className="focus:outline-none focus:border-0 resize-none block w-full px-4 py-2 text-gray-700 transition-colors text-sm placeholder-gray-500 bg-white"
                        value={content}
                        onChange={(e) => setContent(e?.target?.value)}
                    />
                    <div className="border-t px-3"></div>

                    <div className="py-2 flex justify-between items-center px-3 sm:hidden">
                        <PriorityOptionsMenu
                            priority={priority}
                            setPriority={setPriority}
                        />
                        <Button
                            action={handleSaveTask}
                            text="Salvar"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}