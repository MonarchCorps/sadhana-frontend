import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from './useAxiosPrivate'

function useGetDataPrivate(dataUrl) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [dataErrMsg, setDataErrMsg] = useState('');

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async (url) => {

            setIsLoading(true)

            try {
                const response = await axiosPrivate.get(url, {
                    signal: controller.signal
                });
                if (isMounted) {
                    setData(response.data.data)
                }
            } catch (error) {
                if (error.name === 'CanceledError') {
                    console.log('Request was cancelled:', error.message)
                } else {
                    setData([]);
                    console.error(error, 'error msg');
                    // navigate('/auth', {
                    //     state: { from: location },
                    //     replace: true
                    // });
                }
                setDataErrMsg(error?.response?.data?.message)
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }

        }

        setDataErrMsg('')

        fetchData(dataUrl);
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, dataUrl]);

    return {
        data, isLoading, dataErrMsg
    }
}

export default useGetDataPrivate