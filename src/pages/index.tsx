import { shallow } from 'zustand/shallow'
import { Tasks } from '../components/Tasks'
import { useTaskStore } from '../stores/task'
import { useEffect } from 'react'
import { TaskEditor } from '../components/TaskEditor'

export default function Home() {
  const { tasks, selectedTask, clearSelectedTask, getTasks } = useTaskStore((state) => ({
    tasks: state.tasks,
    selectedTask: state.selectedTask,
    clearSelectedTask: state.clearSelectedTask,
    getTasks: state.getTasks
  }), shallow)

  useEffect(() => {
    getTasks()
  }, [])

  return (
      <Tasks />
  )
}
