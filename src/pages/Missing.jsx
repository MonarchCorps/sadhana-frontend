import useTitle from '../hooks/useTitle'
import { Link } from 'react-router-dom'

function Missing() {

    useTitle('404 | Not Found 🤖');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4 text-center">
            <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">404 Not Found</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                    Oops! The page you are looking for does not exist.
                </p>
            </div>
            <Link
                to="/"
                className="inline-flex h-10 items-center rounded-md border border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            >
                Go Back
            </Link>
        </div>
    )
}

export default Missing