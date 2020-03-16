
import { VideoPanorama, Viewer } from 'panolens'
import pullStream from './tx'

export default async (webrtcUrl, videoElement, container) => {
  const panorama = new VideoPanorama('', {
    autoplay: true,
    videoElement,
    muted: false
  })
  panorama.setVideoCurrentTime = () => { }
  const viewer = new Viewer({ container, controlBar: false });
  viewer.add(panorama);

  pullStream(webrtcUrl, videoElement)
}
