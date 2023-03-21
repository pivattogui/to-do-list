import TaskListSkeleton from "./TaskListSkeleton"
import { useTaskStore } from "../stores/task"
import { shallow } from "zustand/shallow";
import TaskItem from "./TaskItem";

export default function TaskList() {
    const { loading, tasks } = useTaskStore((state) => ({
        loading: state.loading,
        tasks: state.tasks,
    }), shallow)

    return (
        <div>
            {loading ?
                <TaskListSkeleton />
                :
                tasks.length ?
                    <div className="sm:bg-white overflow-hidden rounded-md">
                        <ul role="list" className="sm:divide-y sm:divide-gray-200">
                            {tasks.map((task) => (
                                <TaskItem task={task} />
                            ))}
                        </ul>
                    </div>
                    :
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-800">
                                Nenhuma tarefa encontrada
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Clique no botão "Nova tarefa" para adicionar uma nova tarefa.
                            </p>
                        </div>
                    </div>
            }
        </div>
    )
}