import playwebrtc from './playwebrtc'

playwebrtc('webrtc://tencentplay.labpano.com/live/001',
  document.getElementById('video'),
  document.getElementById('pano'))

window.triggerVideoPlay = () => {
  document.getElementById('video').play()
  document.getElementById('play').style.display = "none"
}
