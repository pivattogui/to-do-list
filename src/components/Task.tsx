import { useState } from "react";
import AddItemTabHeader from "./AddItemTabHeader";
import Button from "./Button";
import Modal from "./Modal";
import TaskList from "./TaskList";
import TextInput from "./TextInput";
import { createTask } from "../services/TaskService";
import { toast } from "react-toastify";
import { toastPromiseUpdate } from "../helpers/toastPromise";

export function Task() {
    const [isOpen, setIsOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white py-6 px-4 shadow sm:rounded-xl sm:px-7 mt-6 max-w-6xl w-full max-h-[87vh]">
                <AddItemTabHeader name='Tarefas' description='Gerencie sua lista de tarefas' buttonName='Nova tarefa' action={()=>{}}/>
                <TaskList />
            </div>
        </div>
    )
}