import { useRouter } from 'next/router'
import { supabase } from '../../api'

export default function Task({ task }) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1 className="text-5xl mt-4 font-semibold tracking-wide">{task.title}</h1>
            <div className="mt-8">
                {task.date}
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const { data, error } = await supabase
        .from('todo')
        .select('id')
    const paths = data.map(task => ({ params: { id: JSON.stringify(task.id) }}))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps ({ params }) {
    const { id } = params
    const { data } = await supabase
    .from('todo')
    .select()
    .filter('id', 'eq', id)
    .single()
    return {
        props: {
            task: data
        }
    }
}