import { useState, useEffect } from 'react';

const useImageLoader = (imageUrl) => {
    const [status, setStatus] = useState('loading');
    const [img, setImg] = useState(null);

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;

        const onLoad = () => {
            setStatus('loaded');
            setImg(image);
        };

        const onError = () => {
            setStatus('error');
        };

        image.addEventListener('load', onLoad);
        image.addEventListener('error', onError);

        return () => {
            image.removeEventListener('load', onLoad);
            image.removeEventListener('error', onError);
        };
    }, [imageUrl]);

    return [img, status];
};

export default useImageLoader;
