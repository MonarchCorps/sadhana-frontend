import useAuth from '../hooks/useAuth'

const AdminOnly = () => {
    const { auth } = useAuth();
    return new Set(auth?.roles).size === 3 && new Set(auth?.roles.concat([2001, 1984, 5150])).size === 3;
}

const UserAndInstructor = () => {
    const { auth } = useAuth();
    return new Set(auth?.roles).size === 2 && new Set(auth?.roles.concat([2001, 1984])).size === 2;
}

const UserOnly = () => {
    const { auth } = useAuth();
    return new Set(auth?.roles).size === 1 && new Set(auth?.roles.concat([2001])).size === 1;
}

export {
    UserAndInstructor, UserOnly, AdminOnly
}