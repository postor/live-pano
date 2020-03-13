export default (streamurl, videoElement) => {

  // TXWebRTCAPI.pullStream("webrtc://domain/path/stream_id?txSecret=xxx&txTime=xxx");     //开始拉流
  // TXWebRTCAPI.stopStream("webrtc://domain/path/stream_id?txSecret=xxx&txTime=xxx");     //停止拉流
  // TXWebRTCAPI.on("onAddStream", onAddStream)                                             //通知新增加流
  // TXWebRTCAPI.on("onRemoveStream", onRemoveStream)                                       //通知删除流
  // TXWebRTCAPI.on("onEvent", onEvent)                                                     //事件通知

  //处理事件
  //增加流
  TXWebRTCAPI.on("onAddStream", onAddStream)
  //删除流
  TXWebRTCAPI.on("onRemoveStream", onRemoveStream)
  //事件通知
  TXWebRTCAPI.on("onEvent", onEvent)
  
  pullStream()

  function pullStream() {
    var video = videoElement
    TXWebRTCAPI.pullStream(streamurl, video.id);
    //alert("pullStream"+streamurl);
  }

  function stopStream() {
    //alert("stopStream"+streamurl);
    TXWebRTCAPI.stopStream(streamurl);
  }

  function refreshRemoveStream(e) {
    TXWebRTCAPI.off("onRemoveStream", refreshRemoveStream);
    TXWebRTCAPI.on("onRemoveStream", onRemoveStream);
    var video = document.getElementById(e.streamId);
    if (video) {
      TXWebRTCAPI.pullStream(streamurl, video.id);
    }
  };

  function refreshStream() {
    TXWebRTCAPI.off("onRemoveStream", onRemoveStream);
    TXWebRTCAPI.on("onRemoveStream", refreshRemoveStream);
    TXWebRTCAPI.stopStream(streamurl);

  }

  TXWebRTCAPI.setBizInfo({ userid: "webrtc_live_demo_user1" });


  function onAddStream(e) {
    console.log(`[client_demo]onAddStream, streamId:${e.streamId}`, e.stream);
    var video = videoElement

    video.srcObject = e.stream;
    //video.muted = true
    video.autoplay = true
    video.playsinline = true
    var playPromise = video.play();
    if (playPromise) {
      playPromise.then(() => {
        console.log(`play ok!`);
      }).catch(() => {
        console.log(`play failed!`);
      });
    }
  }

  function onRemoveStream(e) {
    console.log(`[client_demo]onRemoveStream, ${JSON.stringify(e)}, code: ${e.code}`);
    var videoNode = document.getElementById(e.streamId);
    if (videoNode) {
      document.getElementById(e.streamId).parentElement.removeChild(videoNode);
    } else {
      console.log(`[client_demo]onRemoveStream, streamId:${e.streamId} not exist`);
    }

  }

  function onEvent(e) {
    //if(e.type != "stream_quality")
    console.log(`[client_demo]onEvent, e:`, e);
    var type = e.type;
    var content = e.content;
    if (type == "client_detect") { //是否支持webrtc
      var isSupport = content.errcode;
      if (isSupport == 0) {//该浏览器支持webrtc

      }
    } else if (type == "session_id") {  //本次会话的sessionid，必须处理，用于反馈定位问题的唯一key。websocket断开重连会通知新的sessionid，所以可能会有多次sessionid通知。
      var sessionId = content.sessionid;
      console.log(`[client_demo]onEvent, notify session_id: ${sessionId}`);  //业务可以收集上报到业务后台或者与业务用户账号绑定，用于反馈定位问题
    } else if (type == "stream_state") { //流状态通知
      var code = content.code;
      var streamUrl = content.streamurl;
      if (code == 10014) { //拉流地址不合法
        console.log("[client_demo]onEvent, notify streamUrl: " + streamUrl + " invalid");
        alert("streamUrl: " + streamUrl + " invalid");
      }
    }
  }



  // var audioDevices = null; 
  // try {
  //     navigator.mediaDevices.enumerateDevices()
  //         .then(function(devices) {
  //             audioDevices = devices.filter(device => device.kind === 'audiooutput');
  //             console.log("audioDevices:", audioDevices);
  //         })
  //         .catch(function(err) {
  //             console.error("enumerateDevices error")
  //         });
  // } catch(e) {
  //     console.error("enumerateDevices except")
  // }

}