import { useEffect, useState } from "react"
import { TaskMinifield } from "../types/task"
import { getTasks } from "../services/TaskService"
import TaskListSkeleton from "./TaskListSkeleton"

export default function TaskList() {
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState<TaskMinifield[]>([])

    useEffect(() => {
        if (tasks.length) return

        getTasks().then((tasks) => {
            setTasks(tasks)
            setLoading(false)
        })
    }, [tasks])

    return (
        <div>
            {loading ?
                <TaskListSkeleton />
                :
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <div className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="min-w-0 flex-1 flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center" >
                                                <i className="fas fa-done text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">{task.title}</p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                                        <i className="fas fa-envelope mr-2" />
                                                        <span className="truncate">{task.content}</span>
                                                    </p>
                                                </div>
                                                <div className="hidden md:block">
                                                    <div>
                                                        <p className="text-sm text-gray-900">
                                                            Applied on ????
                                                        </p>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                            <div className="h-15 w-15 rounded-full bg-gray-500 flex items-center justify-center" >
                                                                <i className="fas fa-done text-white" />
                                                            </div>
                                                            <span className="ml-2 truncate">????</span>
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