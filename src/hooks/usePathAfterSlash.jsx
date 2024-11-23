import { useLocation } from 'react-router-dom'

function usePathAfterSlash() {

    const location = useLocation();
    const pathAfterSlash = location.pathname.split('/').slice(-1)[0]
    // const pathAfterSlash = location.pathname.split('/').pop() // pop returns the last value in the array

    return pathAfterSlash;

}

export default usePathAfterSlash