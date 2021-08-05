import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import { supabase } from '../api'

const initialState = { title: '', date: '' }

function CreateTask() {
    const [Task, setTask] = useState(initialState)
    const { title, date } = Task
    const router = useRouter()
    function onChange(e) {
        setTask(() => ({ ...Task, [e.target.name]: e.target.value }))
    }
    async function createNewTask() {
        if (!title || !date) return
        console.log('title', title);
        // const task = supabase.auth.user()
        const id = uuid()
        Task.id = id
        const { data, error } = await supabase
            .from('todo')
            .insert([
                { title, date, id }
            ])
        console.log('data', data);    
        router.push(`/`)
    }
    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new Task</h1>
            <input
                onChange={onChange}
                name="title"
                placeholder="Title"
                value={Task.title}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            />
            <input
                onChange={onChange}
                type="date"
                name="date"
                placeholder="DD/MM/YYYY"
                value={Task.date}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            />
            <button
                type="button"
                className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
                onClick={createNewTask}
            >Create Task</button>
        </div>
    )
}

export default CreateTask