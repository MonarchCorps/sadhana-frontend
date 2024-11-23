import { useEffect } from 'react'

function useHandleClickOutside(isOpen, setIsOpen, dropDownRef) {

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target) && e.target.id !== 'openButton') {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, dropDownRef, setIsOpen]);

}

export default useHandleClickOutside