import { useState } from "react";
import { formatDate } from "../helpers/commum";
import { TaskMinifield, TaskStatus } from "../types/task";
import { shallow } from "zustand/shallow";
import { useTaskStore } from "../stores/task";
import { toast } from "react-toastify";
import { toastPromiseUpdate } from "../helpers/toastPromise";

export default function TaskItem({ task }: { task: TaskMinifield }) {
    const { selectTask, setShowTask, removeTask, changeStatusTask } = useTaskStore((state) => ({
        selectTask: state.selectTask,
        setShowTask: state.setShowTask,
        removeTask: state.removeTask,
        changeStatusTask: state.changeStatusTask,
    }), shallow)

    const [selected, setSelected] = useState<boolean>(false)


    const handleDelete = () => {
        const toastId = toast.loading('Deletando tarefa...')

        removeTask(task.id).then(() => {
            toast.update(toastId, toastPromiseUpdate('success', 'Tarefa removida com sucesso!'))
        })
    }

    const handleDone = (status: TaskStatus) => {
        const toastId = toast.loading('Concluindo tarefa...')

        changeStatusTask(task.id, status).then(() => {
            toast.update(toastId, toastPromiseUpdate('success', 'Tarefa concluída com sucesso!'))
        })
    }

    const TaskAction = () => {
        let icon = ''
        let theme = ''
        let action = () => { }

        switch (task.status) {
            case 'DONE':
                icon = 'fas fa-times'
                theme = 'text-red-400 border-red-400 hover:bg-red-400 hover:text-white hover:border-white'
                action = () => handleDelete()
                break
            case 'PENDING':
                icon = 'fas fa-check'
                theme = 'text-green-500 border-green-500 hover:bg-green-400 hover:text-white hover:border-white'
                action = () => handleDone('DONE')
                break
            default:
                break
        }

        return (
            <div className="flex items-center sm:px-4">
                <div className={`mx-4 h-8 w-8 border rounded-full flex justify-center items-center ${theme}`}
                    onClick={(e) => { e.stopPropagation(); action() }}>
                    <i className={`mt-0.5 ${icon}`} />
                </div>
                <i className='fas fa-chevron-right text-gray-500' />
            </div>
        )
    }


    const renderStatus = (status: TaskStatus) => {
        switch (status) {
            case "DONE":
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Concluída
                </span>
            case "PENDING":
                return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-700">
                    Em andamento
                </span>
        }
    }

    return (
        <li className="cursor-pointer mt-2 sm:mt-0 border sm:border-0 rounded-md shadow sm:shadow-none"
            onClick={() => { selectTask(task.id), setShowTask(true) }}
            onMouseLeave={() => setSelected(false)}
            onMouseEnter={() => setSelected(true)}
        >
            <div className="flex flex-col justify-between hover:bg-gray-50">
                <div className="flex items-center sm:p-0 p-4"> 
                    <div className={`relative ${selected ? 'w-14' : 'w-2'} transition-all bg-gray-500 sm:flex hidden items-center justify-center py-10 `} >
                        {selected ? <i className="absolute fas fa-sticky-note text-white" /> : <></>}
                    </div>
                    <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1 sm:px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600 truncate">{task.title}</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <i className="fas fa-file-alt mr-2" />
                                        <span className="truncate max-w-sm w-sm">{task.content}</span>
                                    </div>
                                </p>
                            </div>
                            <div className="hidden md:block md:px-8">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Criado: {formatDate(task.created_at?.toString())}
                                    </p>
                                    <p className="mt-2 flex items-center">
                                        {renderStatus(task.status)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TaskAction />
                </div>
                <div className="h-2 bg-gray-500 sm:hidden w-full rounded-b" />
            </div>
        </li>
    )
}