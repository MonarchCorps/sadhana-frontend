import { useContext } from 'react'
import ScrollTopContext from '../context/ScrollTopProvider'

const useScrollTop = () => {
    return useContext(ScrollTopContext)
}

export default useScrollTop