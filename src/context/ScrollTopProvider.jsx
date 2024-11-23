/* eslint-disable react/prop-types */
import { createContext } from 'react'

const ScrollTopContext = createContext();

export const ScrollTopProvider = ({ children }) => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    return (
        <ScrollTopContext.Provider value={{
            scrollTop
        }}>
            {children}
        </ScrollTopContext.Provider>
    )

}

export default ScrollTopContext