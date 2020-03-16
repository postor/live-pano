import playwebrtc from './playwebrtc'
let videoElement = document.getElementById('video')
let cb = playwebrtc('webrtc://tencentplay.labpano.com/live/001',
  videoElement,
  document.getElementById('pano'))

window.triggerVideoPlay = () => {
  cb()
  videoElement.volume = 1
  videoElement.muted = false
  videoElement.play()
  document.getElementById('play').style.display = "none"
}
