import { shallow } from "zustand/shallow"
import { useTaskStore } from "../stores/task"
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false
});

export function TaskEditor() {
    const { tasks, selectedTask, clearSelectedTask, getTasks } = useTaskStore((state) => ({
        tasks: state.tasks,
        selectedTask: state.selectedTask,
        clearSelectedTask: state.clearSelectedTask,
        getTasks: state.getTasks
    }), shallow)

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white py-6 px-4 shadow sm:rounded-xl sm:px-7 mt-6 max-w-6xl w-full max-h-[87vh]">
                <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer" onClick={clearSelectedTask}>
                        <i className="fas fa-chevron-left text-gray-600" />
                    </div>
                    <span className="ml-2 font-semibold text-gray-500">Voltar</span>
                </div>
                <div className="mt-4">
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => <ReactMarkdown children={text} />}
                    />
                </div>
            </div>
        </div>
    )
}