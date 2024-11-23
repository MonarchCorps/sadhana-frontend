import noImage1 from '../assets/images/noImages/photo-1505330622279-bf7d7fc918f4.avif'
import noImage2 from '../assets/images/noImages/photo-1576158114254-3ba81558b87d.avif'
import noImage3 from '../assets/images/noImages/photo-1627507055227-dd9c87118eb3.avif'
import noImage4 from '../assets/images/noImages/photo-1628155930542-3c7a64e2c833.avif'
import noImage5 from '../assets/images/noImages/photo-1633675254386-dc5bb4279d56.avif'
import noImage6 from '../assets/images/noImages/photo-1633783714421-332b7f929148.avif'
import noImage7 from '../assets/images/noImages/premium_photo-1697945800806-e5d8fe424928.avif'

function randomNoBgImage() {

    const arrayOfNoImage = [noImage2, noImage3, noImage1, noImage4, noImage5, noImage6, noImage7]
    const randomNumber = Math.floor(Math.random() * 7)

    return {
        arrayOfNoImage,
        randomNumber
    }
}

export default randomNoBgImage