import { shallow } from "zustand/shallow";
import { useTaskStore } from "../stores/task";
import AddItemTabHeader from "./AddItemTabHeader";
import TaskList from "./TaskList";
import { TaskEditor } from "./TaskEditor";
import { useState } from "react";

export function Tasks() {
    const { showTask, setShowTask } = useTaskStore((state) => ({
        showTask: state.showTask,
        selectedTask: state.selectedTask,
        clearSelectedTask: state.clearSelectedTask,
        getTasks: state.getTasks,
        setShowTask: state.setShowTask
    }), shallow)


    return (
        <div className="flex items-center justify-center">
            {showTask ?
                <TaskEditor />
                :
                <div className="bg-white py-6 px-4 shadow sm:rounded-xl sm:px-7 mt-6 max-w-6xl w-full max-h-[87vh]">
                    <AddItemTabHeader name='Tarefas' description='Gerencie sua lista de tarefas' buttonName='Nova tarefa' action={() => setShowTask(true)} />
                    <TaskList />
                </div>
            }
        </div>
    )
}