import useTitle from '../hooks/useTitle'
import { Link } from 'react-router-dom'

function Unauthorized() {

    useTitle('Unauthorized');

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Unauthorized Access</h1>
                <p className="mt-4 text-muted-foreground">
                    You don&apos;t have permission to view this page. Please go back!
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized