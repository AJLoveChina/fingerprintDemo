import md5 from 'blueimp-md5'

export default function () {
    return new Promise((done, reject) => {
        let options = {
            audio: {
                timeout: 1000,
                // On iOS 11, audio context can only be used in response to user interaction.
                // We require users to explicitly enable audio fingerprinting on iOS 11.
                // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
                excludeIOS11: true
            }
        };


        var audioOptions = options.audio
        if (audioOptions.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
            // See comment for excludeUserAgent and https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
            return done(options.EXCLUDED)
        }

        var AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext

        if (AudioContext == null) {
            return done(options.NOT_AVAILABLE)
        }

        var context = new AudioContext(1, 44100, 44100)

        var oscillator = context.createOscillator()
        oscillator.type = 'triangle'
        oscillator.frequency.setValueAtTime(10000, context.currentTime)

        var compressor = context.createDynamicsCompressor();
        [
            ['threshold', -50],
            ['knee', 40],
            ['ratio', 12],
            ['reduction', -20],
            ['attack', 0],
            ['release', 0.25]
        ].forEach(function (item) {
            if (compressor[item[0]] !== undefined && typeof compressor[item[0]].setValueAtTime === 'function') {
                compressor[item[0]].setValueAtTime(item[1], context.currentTime)
            }
        })

        oscillator.connect(compressor)
        compressor.connect(context.destination)
        oscillator.start(0)
        context.startRendering()

        var audioTimeoutId = setTimeout(function () {
            console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".')
            context.oncomplete = function () {
            }
            context = null
            return done('audioTimeout')
        }, audioOptions.timeout)

        context.oncomplete = function (event) {
            var fingerprint
            try {
                clearTimeout(audioTimeoutId)
                fingerprint = event.renderedBuffer.getChannelData(0)
                    .slice(4500, 5000)
                    .reduce(function (acc, val) {
                        return acc + Math.abs(val)
                    }, 0)
                    .toString()
                oscillator.disconnect()
                compressor.disconnect()
            } catch (error) {
                done(error)
                return
            }
            done(fingerprint)
        }
    }).then(rawData => {
        return {
            hash: md5(rawData + ""),
            rawData,
        }
    });
}
