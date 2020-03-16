import playwebrtc from './playwebrtc'


window.triggerVideoPlay = () => {
  playwebrtc('webrtc://tencentplay.labpano.com/live/001',
    document.getElementById('video'),
    document.getElementById('pano'))
    
  document.getElementById('video').play()
  document.getElementById('play').style.display = "none"
}
