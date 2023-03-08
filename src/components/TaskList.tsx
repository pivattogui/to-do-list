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
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <TaskItem task={task} />
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}