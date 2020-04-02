### 浏览器指纹Demo

> 知乎文章：[浏览器属性检测那些事](https://zhuanlan.zhihu.com/p/67923680)

> 在线演示地址：  https://ajlovechina.github.io/fingerprintDemo/

### 你应该知道的事

> Chrome一直在阻止网页技术捕获用户的指纹，这是出于对于用户隐私与安全性的考虑，所以现在可用的技术可能在未来的某个版本中就不可用了。但是浏览器指纹帮助我们了解到`原来还可以这么玩?`。而且未来Chrome也有可能授权用户给JS赋能唯一ID的能力，当然目前来看Chrome还没打算这么做。

### 源码如何本地开发
```bash
npm install
npm run dev


# How to build ?
npm run build
```

### 每个指纹算法的JS源文件
[audio指纹 查看源码](./src/core/audioFP.js)
[canvas指纹 查看源码](./src/core/canvasFP.js)
[webgl指纹 查看源码](./src/core/webglFP.js)
