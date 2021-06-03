export default function() {
    return new Promise((resolve, reject) => {
        let rtc = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
        var pc = new rtc({iceServers:[]}), noop = function(){};
        pc.createDataChannel('');//create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
        pc.onicecandidate = function(ice)
        {
            if (ice && ice.candidate && ice.candidate.candidate)
            {
                console.log(ice.candidate.candidate);
                resolve(ice.candidate.candidate)
            }
        };
    })
}
