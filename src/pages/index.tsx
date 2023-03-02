import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { TaskMinifield } from '../types/task'
import { createTask, getTasks } from '../services/TaskService'
import AddItemTabHeader from '../components/AddItemTabHeader'
import Modal from '../components/Modal'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { toast } from 'react-toastify'
import { toastPromiseUpdate } from '../helpers/toastPromise'
import TaskList from '../components/TaskList'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const saveTask = () => {
    const toastId = toast.loading('Criando tarefa...')

    createTask({ title, content }).then((task) => {

      setIsOpen(false)

      toast.update(toastId, toastPromiseUpdate('success', 'Tarefa criada com sucesso!'))
    })
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white py-6 px-4 shadow sm:rounded-xl sm:px-7 mt-6 max-w-6xl w-full max-h-[87vh]">
        <div className="">
          <AddItemTabHeader name='Tarefas' description='AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' action={() => setIsOpen(true)} addName='Tarefa' />

          <TaskList />
        </div>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col">
          <AddItemTabHeader name='Criar Tarefa' description='AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' />
          <div>
            <span className="block text-sm font-medium text-gray-700">
              Título
            </span>
            <TextInput setValue={setTitle} value={title} />
          </div>
          <div className='mb-2'>
            <span className="block text-sm font-medium text-gray-700">
              Conteúdo
            </span>
            <TextInput setValue={setContent} value={content} area rows={5} />
          </div>
          <Button text='Salvar' action={saveTask} />
        </div>
      </Modal>
    </div>
  )
}
