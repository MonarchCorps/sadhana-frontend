/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
} from 'react-share'

const PageSocialMediaShare = ({ url, title }) => {

    const handleRedirect = (shareAction) => {

        const userConfirmed = window.confirm('Do you want to be redirected!');

        if (userConfirmed) {
            shareAction();
        }

    }

    return (
        <>
            <FacebookShareButton url={url} quote={title} beforeOnClick={(e) => new Promise((resolve, reject) => {
                handleRedirect(resolve)
            })} >
                <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={url} quote={title} beforeOnClick={(e) => new Promise((resolve, reject) => {
                handleRedirect(resolve)
            })} >
                <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton url={url} quote={title} beforeOnClick={(e) => new Promise((resolve, reject) => {
                handleRedirect(resolve)
            })} >
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={url} quote={title} beforeOnClick={(e) => new Promise((resolve, reject) => {
                handleRedirect(resolve)
            })} >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>

        </>
    )
}

const CustomSocialMediaShare = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title);

    return (
        <div>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target='_blank'
                rel='noopener noreferrer'
            >
                F
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target='_blank'
                rel='noopener noreferrer'
            >
                T
            </a>
            <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                target='_blank'
                rel='noopener noreferrer'
            >
                L
            </a>
            <a
                href="https://api.whatsapp.com/send?text=YourMessageURL"
                target="_blank"
                rel="noopener noreferrer"
            >
                W
            </a>
        </div>
    )

}

export {
    PageSocialMediaShare,
    CustomSocialMediaShare
}