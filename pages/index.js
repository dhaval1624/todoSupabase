import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../api'

export default function Home() {
  const [task, setTask] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchTasks()
  }, [])
  async function fetchTasks() {
    let { data, error } = await supabase.from('todo').select('*')
    setTask(data)
    setLoading(false)
  }
  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!task.length) return <p className="text-2xl">No Tasks.</p>
  return (
      <div>
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Tasks</h1>
        {
          task.map(task => (
              <Link key={task.id} href={`/tasks/${task.id}`}>
                <div className="cursor-pointer border-b border-gray-300	mt-8 pb-4">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="text-gray-500 mt-2">{task.date}</p>
                </div>
              </Link>)
          )
        }
      </div>
  )
}