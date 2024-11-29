/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs'
import { IKImage } from 'imagekitio-react'
import useImageLoader from '@/hooks/useImageLoader'

let model

const loadModel = async () => {
    if (!model) {
        model = await cocoSsd.load()
        console.log('Model loaded')
    }
    return model
}

const ThumbnailAdjuster = ({ imageUrl, imageHeight, alt }) => {
    const [objectFit, setObjectFit] = useState('cover')
    const [objectPosition, setObjectPosition] = useState('center')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const imgRef = useRef()

    const [img, imgStatus] = useImageLoader(imageUrl)

    // Use IntersectionObserver to delay detection until the image is in view
    const { ref: viewRef, inView } = useInView({
        triggerOnce: true, // Run detection only once when the image is in view
    })

    useEffect(() => {
        const adjustThumbnail = async () => {
            if (!img || imgStatus !== 'loaded') return // Wait for image to fully load

            try {
                const model = await loadModel()
                const predictions = await model.detect(imgRef.current)
                console.log(predictions)

                if (predictions.length > 0) {
                    const largestObject = predictions.reduce((prev, current) =>
                        prev.bbox[2] * prev.bbox[3] > current.bbox[2] * current.bbox[3] ? prev : current
                    )

                    const [x, y, width, height] = largestObject.bbox
                    const imgWidth = imgRef.current.width
                    const imgHeight = imgRef.current.height

                    // Adjust `object-fit`
                    if (width > imgWidth * 0.8 && height > imgHeight * 0.8) {
                        setObjectFit('contain')
                    } else if (width > height) {
                        setObjectFit('cover')
                    } else {
                        setObjectFit('scale-down')
                    }

                    // Adjust `object-position`
                    const horizontalPosition = x / imgWidth
                    const verticalPosition = y / imgHeight

                    let positionX = 'center'
                    let positionY = 'center'

                    if (horizontalPosition < 0.3) {
                        positionX = 'left'
                    } else if (horizontalPosition > 0.7) {
                        positionX = 'right'
                    }

                    if (verticalPosition < 0.3) {
                        positionY = 'top'
                    } else if (verticalPosition > 0.7) {
                        positionY = 'bottom'
                    }

                    setObjectPosition(`${positionY} ${positionX}`)
                } else {
                    setObjectFit('cover')
                    setObjectPosition('center')
                }

                setLoading(false)
            } catch (err) {
                console.error('Error loading the model or detecting objects:', err)
                setError('Could not adjust the thumbnail')
                setLoading(false)
            }
        }

        if (inView && imgStatus === 'loaded') {
            adjustThumbnail() // Trigger detection when image is loaded and in view
        }
    }, [inView, imgStatus, imageUrl, img])

    return (
        <div ref={viewRef} style={{ width: '100%', height: 'auto', position: 'relative' }}>
            {
                imageUrl?.startsWith('/yoga-master') ? (
                    <IKImage
                        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                        path={imageUrl}
                        className="size-full"
                        loading="lazy"
                        lqip={{
                            active: true,
                            quality: 20
                        }}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: imageHeight,
                            objectFit: objectFit,
                            objectPosition: objectPosition,
                        }}
                    />
                ) : (
                    <img
                        ref={imgRef}
                        src={imageUrl}
                        alt={alt}
                        style={{
                            width: '100%',
                            height: imageHeight,
                            objectFit: 'cover',
                            objectPosition: objectPosition,
                        }}
                        className='size-full'
                    />
                )
            }
        </div>
    )
}

export default ThumbnailAdjuster
