import playwebrtc from './playwebrtc'

playwebrtc('webrtc://tencentplay.labpano.com/live/001',
  document.getElementById('video'),
  document.getElementById('pano'))
