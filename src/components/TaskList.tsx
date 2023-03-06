import { useEffect, useState } from "react"
import { TaskMinifield, TaskStatus } from "../types/task"
import TaskListSkeleton from "./TaskListSkeleton"
import { formatDate } from "../helpers/commum"
import { useTaskStore } from "../stores/task"
import { shallow } from "zustand/shallow";


export default function TaskList() {
    const { loading, tasks, selectTask } = useTaskStore((state) => ({
        loading: state.loading,
        tasks: state.tasks,
        selectTask: state.selectTask,
    }), shallow)

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
        <div>
            {loading ?
                <TaskListSkeleton />
                :
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li key={task.id} className="cursor-pointer" onClick={() => selectTask(task.id)}>
                                <div className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="min-w-0 flex-1 flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center" >
                                                <i className="fas fa-done text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">{task.title}</p>
                                                    <p className="mt-1 flex items-center text-sm text-gray-500">
                                                        <i className="fas fa-file-alt mr-2" />
                                                        <span className="truncate">{task.content}</span>
                                                    </p>
                                                </div>
                                                <div className="hidden md:block">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Criado: {formatDate(task.created_at.toString())}
                                                        </p>
                                                        <p className="mt-2 flex items-center">
                                                            {renderStatus(task.status)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <i className='fas fa-chevron-right' />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}