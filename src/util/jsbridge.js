/**
 * JSBridgeWrapper
 * JS 桥接工具类
 */
const u = navigator.userAgent;
const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
const isIPhoneX = isiOS && 
    Number(window.screen.height) === 812 && 
    Number(window.screen.width) === 375;// iPhone XS Max
const isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 414 &&
    window.screen.height === 896;// iPhone XR
const isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio &&
    window.devicePixelRatio === 2 &&
    window.screen.width === 414 &&
    window.screen.height === 896;// isIPhoneXR
if (isiOS) {
	alert('ios');
    //ios桥必须的函数
    window.setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "https://__bridge_loaded__";
        document.documentElement.appendChild(WVJBIframe);
        setTimeout( ()=> {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    };
} else if (isAndroid) {
	alert('isAndroid');
    window.setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge);
        } else {
            document.addEventListener("WebViewJavascriptBridgeReady",() => {
                callback(window.WebViewJavascriptBridge);
            },false);
        }
    };
} else {
    console.log("未知机型");
}
/**
 * 返回
 */
function back() {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("goBack", "", (response) => {});
    });
}
/**
 * 关闭webview
 */
function close(){
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("close", "", (response) => {});
    });
}
/**
 * 获取环境信息
 * 返回值：终端（ios/android/h5），系统版本，App版本
 */
function getEnvInfo(callback) {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("getEnv", "", (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 获取设备信息
 */
function getDeviceInfo(callback) {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("getDeviceInfo", "", (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 获取经纬度
 */
function getGaoDeLocation(callback) {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("getGaoDeLocation", "", (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 拨打电话
 */
function callPhone(params,callback) {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("callPhone", params, (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 控制webview滚动
 */
function enableScrollView(enable,callback){
    console.log("ScrollView 1>>>>>>");
    if(!isiOS)return;
    console.log("ScrollView 2>>>>>>");
    let params = {enable:enable};
    params=JSON.stringify(params);
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("enableScrollView", params, (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 注册app基础信息方法
 */
function webGetAPPInformation(params,callback) {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("webGetAPPInformation", params, (response) => {
            callback && callback(response);
        });
    });
}

/**
 * 截图
 */
function saveAlbum(callback) {
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("saveAlbum", "", (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 扫一扫
 */
function scanQrCode(callback){
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("scanQrCode", "", (response) => {
            callback && callback(response);
        });
    });
}
/**
 * 分享
 */
function share(params,callback){
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("share", params, (response) => {
            callback && callback(response);
        });
    });
}

/**
 * 显示导航航栏
 */
function showHeader(title){
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("showHeader", title, (response) => {});
    });
}
/**
 * 隐藏导航航栏
 */
function hideHeader(){
    window.setupWebViewJavascriptBridge && window.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler("hideHeader", "", (response) => {});
    });
}

export default {
  back: back,
  close: close,
  getEnvInfo: getEnvInfo,
  getDeviceInfo: getDeviceInfo,
  getGaoDeLocation: getGaoDeLocation,
  callPhone: callPhone,
  enableScrollView: enableScrollView,
  webGetAPPInformation: webGetAPPInformation,
  saveAlbum: saveAlbum,
  scanQrCode: scanQrCode,
  share: share,
  showHeader: showHeader,
  hideHeader: hideHeader,
  isAndroid: isAndroid,
  isiOS: isiOS,
  isIPhoneX: isIPhoneX || isIPhoneXSMax || isIPhoneXR,
};