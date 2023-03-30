import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { TaskPriority, TaskPriorityOptions } from '../types/task'
import Modal from './Modal'

const options: TaskPriorityOptions = [
    { name: 'Alta', type: "HIGH" },
    { name: 'Média', type: "MEDIUM" },
    { name: 'Baixa', type: "LOW" },
]

interface PriorityOptionsMenuProps {
    priority: TaskPriority
    setPriority: (priority: TaskPriority) => void
}

export function PriorityOptionsMenu({ priority, setPriority }: PriorityOptionsMenuProps) {
    const [openModal, setOpenModal] = useState(false)

    const PriorityIcon = (type: TaskPriority) => {
        switch (type) {
            case 'LOW':
                return (
                    <div className="flex relative justify-center items-center text-xs text-white w-[23px] h-[23px] bg-red-500 rounded">
                        <i className="absolute fas fa-chevron-down mt-0.5" />
                    </div>
                )
            case 'MEDIUM':
                return (
                    <div className="flex relative justify-center items-center text-xs text-white w-[23px] h-[23px] bg-yellow-500 rounded">
                        <i className="absolute fas fa-chevron-up" />
                    </div>
                )
            case 'HIGH':
                return (
                    <div className="flex relative justify-center items-center text-xs text-white w-[23px] h-[23px] bg-green-500 rounded">
                        <i className="absolute top-2 fas fa-chevron-up" />
                        <i className="absolute bottom-2 fas fa-chevron-up" />
                    </div>
                )
        }
    }

    return (
        <div>
            <Menu as="div" className="relative sm:inline-block text-left hidden">
                {({ open }) => (
                    <>
                        <Menu.Button className="flex w-full justify-center items-center hover:bg-gray-100 p-2 rounded-md text-sm text-gray-600 truncate">
                            <span className="font-medium">Prioridade {options.find(option => option.type == priority).name}</span>
                            {open ?
                                <i className="fas fa-chevron-up ml-2" />
                                :
                                <i className="fas fa-chevron-down ml-2" />
                            }
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 z-99 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {options.map((option) => (
                                    <Menu.Item>
                                        <div className={`flex cursor-pointer p-2 hover:bg-gray-200 rounded ${option.type == priority && "bg-gray-200"}`} onClick={() => setPriority(option.type)}>
                                            {PriorityIcon(option.type)}
                                            <span className="ml-2 text-sm text-gray-800 font-medium">{option.name}</span>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
            <div className="inline-block sm:hidden">
                <span className="font-medium text-gray-600 rounded-md bg-gray-100 p-2" onClick={() => setOpenModal(true)}>
                    Prioridade {options.find(option => option.type == priority).name}
                </span>
            </div>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Alterar prioridade
                </Dialog.Title>
                <div className="mt-2">
                    <div>
                        <span className="text-sm text-gray-500">
                            Selecione a prioridade da tarefa abaixo. A prioridade é usada para ordenar as tarefas na lista.
                        </span>
                        <div className=" mt-2 rounded border mx-2">
                            {options.map(option => (
                                <div className={`flex cursor-pointer p-2 hover:bg-gray-200 ${option.type == priority && "bg-gray-200"}`} onClick={() => {setPriority(option.type); setOpenModal(false)}}>
                                    {PriorityIcon(option.type)}
                                    <span className="ml-2 text-gray-800 font-medium">{option.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}