import useAuth from '../hooks/useAuth'

const UserAndInstructor = () => {
    const { auth } = useAuth();
    return new Set(auth?.roles).size === 2 && new Set(auth?.roles.concat([parseInt(import.meta.env.VITE_USER_CODE), parseInt(import.meta.env.VITE_INSTRUCTOR_CODE)])).size === 2;
}

const UserOnly = () => {
    const { auth } = useAuth();
    return new Set(auth?.roles).size === 1 && new Set(auth?.roles.concat([parseInt(import.meta.env.VITE_USER_CODE)])).size === 1;
}

export {
    UserAndInstructor, UserOnly
}