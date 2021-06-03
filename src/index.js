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


// 记住需要延时一段时间之后再去获取浏览器的指纹，因为网页加载时候立即调用会偶发出现不准确的问题。
// 500ms 延时是Fingerprint2推荐的做法
setTimeout(function () {
    Fingerprint2.get(function (components) {
        console.log(components)
    });


    log("<h3>浏览器指纹组合实例：</h3>");
    log("<h3>记住需要延时一段时间之后再去获取浏览器的指纹，因为网页加载时候立即调用会偶发出现不准确的问题。</h3>");
    log("<h3>这个小栗子采用的源码来自 Fingerprint2 开源项目，傲天我只是将audio，webgl，canvas指纹相关的源代码拆分出来到单个文件中，方便读者学习每个指纹其内部的原理。</h3>");
    log("<h3>同时我写了一篇 <a href='https://zhuanlan.zhihu.com/p/67923680'>知乎文章</a> 链接介绍了浏览器的属性检测话题</h3>");
    log("<h3>记住如果你在产线环境使用指纹来辨别用户的唯一性，一定要知道这些指纹数据不是百分之百准确的！或者说不是百分之百唯一的！而且单个指纹发生碰撞的几率比较高。<b>什么是碰撞？</b>碰撞就是美国有个用户浏览器的canvas指纹与某个在中国的用户的canvas指纹是相同的。</h3>")

    let canvasStartTime = + new Date();
    log("canvas fingerprint : " + canvasFP().hash);
    console.log(`canvas fp generate time ${+ new Date() - canvasStartTime}`);
   
    let webglStartTime = + new Date();
    log("webgl fingerprint : " + webglFp().hash);
    console.log(`webgl fp generate time ${+ new Date() - webglStartTime}`);

    let audioStartTime = + new Date();
    audioFP().then(({hash}) => {
        console.log(`audio generate time : ${+ new Date  - audioStartTime }`)
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
