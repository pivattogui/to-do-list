import { shallow } from "zustand/shallow";
import { useTaskStore } from "../stores/task";
import AddItemTabHeader from "./AddItemTabHeader";
import TaskList from "./TaskList";
import { TaskEditor } from "./TaskEditor";

export function Tasks() {
    const { showTask, setShowTask } = useTaskStore((state) => ({
        showTask: state.showTask,
        selectedTask: state.selectedTask,
        clearSelectedTask: state.clearSelectedTask,
        getTasks: state.getTasks,
        setShowTask: state.setShowTask
    }), shallow)


    return (
        <div className={`flex items-center justify-center ${showTask ? "sm:px-4": "px-4"}`}>
            {showTask ?
                <TaskEditor />
                :
                <div className="sm:bg-white sm:p-6 sm:shadow sm:rounded-xl max-w-6xl w-full">
                    <div className="hidden sm:block">
                        <AddItemTabHeader name='Tarefas' description='Gerencie sua lista de tarefas' buttonName='Nova tarefa' action={() => setShowTask(true)} />
                    </div>
                    <div className="overflow-auto">
                        <TaskList />
                    </div>
                </div>
            }
        </div>
    )
}