import playwebrtc from './playwebrtc'

let cb = playwebrtc('webrtc://tencentplay.labpano.com/live/001',
  document.getElementById('video'),
  document.getElementById('pano'))

window.triggerVideoPlay = () => {
  cb()
  document.getElementById('video').play()
  document.getElementById('play').style.display = "none"
}
