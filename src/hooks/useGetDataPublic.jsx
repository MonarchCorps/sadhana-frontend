import { useState, useEffect } from 'react';
import axios from '../api/axios'

function useGetDataPublic(dataUrl) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async (url) => {

            setIsLoading(true)

            try {
                const response = await axios.get(url, {
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
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }

        }

        fetchData(dataUrl);
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [dataUrl]);

    return {
        data, isLoading
    }
}

export default useGetDataPublic