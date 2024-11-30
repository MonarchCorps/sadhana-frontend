import useAuth from '@/hooks/useAuth';
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { randomID } from '../lib/utils';

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

function VideoCall() {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    let myMeeting = async (element) => {

        const response = await axiosPrivate.get(`/chat/token/${auth?._id}`)
        const { token, appID } = response.data
        const username = auth?.username
        console.log(token, 'tokens')

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, auth?._id, username)

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });

    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    )
}

export default VideoCall