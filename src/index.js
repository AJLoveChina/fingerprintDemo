import Fingerprint2 from 'fingerprintjs2'

import canvasFP from './core/canvasFP'
import webglFp from './core/webglFP'
import audioFP from './core/audioFP'


function log(info) {
    let ele = document.createElement("p");
    ele.style.fontSize = "12px";
    ele.innerHTML = info;
    document.body.appendChild(ele)
}


setTimeout(function () {
    Fingerprint2.get(function (components) {
        console.log(components) // an array of components: {key: ..., value: ...}
    });


    log("<h3>浏览器指纹组合实例：</h3>");
    log("<h3>记住需要延时一段时间之后再去获取浏览器的指纹，因为网页加载时候立即调用会偶发出现不准确的问题。</h3>");
    log("canvas fingerprint : " + canvasFP().hash);
    log("webgl fingerprint : " + webglFp().hash);

    audioFP().then(({hash}) => {
        log("audio fingerprint : " + hash);
    })
}, 500);

//
// var components = [
//     { key: 'userAgent', getData: UserAgent },
//     { key: 'webdriver', getData: webdriver },
//     { key: 'language', getData: languageKey },
//     { key: 'colorDepth', getData: colorDepthKey },
//     { key: 'deviceMemory', getData: deviceMemoryKey },
//     { key: 'pixelRatio', getData: pixelRatioKey },
//     { key: 'hardwareConcurrency', getData: hardwareConcurrencyKey },
//     { key: 'screenResolution', getData: screenResolutionKey },
//     { key: 'availableScreenResolution', getData: availableScreenResolutionKey },
//     { key: 'timezoneOffset', getData: timezoneOffset },
//     { key: 'timezone', getData: timezone },
//     { key: 'sessionStorage', getData: sessionStorageKey },
//     { key: 'localStorage', getData: localStorageKey },
//     { key: 'indexedDb', getData: indexedDbKey },
//     { key: 'addBehavior', getData: addBehaviorKey },
//     { key: 'openDatabase', getData: openDatabaseKey },
//     { key: 'cpuClass', getData: cpuClassKey },
//     { key: 'platform', getData: platformKey },
//     { key: 'doNotTrack', getData: doNotTrackKey },
//     { key: 'plugins', getData: pluginsComponent },
//     { key: 'canvas', getData: canvasKey },
//     { key: 'webgl', getData: webglKey },
//     { key: 'webglVendorAndRenderer', getData: webglVendorAndRendererKey },
//     { key: 'adBlock', getData: adBlockKey },
//     { key: 'hasLiedLanguages', getData: hasLiedLanguagesKey },
//     { key: 'hasLiedResolution', getData: hasLiedResolutionKey },
//     { key: 'hasLiedOs', getData: hasLiedOsKey },
//     { key: 'hasLiedBrowser', getData: hasLiedBrowserKey },
//     { key: 'touchSupport', getData: touchSupportKey },
//     { key: 'fonts', getData: jsFontsKey, pauseBefore: true },
//     { key: 'fontsFlash', getData: flashFontsKey, pauseBefore: true },
//     { key: 'audio', getData: audioKey },
//     { key: 'enumerateDevices', getData: enumerateDevicesKey }
// ]
