(my["webpackJsonp"] = my["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/@dcloudio/uni-mp-alipay/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const _toString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn (fn) {
  return typeof fn === 'function'
}

function isStr (str) {
  return typeof str === 'string'
}

function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

const SYNC_API_RE = /hideKeyboard|upx2px|canIUse|^create|Sync$|Manager$/;

const CONTEXT_API_RE = /^create|Manager$/;

const CALLBACK_API_RE = /^on/;

function isContextApi (name) {
  return CONTEXT_API_RE.test(name)
}
function isSyncApi (name) {
  return SYNC_API_RE.test(name)
}

function isCallbackApi (name) {
  return CALLBACK_API_RE.test(name)
}

function handlePromise (promise) {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}

function shouldPromise (name) {
  if (isSyncApi(name)) {
    return false
  }
  if (isCallbackApi(name)) {
    return false
  }
  return true
}

function promisify (name, api) {
  if (!shouldPromise(name)) {
    return api
  }
  return function promiseApi (options = {}, ...params) {
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api(options, ...params)
    }
    return handlePromise(new Promise((resolve, reject) => {
      api(Object.assign({}, options, {
        success: resolve,
        fail: reject
      }), ...params);
      /* eslint-disable no-extend-native */
      Promise.prototype.finally = function (callback) {
        const promise = this.constructor;
        return this.then(
          value => promise.resolve(callback()).then(() => value),
          reason => promise.resolve(callback()).then(() => {
            throw reason
          })
        )
      };
    }))
  }
}

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;

function checkDeviceWidth () {
  const {
    platform,
    pixelRatio,
    windowWidth
  } = my.getSystemInfoSync(); // uni=>my runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px (number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0
  }
  let result = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1
    } else {
      return 0.5
    }
  }
  return number < 0 ? -result : result
}

// 不支持的 API 列表
const TODOS = [
  'saveImageToPhotosAlbum',
  'getRecorderManager',
  'getBackgroundAudioManager',
  'createInnerAudioContext',
  'chooseVideo',
  'saveVideoToPhotosAlbum',
  'createVideoContext',
  'createCameraContext',
  'createLivePlayerContext',
  'openDocument',
  'onMemoryWarning',
  'startAccelerometer',
  'startCompass',
  'addPhoneContact',
  'setTabBarItem',
  'setTabBarStyle',
  'hideTabBar',
  'showTabBar',
  'setTabBarBadge',
  'removeTabBarBadge',
  'showTabBarRedDot',
  'hideTabBarRedDot',
  'setBackgroundColor',
  'setBackgroundTextStyle',
  'startPullDownRefresh',
  'createIntersectionObserver',
  'authorize',
  'openSetting',
  'getSetting',
  'chooseAddress',
  'chooseInvoiceTitle',
  'addTemplate',
  'deleteTemplate',
  'getTemplateLibraryById',
  'getTemplateLibraryList',
  'getTemplateList',
  'sendTemplateMessage',
  'getUpdateManager',
  'setEnableDebug',
  'getExtConfig',
  'getExtConfigSync',
  'onWindowResize',
  'offWindowResize'
];

function _handleNetworkInfo (result) {
  switch (result.networkType) {
    case 'NOTREACHABLE':
      result.networkType = 'none';
      break
    case 'WWAN':
      // TODO ?
      result.networkType = '3g';
      break
    default:
      result.networkType = result.networkType.toLowerCase();
      break
  }
  return {}
}

function _handleSystemInfo (result) {
  let platform = result.platform ? result.platform.toLowerCase() : 'devtools';
  if (!~['android', 'ios'].indexOf(platform)) {
    platform = 'devtools';
  }
  result.platform = platform;
}

const protocols = { // 需要做转换的 API 列表
  returnValue (methodName, res) { // 通用 returnValue 解析
    if (res.error || res.errorMessage) {
      res.errMsg = `${methodName}:fail ${res.errorMessage || res.error}`;
      delete res.error;
      delete res.errorMessage;
    } else {
      res.errMsg = `${methodName}:ok`;
    }
    return res
  },
  request: {
    name: 'httpRequest',
    args (fromArgs) {
      if (!fromArgs.header) { // 默认增加 header 参数，方便格式化 content-type
        fromArgs.header = {};
      }
      return {
        header (header = {}, toArgs) {
          const headers = {
            'content-type': 'application/json'
          };
          Object.keys(header).forEach(key => {
            headers[key.toLocaleLowerCase()] = header[key];
          });
          return {
            name: 'headers',
            value: headers
          }
        },
        method: 'method', // TODO 支付宝小程序仅支持 get,post
        responseType: false
      }
    },
    returnValue: {
      status: 'statusCode',
      headers: 'header'
    }
  },
  setNavigationBarColor: {
    name: 'setNavigationBar',
    args: {
      frontColor: false,
      animation: false
    }
  },
  setNavigationBarTitle: {
    name: 'setNavigationBar'
  },
  showModal ({
    showCancel = true
  } = {}) {
    if (showCancel) {
      return {
        name: 'confirm',
        args: {
          cancelColor: false,
          confirmColor: false,
          cancelText: 'cancelButtonText',
          confirmText: 'confirmButtonText'
        },
        returnValue (fromRes, toRes) {
          toRes.confirm = fromRes.confirm;
          toRes.cancel = !fromRes.confirm;
        }
      }
    }
    return {
      name: 'alert',
      args: {
        confirmColor: false,
        confirmText: 'buttonText'
      },
      returnValue (fromRes, toRes) {
        toRes.confirm = true;
        toRes.cancel = false;
      }
    }
  },
  showToast ({
    icon = 'success'
  } = {}) {
    const args = {
      title: 'content',
      icon: 'type',
      duration: false,
      image: false,
      mask: false
    };
    if (icon === 'loading') {
      return {
        name: 'showLoading',
        args
      }
    }
    return {
      name: 'showToast',
      args
    }
  },
  showActionSheet: {
    name: 'showActionSheet',
    args: {
      itemList: 'items',
      itemColor: false
    },
    returnValue: {
      index: 'tapIndex'
    }
  },
  showLoading: {
    args: {
      title: 'content',
      mask: false
    }
  },
  uploadFile: {
    args: {
      name: 'fileName'
    }
    // 从测试结果看，是有返回对象的，文档上没有说明。
  },
  downloadFile: {
    returnValue: {
      apFilePath: 'tempFilePath'
    }
  },
  connectSocket: {
    args: {
      method: false,
      protocols: false
    }
    // TODO 有没有返回值还需要测试下
  },
  chooseImage: {
    returnValue: {
      apFilePaths: 'tempFilePaths'
    }
  },
  previewImage: {
    args (fromArgs) {
      // 支付宝小程序的 current 是索引值，而非图片地址。
      if (fromArgs.current && Array.isArray(fromArgs.urls)) {
        const index = fromArgs.urls.indexOf(fromArgs.current);
        fromArgs.current = ~index ? index : 0;
      }
      return {
        indicator: false,
        loop: false
      }
    }
  },
  saveFile: {
    args: {
      tempFilePath: 'apFilePath'
    },
    returnValue: {
      apFilePath: 'savedFilePath'
    }
  },
  getSavedFileInfo: {
    args: {
      filePath: 'apFilePath'
    },
    returnValue (result) {
      if (result.fileList && result.fileList.length) {
        result.fileList.forEach(file => {
          file.filePath = file.apFilePath;
          delete file.apFilePath;
        });
      }
      return {}
    }
  },
  removeSavedFile: {
    args: {
      filePath: 'apFilePath'
    }
  },
  getLocation: {
    args: {
      type: false,
      altitude: false
    }
  },
  openLocation: {
    args: {
      // TODO address 参数在阿里上是必传的
    }
  },
  getNetworkType: {
    returnValue: _handleNetworkInfo
  },
  onNetworkStatusChange: {
    returnValue: _handleNetworkInfo
  },
  stopAccelerometer: {
    name: 'offAccelerometerChange'
  },
  stopCompass: {
    name: 'offCompassChange'
  },
  scanCode: {
    name: 'scan',
    args: {
      onlyFromCamera: 'hideAlbum',
      scanType: false
    },
    returnValue: {
      code: 'result'
    }
  },
  setClipboardData: {
    name: 'setClipboard',
    args: {
      data: 'text'
    }
  },
  getClipboardData: {
    name: 'getClipboard',
    returnValue: {
      text: 'data'
    }
  },
  pageScrollTo: {
    args: {
      duration: false
    }
  },
  login: {
    name: 'getAuthCode',
    returnValue (result) {
      result.code = result.authCode;
    }
  },
  getUserInfo: {
    name: 'getAuthUserInfo',
    returnValue (result) {
      result.userInfo = {
        nickName: result.nickName,
        avatarUrl: result.avatar
      };
    }
  },
  requestPayment: {
    name: 'tradePay',
    args: {
      orderInfo: 'orderStr'
    }
  },
  getBLEDeviceServices: {
    returnValue (result) {
      result.services.forEach((item) => {
        item.uuid = item.serviceId;
      });
    }
  },
  makePhoneCall: {
    args: {
      phoneNumber: 'number'
    }
  },
  stopGyroscope: {
    name: 'offGyroscopeChange'
  },
  getSystemInfo: {
    returnValue: _handleSystemInfo
  },
  getSystemInfoSync: {
    returnValue: _handleSystemInfo
  }
};

TODOS.forEach(todoApi => {
  protocols[todoApi] = false;
});

const CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback (methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue))
  }
}

function processArgs (methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
  if (isPlainObject(fromArgs)) { // 一般 api 的参数解析
    const toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (let key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        let keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) { // 不支持的参数
          console.warn(`支付宝小程序 ${methodName}暂不支持${key}`);
        } else if (isStr(keyOption)) { // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) { // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.includes(key)) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs
}

function processReturnValue (methodName, res, returnValue, keepReturnValue = false) {
  if (isFn(protocols.returnValue)) { // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue)
}

function wrapper (methodName, method) {
  if (hasOwn(protocols, methodName)) {
    const protocol = protocols[methodName];
    if (!protocol) { // 暂不支持的 api
      return function () {
        console.error(`支付宝小程序 暂不支持${methodName}`);
      }
    }
    return function (arg1, arg2) { // 目前 api 最多两个参数
      let options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      const returnValue = my[options.name || methodName](arg1, arg2);
      if (isSyncApi(methodName)) { // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName))
      }
      return returnValue
    }
  }
  return method
}

const todoApis = Object.create(null);

const TODOS$1 = [
  'subscribePush',
  'unsubscribePush',
  'onPush',
  'offPush',
  'share'
];

function createTodoApi (name) {
  return function todoApi ({
    fail,
    complete
  }) {
    const res = {
      errMsg: `${name}:fail:暂不支持 ${name} 方法`
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  }
}

TODOS$1.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['alipay'],
  share: ['alipay'],
  payment: ['alipay'],
  push: ['alipay']
};

function getProvider ({
  service,
  success,
  fail,
  complete
}) {
  let res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider
});

function setStorageSync (key, data) {
  return my.setStorageSync({
    key,
    data
  })
}
function getStorageSync (key) {
  const result = my.getStorageSync({
    key
  });
  // 不知道会不会出现 success 为 false 情况，暂时这样处理下。
  if (result.success) {
    return result.data || ''
  } else {
    return ''
  }
}
function removeStorageSync (key) {
  return my.removeStorageSync({
    key
  })
}

function startGyroscope (params) {
  if (hasOwn(params, 'interval')) {
    console.warn('支付宝小程序 startGyroscope暂不支持interval');
  }
  params.success && params.success({
    errMsg: 'startGyroscope:ok'
  });
  params.complete && params.complete({
    errMsg: 'startGyroscope:ok'
  });
}

var api = /*#__PURE__*/Object.freeze({
  setStorageSync: setStorageSync,
  getStorageSync: getStorageSync,
  removeStorageSync: removeStorageSync,
  startGyroscope: startGyroscope
});

let uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get (target, name) {
      if (name === 'upx2px') {
        return upx2px
      }
      if (api[name]) {
        return promisify(name, api[name])
      }
      if (extraApi[name]) {
        return promisify(name, extraApi[name])
      }
      if (todoApis[name]) {
        return promisify(name, todoApis[name])
      }
      if (!hasOwn(my, name) && !hasOwn(protocols, name)) {
        return
      }
      return promisify(name, wrapper(name, my[name]))
    }
  });
} else {
  uni.upx2px = upx2px;

  Object.keys(todoApis).forEach(name => {
    uni[name] = promisify(name, todoApis[name]);
  });

  Object.keys(extraApi).forEach(name => {
    uni[name] = promisify(name, todoApis[name]);
  });

  Object.keys(api).forEach(name => {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(my).forEach(name => {
    if (hasOwn(my, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, my[name]));
    }
  });
}

var uni$1 = uni;

/* harmony default export */ __webpack_exports__["default"] = (uni$1);


/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/megalo/dist/megalo.mp.esm.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/megalo/dist/megalo.mp.esm.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, wx) {// fix env
try {
  if (!global) global = {};
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  global.App = global.App || App;
  global.Page = global.Page || Page;
  global.Component = global.Component || Component;
  global.getApp = global.getApp || getApp;
} catch (e) {}

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined' && window.navigator;//fixed by xxxxxx 百度2.10.24 window 为 function
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;


if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;

 // work around flow check

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};



/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {}
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {}
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {}
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
//fixed by xxxxxx
if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */


function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;


function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */




var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props && hasOwn(props, key)) {
      
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {}
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {}
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.17';//fixed by xxxxxx

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  // let parentNode = vnode
  // let childNode = vnode
  // while (isDef(childNode.componentInstance)) {
  //   childNode = childNode.componentInstance._vnode
  //   if (childNode && childNode.data) {
  // data = mergeClassData(childNode.data, data)
  // }
  // }
  // while (isDef(parentNode = parentNode.parent)) {
  // if (parentNode && parentNode.data) {
  // data = mergeClassData(data, parentNode.data)
  // }
  // }
  // mp: no need to update static class
  return renderClass(data.class)
}

// function mergeClassData (child: VNodeData, parent: VNodeData): {
//   staticClass: string,
//   class: any
// } {
//   return {
//     staticClass: concat(child.staticClass, parent.staticClass),
//     class: isDef(child.class)
//       ? [child.class, parent.class]
//       : parent.class
//   }
// }

function renderClass (
  dynamicClass
) {
  if (isDef(dynamicClass)) {
    return concat(stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/**
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     [options] 如果想忽略开始边界上的调用，传入{leading: false}。
 * @param  {boolean}    [options.leading=true] 如果想忽略开始边界上的调用，传入{leading: false}。
 * @param  {number|boolean}    [options.leadingDelay=false] 开始边界上的调用延时，传入{leadingDelay: 0}。
 * @param  {boolean}    [options.trailing=true] 如果想忽略结尾边界上的调用，传入{trailing: false}
 *
 * @return {Function}
 *
 * @example
 * const throttleCallback = throttle(callback, 100);
 *
 */
function throttle (func, wait, options) {
  if ( options === void 0 ) options = {};

  var context, args, result;
  var timeout = null;
  var leadingDelay = options.leadingDelay === undefined ? false : options.leadingDelay;
  // 上次执行时间点
  var previous = 0;
  // 延迟执行函数
  var later = function () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : (+new Date());
    timeout = null;
    // $flow-disable-line
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };
  return function () {
    var now = (+new Date());
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) {
      previous = now;
    }
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    context = this;
        args = arguments; // eslint-disable-line
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      if (leadingDelay === false) {
        result = func.apply(context, args);
      } else {
        setTimeout(function () {
          result = func.apply(context, args);
        }, leadingDelay);
      }
      if (!timeout) {
        context = args = null;
      }
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result
  }
}

function aop (fn, options) {
  if ( options === void 0 ) options = {};

  var before = options.before;
  var after = options.after;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var self = this;

    if (before) {
      before.call.apply(before, [ self, args ].concat( args ));
    }

    var ret = fn.call.apply(fn, [ self ].concat( args ));

    if (after) {
      after.call.apply(after, [ self, ret ].concat( args, [ret] ));
    }

    return ret
  }
}

var Buffer = function Buffer () {
  this.buff = {};
};

Buffer.prototype.push = function push (data) {
  Object.assign(this.buff, data);
};

Buffer.prototype.pop = function pop () {
  var data = Object.assign({}, this.buff);
  this.buff = {};
  return data
};

Buffer.prototype.isEqual = function isEqual (key, value) {
  return this.buff[key] !== undefined && this.buff[key] === value
};
//fixed by xxxxxx 调整识别顺序 alipay,swan,tt,wechat
function getMPPlatform () {
  var platform = '';
  try {
    /* eslint-disable */
    if (!platform && my) {
      platform = 'alipay';
    }
    /* eslint-enable */
  } catch (e) {}
  try {
    /* eslint-disable */
    if (!platform && swan) {
      platform = 'swan';
    }
    /* eslint-enable */
  } catch (e) {}
  try {
    /* eslint-disable */
    if (!platform && tt) {
      platform = 'tt';
    }
    /* eslint-enable */
  } catch (e) {}
  try {
  	/* eslint-disable */
  	if (!platform && wx) {
  		platform = 'wechat';
  	}
  	/* eslint-enable */
  } catch (e) {}
  return platform || 'unknown'
}

var ROOT_DATA_VAR = '$root';
var HOLDER_VAR = 'h';

var VM_ID_VAR = 'c';
var VM_ID_PREFIX = 'cp';

var VM_ID_SEP = 'v';

var SLOT_CONTEXT_ID_VAR = 's';

var LIST_TAIL_SEPS = {
  swan: '_',
  wechat: '-',
  alipay: '-',
  tt:'-'//fixed by xxxxxx
};


var HOLDER_TYPE_VARS = {
  text: 't',
  vtext: 'vt',
  if: '_if',
  for: 'li',
  class: 'cl',
  rootClass: 'rcl',
  style: 'st',
  value: 'value',
  vhtml: 'html',
  vshow: 'vs',
  slot: 'slot'
};

var notEmpty = function (e) { return !!e; };


var isReservedTag = makeMap(
  'template,script,style,element,content,slot,link,meta,svg,view,' +
  'a,div,img,image,text,span,richtext,input,switch,textarea,spinner,select,' +
  'slider,slider-neighbor,indicator,trisition,trisition-group,canvas,' +
  'list,cell,header,loading,loading-indicator,refresh,scrollable,scroller,' +
  'video,web,embed,tabbar,tabheader,datepicker,timepicker,marquee,countdown',
  true
);

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// Elements that you can, intentionally, leave open (and which close themselves)
// more flexable than web
var canBeLeftOpenTag = makeMap(
  'web,spinner,switch,video,textarea,canvas,' +
  'indicator,marquee,countdown',
  true
);

var isUnaryTag = makeMap(
  'embed,img,image,input,link,meta',
  true
);

function mustUseProp () { /* console.log('mustUseProp') */ }
function getTagNamespace () { /* console.log('getTagNamespace') */ }
function isUnknownElement () { /* console.log('isUnknownElement') */ }

var eventTypeMap = {
  tap: ['tap', 'click']
};

function getValue (obj, path) {
  if ( obj === void 0 ) obj = {};
  if ( path === void 0 ) path = '';

  var paths = typeof path === 'string' ? path.split('.') : path;
  return paths.reduce(function (prev, k) {
    /* istanbul ignore if */
    if (prev && isDef(prev)) {
      prev = prev[k];
    }
    return prev
  }, obj)
}

function deepEqual (a, b) {
  var aType = typeof a;
  var bType = typeof b;
  if (aType !== 'object' || bType !== 'object' || aType !== bType) {
    return a === b || (a === '' && b === undefined) || (a === undefined && b === '')
  } else {
    if (Array.isArray(a)) {
      if (a.length !== b.length) {
        return false
      }
    }
    for (var k in a) {
      if (!deepEqual(a[k], b[k])) {
        return false
      }
    }
  }
  return true
}

function getHid (vm, vnode) {
  if ( vnode === void 0 ) vnode = {};

  var sep = LIST_TAIL_SEPS[vm.$mp.platform] || LIST_TAIL_SEPS.wechat;
  var data = vnode.data; if ( data === void 0 ) data = {};
  var _hid = isDef(data._hid) ? data._hid : (data.attrs && data.attrs._hid);
  var _fid = isDef(data._fid) ? data._fid : (data.attrs && data.attrs._fid);
  if (isDef(_fid)) {
    return ("" + _hid + sep + _fid)
  }
  return _hid
}

function getVM (vm, id) {
  if ( vm === void 0 ) vm = {};

  var res;
  if (getVMId(vm) === ("" + id)) {
    return vm
  }
  var $children = vm.$children;
  for (var i = 0; i < $children.length; ++i) {
    res = getVM($children[i], id);
    /* istanbul ignore else */
    if (res) {
      return res
    }
  }
}

function getCid (vm) {
  var $vnode = vm.$vnode;
  var cid = $vnode && $vnode.data && $vnode.data.attrs._cid;
  cid = cid || '0';
  return cid
}

function getFid (vm) {
  var $vnode = vm.$vnode;
  var fid = $vnode && $vnode.data && $vnode.data.attrs._fid;
  return fid
}

function getVMId (vm) {
  var sep = LIST_TAIL_SEPS[vm.$mp.platform] || LIST_TAIL_SEPS.wechat;
  var res = [];
  var cursor = vm;
  var prev;
  while (cursor) {
    if (cursor === vm || !isSlotParent(cursor, prev)) {
      res.unshift(getCid(cursor));
    }
    prev = cursor;
    cursor = cursor.$parent;
  }
  var vmId = res.join(VM_ID_SEP);
  var fid = getFid(vm);
  if (isDef(fid)) {
    return ("" + vmId + sep + fid)
  }
  return vmId
}

function isSlotParent (parent, child) {
  var ref = child || {};
  var $vnode = ref.$vnode; if ( $vnode === void 0 ) $vnode = {};
  var childSlotParentUId = $vnode._mpSlotParentUId;
  return isDef(childSlotParentUId) && childSlotParentUId === parent._uid
}

// export function getVMParentId (vm) {
//   if (vm.$parent) {
//     return getVMId(vm.$parent)
//   }
//   return ''
// }

function isEmptyObj (obj) {
  if ( obj === void 0 ) obj = {};

  return Object.keys(obj).length === 0
}

function initVMToMP (vm) {
  var obj;

  var sep = LIST_TAIL_SEPS[vm.$mp.platform] || LIST_TAIL_SEPS.wechat;

  vm = vm || this;
  // const cid = getVMId(vm)
  var vmId = getVMId(vm);
  // console.log(vmId)
  var i = vmId.indexOf(sep);
  var cid = i > -1 ? vmId.slice(0, i) : vmId;
  var info = {
    cid: vmId,
    cpath: ("" + cid + VM_ID_SEP)
  };

  var prefix = ROOT_DATA_VAR + "." + vmId;

  vm.$mp._update(( obj = {}, obj[(prefix + "." + VM_ID_VAR)] = info.cid, obj[(prefix + "." + VM_ID_PREFIX)] = info.cpath, obj));
}

function updateSlotId (vm, sid) {
  var obj;

  vm = vm || this;
  var vmId = getVMId(vm);
  var dataPaths = [ROOT_DATA_VAR, vmId, SLOT_CONTEXT_ID_VAR];
  var curValue = getValue(vm.$mp.page.data, dataPaths);
  var dataPathStr = dataPaths.join('.');

  /* istanbul ignore else */
  if (isDef(sid) && curValue !== sid) {
    vm.$mp._update(( obj = {}, obj[dataPathStr] = sid, obj));
  }
}

function updateMPData (type, data, vnode) {
  var obj;

  if ( type === void 0 ) type = HOLDER_TYPE_VARS.text;
  var vm = this;
  var vmId = getVMId(vm);
  var hid = getHid(vm, vnode);
  var dataPaths = [
    ROOT_DATA_VAR,
    vmId,
    HOLDER_VAR,
    hid,
    type
  ];
  var dataPathStr = dataPaths.join('.');

  var curValue = getValue(vm.$mp.page.data, dataPaths);
  var isDeepEqual = deepEqual(curValue, data);

  /* istanbul ignore else */
  if (isDef(hid)) {
    if ((vm.$mp.platform === 'swan') && /[^A-Za-z0-9_]/.test(type)) {
      dataPathStr = dataPathStr.replace(/\.[^\.]*$/, ("['" + type + "']"));
    }

    if (!isDeepEqual || !vm.$mp._isEqualToBuffer(dataPathStr, data)) {
      vm.$mp._update(( obj = {}, obj[dataPathStr] = data, obj));
    }
  }
}

function assignData(newData,pageData,path,value){
  var segments = path.split('.');
  var len = segments.length;
  var obj = pageData;
  var depth = len-1;
  for (var i = 0; i < len; i++) {
      var segment = segments[i];
      if(i < depth){
          if(!obj.hasOwnProperty(segment)){
            obj = obj[segment] = {}
            var parentPath = segments.slice(0,i).join('.')
            if(newData[parentPath]){//$root.0.h
              newData[parentPath][segment]={}
            }else if(i > 2){//$root.0.h.0
              parentPath = segments.slice(0,i-1).join('.')
              if(newData[parentPath]){
                newData[parentPath][segments[i-1]][segment]={}
              }else{//$root.0.h.0-0
                newData[segments.slice(0,i+1).join('.')]={}
              }
            }else{//$root.0
              newData[segments.slice(0,i+1).join('.')]={}
            }
          } else {
            obj = obj[segment]
          }
      }
    }
}


function processData(pageData,data){
  var newData = {};  
  for(var key in data){
    assignData(newData,pageData,key,data[key])
  }
  return newData
}

function createUpdateFn (page) {
  var buffer = new Buffer();

  function doUpdate () {
    var data = buffer.pop();

    if (!isEmptyObj(data) && page.setData) {
      if(Vue.prototype._mpPlatform==='tt'){//fixed by xxxxxx 因为头条 path 赋值有 bug，必须填充之前未声明的对象
          var emptyData = processData(page.data,data)
          page.setData(emptyData,function(){//头条的 android 可以一步 setData，iOS 目前必须分两步
            page.setData(data,function(){
            })
          });
      } else {
          page.setData(data);
      }
    }
  }

  var throttleSetData = throttle(function () {
    doUpdate();
  }, 50, { leadingDelay: 0 });

  return {
    update: function update (data) {
      buffer.push(data);
      throttleSetData();
    },
    instantUpdate: function instantUpdate (data) {
      doUpdate();
    },
    isEqualToBuffer: function isEqualToBuffer (key, value) {
      return buffer.isEqual(key, value)
    }
  }
}

function updateVnodeToMP (vnode, key, value) {
  if ( key === void 0 ) key = HOLDER_TYPE_VARS.text;

  var context = vnode.context;
  var slotContext = vnode.slotContext;
  var realContext = slotContext || context;
  realContext && realContext.$updateMPData(key, value, vnode);

  /* istanbul ignore if */
  if (!realContext) {
    console.warn('update text with no context', key, value, vnode);
  }
}

var sep = '';

function assertHid (vnode, hid) {
  var data = vnode.data; if ( data === void 0 ) data = {};
  var attrs = data.attrs; if ( attrs === void 0 ) attrs = {};
  var _hid = attrs._hid;
  var _fid = attrs._fid;
  var curHid = isDef(_fid) ? ("" + _hid + sep + _fid) : _hid;
  return ("" + curHid) === ("" + hid)
}

//TODO 暂时仅处理首个 form fixed by xxxxxx
function getAlipayFormVNode(vnode){
	if(vnode.tag==='form'){
		return vnode
	}else{
		var children = vnode.children
		if(children&&children.length){
			for(var i=0;i<children.length;i++){
				var childVNode = children[i]
				var formVNode= getAlipayFormVNode(childVNode)
				if(formVNode){
					return formVNode
				}
			}
		}
	}
}

//fixed by xxxxxx
function getAlipayResetHandlers(vnode){
	if(!vnode){
		return []
	}
	var formVNode = getAlipayFormVNode(vnode)
	if(formVNode.data&&formVNode.data.on&&formVNode.data.on.reset){
			var handlers = []
			if(typeof formVNode.data.on.reset === 'function'){
				handlers.push(formVNode.data.on.reset)
			}else{
				handlers = formVNode.data.on.reset
			}
			return handlers
	}
	return []
}

function proxyEvent (rootVM, event) {
  if (!sep) {
    sep = LIST_TAIL_SEPS[rootVM.$mp.platform] || LIST_TAIL_SEPS.wechat;
  }
  
  //fixed by xxxxxx
  var isAlipayResetEvent = rootVM.$mp.platform === 'alipay' && typeof event === 'function'
	if(isAlipayResetEvent){//支付宝小程序 form reset 事件 event 对象是一个 function 
      event = {
        type:'reset',
        detail:{},
        currentTarget:{},
        target:{},
        dataset:{}
      }
  }
  
  //fixed by xxxxxx 支付宝部分事件无 target
  if(!event.currentTarget){
    event.currentTarget = {}
  }
  if(!event.target){
    event.target = {}
  }
  
  var type = event.type;
  var detail = event.detail; if ( detail === void 0 ) detail = {};
  var target = event.currentTarget || event.target;
  var dataset = target.dataset; if ( dataset === void 0 ) dataset = {};
  var cid = dataset.cid;
  var hid = dataset.hid;

  //fixed by xxxxxx
  var handlers = [];
	if(isAlipayResetEvent){
		handlers = getAlipayResetHandlers(rootVM._vnode)
	}else{
		var vm = getVM(rootVM, cid);
		handlers = getHandlers(vm, type, hid);
	}
  
  var $event = Object.assign({}, event);
  Object.assign(event.target, {
    value: detail.value
  });
  //fixed by xxxxxx 
  $event.mp = event
  handlers.forEach(function (handler) {
    handler($event);
  });
}

function getVnode (vnode, hid) {
  if ( vnode === void 0 ) vnode = {};

  var componentInstance = vnode.componentInstance;
  var children = vnode.children; if ( children === void 0 ) children = [];
  if (assertHid(vnode, hid)) {
    return vnode
  }

  // if vnode is component
  // find vnode in its slots
  if (componentInstance) {
    var $slots = componentInstance.$slots; if ( $slots === void 0 ) $slots = {};
    children = Object.keys($slots)
      .reduce(function (res, k) {
        var nodes = $slots[k];
        /* istanbul ignore else */
        if (nodes._rendered) {
          res = res.concat(nodes);
        }
        return res
      }, []);
  }

  for (var i = 0, len = children.length; i < len; ++i) {
    var res = getVnode(children[i], hid);
    if (res) { return res }
  }
}

// TODO: unit test for @touchstart and @touchStart
function getHandlers (vm, rawType, hid) {
  var type = rawType.toLowerCase();
  var res = [];

  var eventTypes = eventTypeMap[type] || [type];
  if (type !== rawType) {
    eventTypes.push(rawType);
  }

  /* istanbul ignore if */
  if (!vm) { return res }

  var vnode = getVnode(vm._vnode, hid);

  if (!vnode) { return res }

  var elm = vnode.elm;
  var on = elm.on; if ( on === void 0 ) on = {};

  /* istanbul ignore if */
  if (!assertHid(vnode, hid)) { return res }

  res = eventTypes.reduce(function (buf, event) {
    var handler = on[event];
    /* istanbul ignore if */
    if (typeof handler === 'function') {
      buf.push(handler);
    } else if (Array.isArray(handler)) {
      buf = buf.concat(handler);
    }
    return buf
  }, []);

  return res
}

/*  */

// import { extend, warn, isObject } from 'core/util/index'
/**
 * Runtime helper for rendering <slot>
 */
function afterRenderSlot (
  nodes,
  name,
  fallback,
  props,
  bindObject
) {
  var _fid = props._fid;
  // single tag:
  // <CompA><span slot-scope="props">{{ props.msg }}</span></CompA>
  if (nodes && nodes.tag) {
    nodes = [nodes];
  }
  if (nodes && nodes.length) {
    var firstNode = getFirstNode(nodes);
    var context = firstNode.context;
    if (context !== this) {
      var sid = getVMId(context);
      updateSlotId(this, sid);
    }
    markComponents(nodes, this._uid);
  }

  // scopedSlotFn with v-for
  var scopedSlotFn = this.$scopedSlots[name];
  // update vnode hid in scoped slot with the slot host's actual fid
  if (scopedSlotFn && isDef(_fid)) {
    updateNodesHid(nodes, ("-" + _fid));
  }

  return nodes
}

function updateNodesHid (nodes, tail) {
  if ( nodes === void 0 ) nodes = [];

  nodes.forEach(function (node) {
    /* istanbul ignore else */
    if (node.data && node.data._hid) {
      node.data._hid += tail;
    } else if (node && node.data && node.data.attrs && node.data.attrs._hid) {
      node.data.attrs._hid += tail;
    }
    updateNodesHid(node.children || [], tail);
  });
}

function getFirstNode (nodes) {
  var firstNode = nodes;
  while (firstNode && Array.isArray(firstNode)) {
    firstNode = firstNode[0];
  }
  return firstNode
}

function markComponents (nodes, parentUId) {
  if ( nodes === void 0 ) nodes = [];

  nodes.forEach(function (node) {
    var componentOptions = node.componentOptions;
    if (componentOptions) {
      node._mpSlotParentUId = parentUId;
    }
    markComponents(node.children, parentUId);
  });
}

function renderIf (cond, _hid, _fid) {
  var cloneVnode = {
    context: this,
    data: {
      attrs: { _hid: _hid, _fid: _fid }
    }
  };
  updateVnodeToMP(cloneVnode, HOLDER_TYPE_VARS.if, cond);
  return cond
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function afterRenderList (
  ret,
  val,
  render,
  forId,
  context
) {
  updateListToMP(ret, val, forId, context);
}

// TODO: support for destructuring
// TODO: keys collecting method needs improve for
// <li v-for="i in 3" :key="i"></li>
function updateListToMP (vnodeList, val, forId, context) {
  if ( vnodeList === void 0 ) vnodeList = [];

  var firstItem = vnodeList[0];
  var forKeys;
  var list = [];
  /* istanbul ignore else */
  if (firstItem) {
    // collect v-key
    if (Array.isArray(firstItem)) {
      forKeys = firstItem.map(function (e) {
        var ref = e.data || /* istanbul ignore next */ {};
        var attrs = ref.attrs; if ( attrs === void 0 ) attrs = {};
        var _fk = attrs._fk; if ( _fk === void 0 ) _fk = '';
        return _fk
      });
    } else {
      var ref = firstItem.data || {};
      var attrs = ref.attrs; if ( attrs === void 0 ) attrs = {};
      var _fk = attrs._fk; if ( _fk === void 0 ) _fk = '';
      forKeys = [_fk];
    }

    forKeys = forKeys.filter(function (e) { return e; });

    // generate list array with v-key value
    var valToList = [];
    /* istanbul ignore else */
    if (Array.isArray(val) || typeof val === 'string') {
      valToList = new Array(val.length);
      for (var i = 0, l = val.length; i < l; i++) {
        valToList[i] = val[i];
      }
    } else if (typeof val === 'number') {
      valToList = new Array(val);
      for (var i$1 = 0; i$1 < val; i$1++) {
        valToList[i$1] = i$1;
      }
    } else if (isObject(val)) {
      valToList = Object.keys(val).map(function (e, i) { return i; });
    }

    list = valToList.map(function (e, i) {
      if (forKeys.length === 0) {
        return i
      }
      return forKeys.reduce(function (res, k) {
        res[k.replace(/\./g, '_')] = getValue(val[i], k);
        return res
      }, {})
    });
  }

  var cloneVnode = {
    context: context,
    data: {
      attrs: { _hid: forId }
    }
  };

  // TODO: try not disable key diff in patching process
  // key will reuse existing vnode which won't update the vnode content
  // see unit test: with key
  // list won't update after this.list.reverse() if it's not disable

  // if is a scoped slot list
  if (firstItem && !firstItem.fn) {
    vnodeList.forEach(function (vnode) {
      if (Array.isArray(vnode)) {
        vnode.forEach(function (c) {
          if (c.key) { c.key = undefined; }
        });
      } else if (vnode.key) {
        vnode.key = undefined;
      }
    });
  }

  updateVnodeToMP(cloneVnode, HOLDER_TYPE_VARS.for, list);
}

var app = null;

function initRootVM (mpVM, opt, query) {
  if ( opt === void 0 ) opt = {};
  if ( query === void 0 ) query = {};

  var options = opt.options;
  var Component = opt.Component;
  var platform = opt.platform;
  var mpType = options.mpType;
  var mpVMOptions = query;
  var ref = createUpdateFn(mpVM);
  var update = ref.update;
  var instantUpdate = ref.instantUpdate;
  var isEqualToBuffer = ref.isEqualToBuffer;
  var $mp = {
    platform: platform,
    status: 'load',
    query: mpVMOptions,
    options: mpVMOptions,
    _update: update,
    _instantUpdate: instantUpdate,
    _isEqualToBuffer: isEqualToBuffer
  };

  if (mpType === 'app') {
    app = mpVM;
    Object.assign($mp, { app: app });
  } else {
    Object.assign($mp, {
      page: mpVM,
      app: app
    });
  }

  Object.assign(options, { $mp: $mp });

  var rootVM = new Component(options);

  return rootVM
}

/*  */
function createElement$1 (tagName, vnode) {
  return {
    on: {

    }
  }
}

function createElementNS (namespace, tagName) {
  return {}
}

function createTextNode (text, vnode) {
  updateVnodeToMP(vnode, HOLDER_TYPE_VARS.text, text);
  return {
    text: text
  }
}

function createComment (text) {
  return {
    text: text
  }
}

function insertBefore (parentNode, newNode, referenceNode) {
}

function removeChild (node, child) {
}

function appendChild (node, child) {
}

function parentNode (node) {
  return {}
}

function nextSibling (node) {
  return {}
}

function tagName (node) {
  return '#'
}

function setTextContent (node, text, vnode) {
  updateVnodeToMP(vnode, HOLDER_TYPE_VARS.text, text);
  return {}
}

function setStyleScope (node, scopeId, vnode) {
  return {}
}

function setAttribute (node, scopeId, v, vnode) {
  return {}
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text, vnode);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text, vnode));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '', vnode);
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '', vnode);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, '', vnode); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '', vnode);
      }
    } else if (oldVnode.text !== vnode.text || (oldVnode.data && vnode.data && oldVnode.data._hid !== vnode.data._hid)) {
      nodeOps.setTextContent(elm, vnode.text, vnode);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {}
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

function createTextVNode$1 (val, _hid, _fid) {
  var vnode = new VNode(undefined, {
    _hid: _hid, _fid: _fid
  }, undefined, String(val), undefined, this);

  return vnode
}

/*  */

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function beforeCreateElement (
  args,
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  var childrenIndex = 3;
  if (Array.isArray(data) || isPrimitive(data)) {
    childrenIndex = 2;
    normalizationType = children;
    children = data;
    data = undefined;
  }

  args[childrenIndex] = normalizeChildren$1(children);
}

function normalizeChildren$1 (children) {
  if ( children === void 0 ) children = [];

  var res = [];
  for (var i = 0, len = children.length; i < len; i++) {
    var child = children[i];
    if (Array.isArray(child)) {
      res = res.concat(normalizeChildren$1(child));
    } else if (child) {
      res.push(child);
    }
  }
  return res
}

/*  */



var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);









var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode$1 = new VNode('', {}, []);

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode$1);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode$1;
  var isDestroy = vnode === emptyNode$1;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

var ignoreKeys = ['_hid', '_fk', '_cid', '_batrs'];

function isIgnoreKey (key) {
  return ignoreKeys.indexOf(key) > -1 ||
  /^_if_/.test(key)
}

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  var bindingAttrs = (attrs._batrs || '').split(',');
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    if (isIgnoreKey(key)) {
      continue
    }
    cur = attrs[key];
    old = oldAttrs[key];

    // only update daynamic attrs in runtime
    if (old !== cur && (bindingAttrs.indexOf(key) > -1 || key === 'slot')) {
      updateVnodeToMP(vnode, key, cur);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);
  var rootClass = null;
  var rootVnode = null;

  if (isDef(cls) && isDef(vnode.componentInstance)) {
    var ref = vnode.data;
    var staticClass = ref.staticClass; if ( staticClass === void 0 ) staticClass = '';
    var rootClassList = cls
      .split(/\s+/)
      .concat(staticClass.split(/\s+/));
    rootVnode = vnode.componentInstance._vnode;
    rootClass = rootClassList.join(' ');
    cls = undefined;
  }

  if (isDef(cls)) {
    vnode.elm.class = cls;
    updateVnodeToMP(vnode, HOLDER_TYPE_VARS.class, cls);
  }

  if (isDef(rootClass)) {
    updateVnodeToMP(rootVnode, HOLDER_TYPE_VARS.rootClass, rootClass);
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      /* istanbul ignore else */
      if (key === 'innerHTML') {
        var ref = vnode.context;
        var $htmlParse = ref.$htmlParse;
        if ($htmlParse) {
          var htmlNodes = $htmlParse(cur);
          updateVnodeToMP(vnode, HOLDER_TYPE_VARS.vhtml, htmlNodes);
        } else {
          updateVnodeToMP(vnode, HOLDER_TYPE_VARS.vhtml, cur);
        }
        return
      } else if (key === 'textContent') {
        updateVnodeToMP(vnode, HOLDER_TYPE_VARS.vtext, cur);
        return
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        if (elm.value !== strCur) {
          elm.value = strCur;
          updateVnodeToMP(vnode, key, strCur);
        }
      }
    } else if (elm[key] !== cur) {
      elm[key] = cur;
      updateVnodeToMP(vnode, key, cur);
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  // return data.staticStyle
  //   ? extend(data.staticStyle, style)
  //   : style

  // mp: no need to update staticStyle
  return style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
// const setProp = (el, name, val) => {
//   /* istanbul ignore if */
//   if (cssVarRE.test(name)) {
//     el.style.setProperty(name, val)
//   } else if (importantRE.test(val)) {
//     el.style.setProperty(name, val.replace(importantRE, ''), 'important')
//   } else {
//     const normalizedName = normalize(name)
//     if (Array.isArray(val)) {
//       // Support values array created by autoprefixer, e.g.
//       // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
//       // Set them one by one, and the browser will only set those it can recognize
//       for (let i = 0, len = val.length; i < len; i++) {
//         el.style[normalizedName] = val[i]
//       }
//     } else {
//       el.style[normalizedName] = val
//     }
//   }
// }

// const vendorNames = ['Webkit', 'Moz', 'ms']

// let emptyStyle
// const normalize = cached(function (prop) {
//   emptyStyle = emptyStyle || {}
//   prop = camelize(prop)
//   if (prop !== 'filter' && (prop in emptyStyle)) {
//     return prop
//   }
//   const capName = prop.charAt(0).toUpperCase() + prop.slice(1)
//   for (let i = 0; i < vendorNames.length; i++) {
//     const name = vendorNames[i] + capName
//     if (name in emptyStyle) {
//       return name
//     }
//   }
//   return prop
// })

var normalize = cached(function (prop) {
  if ( prop === void 0 ) prop = '';

  return prop.replace(/[A-Z]/g, function (e) { return ("-" + (e.toLowerCase())); })
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  // const el: any = vnode.elm
  // const oldStaticStyle: any = oldData.staticStyle
  // const oldStyleBinding: any = oldData.normalizedStyle || oldData.style || {}

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  // const oldStyle = oldStaticStyle || oldStyleBinding

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  var res = [];
  var cur = Object.keys(newStyle)
    .reduce(function (res, name) {
      var val = newStyle[name];
      var normalizedName = normalize(name);
      if (val === undefined || val === null || val === false) {
        return res
      }
      if (cssVarRE.test(name)) {
        res.push((name + ": " + val));
      } else if (importantRE.test(val)) {
        res.push((normalizedName + ": " + val));
      } else {
        if (Array.isArray(val)) {
          // Support values array created by autoprefixer, e.g.
          // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
          // Set them one by one, and the browser will only set those it can recognize
          for (var i = 0, len = val.length; i < len; i++) {
            res.push((normalizedName + ": " + (val[i])));
          }
        } else {
          res.push((normalizedName + ": " + val));
        }
      }
      return res
    }, res)
    .filter(notEmpty)
    .join('; ');

  updateVnodeToMP(vnode, HOLDER_TYPE_VARS.style, cur);
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  // handler = withMacroTask(handler)
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  /* istanbul ignore else */
  if (!target$1.on[event]) {
    target$1.on[event] = [];
  }
  target$1.on[event].push(handler);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  if (!handler) {
    return
  }
  var realTarget = _target || target$1;
  var realHanlder = handler._withTask || handler;
  /* istanbul ignore else */
  if (realTarget.on[event]) {
    var index = realTarget.on[event].indexOf(realHanlder);
    /* istanbul ignore else */
    if (index > -1) {
      realTarget.on[event].splice(index, 1);
    }
  }
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

var platformModules = [
  attrs,
  klass,
  domProps,
  style,
  events
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

function walkInTree (vm, fn, options) {
  if ( options === void 0 ) options = {};

  var result;
  var bottomToTop = options.bottomToTop; if ( bottomToTop === void 0 ) bottomToTop = false;

  if (!bottomToTop) {
    result = fn(vm);
  }

  /* istanbul ignore else */
  if (vm.$children) {
    for (var i = vm.$children.length - 1; i >= 0; i--) {
      var child = vm.$children[i];
      result = walkInTree(child, fn, options) || result;
    }
  }

  if (bottomToTop) {
    result = fn(vm);
  }

  return result
}

function callHook$2 (vm, hook, options) {
  /* istanbul ignore if */
  if (!vm) {
    return
  }

  var result;

  if (hook === 'onReady') {
    result = walkInTree(vm, function (_vm) {
      var handler = _vm.$options[hook];
      handler && handler.call(_vm, options);
    }, { bottomToTop: true });
  } else {
    result = walkInTree(vm, function (_vm) {
      var handler = _vm.$options[hook];
      return handler && handler.call(_vm, options)
    });
  }

  if (hook === 'onUnload') {
    var rootVM = vm.$root;
    rootVM.$destroy();
  }

  return result
}

var page = {};

page.init = function init (opt) {
  var obj;

  Page({
    // 生命周期函数--监听页面加载
    data: ( obj = {}, obj[ROOT_DATA_VAR] = {}, obj),
    onLoad: function onLoad (options) {
      var rootVM = this.rootVM = initRootVM(this, opt, options);

      callHook$2(rootVM, 'onLoad', options);

      rootVM.$mount();

      rootVM.$mp._instantUpdate();
    },
    // 生命周期函数--监听页面初次渲染完成
    onReady: function onReady (options) {
      var rootVM = this.rootVM;
      var mp = rootVM.$mp;

      mp.status = 'ready';

      callHook$2(rootVM, 'onReady', options);
    },
    // 生命周期函数--监听页面显示
    onShow: function onShow (options) {
      var rootVM = this.rootVM;
      var mp = rootVM.$mp;

      mp.status = 'show';
      callHook$2(rootVM, 'onShow', options);
    },
    // 生命周期函数--监听页面隐藏
    onHide: function onHide (options) {
      var rootVM = this.rootVM;
      var mp = rootVM.$mp;

      mp.status = 'hide';
      callHook$2(rootVM, 'onHide', options);
    },
    // 生命周期函数--监听页面卸载
    onUnload: function onUnload (options) {
      var rootVM = this.rootVM;
      var mp = rootVM.$mp;

      mp.status = 'unload';
      callHook$2(rootVM, 'onUnload', options);
    },
    // 页面相关事件处理函数--监听用户下拉动作
    onPullDownRefresh: function onPullDownRefresh (options) {
      var rootVM = this.rootVM;

      callHook$2(rootVM, 'onPullDownRefresh', options);
    },
    // 页面上拉触底事件的处理函数
    onReachBottom: function onReachBottom (options) {
      var rootVM = this.rootVM;

      callHook$2(rootVM, 'onReachBottom', options);
    },
    // 用户点击右上角转发
    onShareAppMessage: function onShareAppMessage (options) {
      var rootVM = this.rootVM;
      //fixed by xxxxxx
      if(options.currentTarget){
        options.target = options.currentTarget
      }
      return callHook$2(rootVM, 'onShareAppMessage', options)
    },
    // 页面滚动触发事件的处理函数
    onPageScroll: function onPageScroll (options) {
      var rootVM = this.rootVM;

      callHook$2(rootVM, 'onPageScroll', options);
    },
    // 当前是 tab 页时，点击 tab 时触发
    onTabItemTap: function onTabItemTap (options) {
      var rootVM = this.rootVM;

      callHook$2(rootVM, 'onTabItemTap', options);
    },
    // 支付宝小程序: 标题被点击
    onTitleClick: function onTitleClick () {
      var rootVM = this.rootVM;

      callHook$2(rootVM, 'onTitleClick');
    },
    _pe: function _pe (e) {
      this.proxyEvent(e);
    },
    proxyEvent: function proxyEvent$1 (e) {
      var rootVM = this.rootVM;
      proxyEvent(rootVM, e);
    }
  });
};

var app$1 = {};

app$1.init = function (opt) {
  var obj;

  var _App;

  try {
    _App = App;
  } catch (err) {
    // 支付宝小程序中 App() 必须在 app.js 里调用，且不能调用多次。
    _App = my.__megalo.App; // eslint-disable-line
  }

  _App({
    data: ( obj = {}, obj[ROOT_DATA_VAR] = {}, obj),
    //	Function	生命周期函数--监听小程序初始化	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    onLaunch: function onLaunch (options) {
      if ( options === void 0 ) options = {};

      var rootVM = this.rootVM = initRootVM(this, opt, options.query);
      var ref = rootVM.$options;
      var globalData = ref.globalData; if ( globalData === void 0 ) globalData = function () {};
      this.globalData = globalData && (typeof globalData === 'function'
        ? globalData.call(rootVM, options)
        : globalData) || {};
      rootVM.globalData = this.globalData;
      rootVM.$mount();
      callHook$2(rootVM, 'onLaunch', options);
    },
    //	Function	生命周期函数--监听小程序显示	当小程序启动，或从后台进入前台显示，会触发 onShow
    onShow: function onShow (options) {
      var rootVM = this.rootVM;
      callHook$2(rootVM, 'onShow', options);
    },
    //	Function	生命周期函数--监听小程序隐藏	当小程序从前台进入后台，会触发 onHide
    onHide: function onHide () {
      var rootVM = this.rootVM;
      callHook$2(rootVM, 'onHide');
    },
    //	Function	错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
    onError: function onError (msg) {
      var rootVM = this.rootVM;
      callHook$2(rootVM, 'onError', msg);
    },
    //	Function	页面不存在监听函数	当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见下文
    onPageNotFound: function onPageNotFound (options) {
      var rootVM = this.rootVM;
      callHook$2(rootVM, 'onPageNotFound', options);
    },
    globalData: {}
  });
};

function initMP (vm, options) {
  var mpType = options.mpType; if ( mpType === void 0 ) mpType = 'page';
  var _mpPlatform = vm._mpPlatform;

  /* istanbul ignore else */
  if (mpType === 'app') {
    app$1.init({
      Component: vm.constructor,
      options: options,
      platform: _mpPlatform
    });
  } else if (mpType === 'page') {
    page.init({
      Component: vm.constructor,
      options: options,
      platform: _mpPlatform
    });
  }
}

/*  */

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

// import { isTextInputType } from 'mp/util/element'
// import { looseEqual, looseIndexOf } from 'shared/util'
// import { mergeVNodeHook } from 'core/vdom/helpers/index'
// import { warn } from 'core/util/index'

/* istanbul ignore if */
// if (isIE9) {
//   // http://www.matts411.com/post/internet-explorer-9-oninput/
//   document.addEventListener('selectionchange', () => {
//     const el = document.activeElement
//     if (el && el.vmodel) {
//       trigger(el, 'input')
//     }
//   })
// }

var directive = {
  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    if (oldValue !== value) {
      updateVnodeToMP(vnode, HOLDER_TYPE_VARS.value, value);
    }
  },

  inserted: function inserted (el, binding, vnode, oldVnode) {
    // if (vnode.tag === 'select') {
    //   // #6903
    //   if (oldVnode.elm && !oldVnode.elm._vOptions) {
    //     mergeVNodeHook(vnode, 'postpatch', () => {
    //       directive.componentUpdated(el, binding, vnode)
    //     })
    //   } else {
    //     setSelected(el, binding, vnode.context)
    //   }
    //   el._vOptions = [].map.call(el.options, getValue)
    // } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
    //   el._vModifiers = binding.modifiers
    //   if (!binding.modifiers.lazy) {
    //     el.addEventListener('compositionstart', onCompositionStart)
    //     el.addEventListener('compositionend', onCompositionEnd)
    //     // Safari < 10.2 & UIWebView doesn't fire compositionend when
    //     // switching focus before confirming composition choice
    //     // this also fixes the issue where some browsers e.g. iOS Chrome
    //     // fires "change" instead of "input" on autocomplete.
    //     el.addEventListener('change', onCompositionEnd)
    //     /* istanbul ignore if */
    //     if (isIE9) {
    //       el.vmodel = true
    //     }
    //   }
    // }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    // if (vnode.tag === 'select') {
    //   setSelected(el, binding, vnode.context)
    //   // in case the options rendered by v-for have changed,
    //   // it's possible that the value is out-of-sync with the rendered options.
    //   // detect such cases and filter out values that no longer has a matching
    //   // option in the DOM.
    //   const prevOptions = el._vOptions
    //   const curOptions = el._vOptions = [].map.call(el.options, getValue)
    //   if (curOptions.some((o, i) => !looseEqual(o, prevOptions[i]))) {
    //     // trigger change event if
    //     // no matching option found for at least one value
    //     const needReset = el.multiple
    //       ? binding.value.some(v => hasNoMatchingOption(v, curOptions))
    //       : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions)
    //     if (needReset) {
    //       trigger(el, 'change')
    //     }
    //   }
    // }
  }
};

/*  */

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore else */
    if (value !== oldValue) {
      updateVnodeToMP(vnode, HOLDER_TYPE_VARS.vshow, !value);
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    if (value !== oldValue) {
      updateVnodeToMP(vnode, HOLDER_TYPE_VARS.vshow, !value);
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    // if (!isDestroy) {
    //   el.style.display = el.__vOriginalDisplay
    // }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// import config from 'core/config'
// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);

// install platform patch function
Vue.prototype.__patch__ = patch;
Vue.prototype._v = createTextVNode$1;
Vue.prototype._ri = renderIf;
Vue.prototype.$updateMPData = updateMPData;

Vue.prototype._l = aop(Vue.prototype._l, {
  after: afterRenderList
});

var oInit = Vue.prototype._init;
Vue.prototype._init = function (options) {
  if ( options === void 0 ) options = {};

  if (!Vue.prototype._mpPlatform) {
    Vue.prototype._mpPlatform = getMPPlatform();
  }

  var $mp = options.$mp;
  var parent = options.parent; if ( parent === void 0 ) parent = {};
  var mpType = options.mpType; if ( mpType === void 0 ) mpType = '';
  //fixed by xxxxxx
  if(!mpType && this.constructor.extendOptions && this.constructor.extendOptions.mpType){
    options = this.constructor.extendOptions
    mpType = options.mpType
  }
  
  $mp = $mp || parent.$mp;
  if (!$mp && mpType) {
    initMP(this, options);
  } else if ($mp) {
    delete options.$mp;
    this.$mp = $mp;
    oInit.call(this, options);

    this._t = aop(this._t, {
      after: afterRenderSlot
    });

    this._c = aop(this._c, {
      before: beforeCreateElement
    });

    return this
  } else {
    oInit.call(this, options);
    return this
  }
};

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  if (this.$mp) {
    var vm = mountComponent(this, undefined, undefined);
    initVMToMP(vm);
    return vm
  }
};

/*  */

return Vue;

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ "./node_modules/@dcloudio/uni-mp-alipay/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      title: 'request-payment',
      loading: false,
      price: '',
      providerList: [] };

  },
  onLoad: function onLoad() {

































  },
  methods: {
    weixinPay: function weixinPay() {var _this = this;
      console.log("发起支付");
      this.loading = true;
      uni.login({
        success: function success(e) {
          console.log("login success", e);
          uni.request({
            url: "https://unidemo.dcloud.net.cn/payment/wx/mp?code=".concat(e.code, "&amount=").concat(_this.price),
            success: function success(res) {
              console.log("pay request success", res);
              if (res.statusCode !== 200) {
                uni.showModal({
                  content: "支付失败，请重试！",
                  showCancel: false });

                return;
              }
              if (res.data.ret === 0) {
                console.log("得到接口prepay_id", res.data.payment);
                var paymentData = res.data.payment;
                uni.requestPayment({
                  timeStamp: paymentData.timeStamp,
                  nonceStr: paymentData.nonceStr,
                  package: paymentData.package,
                  signType: 'MD5',
                  paySign: paymentData.paySign,
                  success: function success(res) {
                    uni.showToast({
                      title: "感谢您的赞助!" });

                  },
                  fail: function fail(res) {
                    uni.showModal({
                      content: "支付失败,原因为: " + res.
                      errMsg,
                      showCancel: false });

                  },
                  complete: function complete() {
                    _this.loading = false;
                  } });

              } else {
                uni.showModal({
                  content: res.data.desc,
                  showCancel: false });

              }
            },
            fail: function fail(e) {
              console.log("fail", e);
              _this.loading = false;
              uni.showModal({
                content: "支付失败,原因为: " + e.errMsg,
                showCancel: false });

            } });

        },
        fail: function fail(e) {
          console.log("fail", e);
          _this.loading = false;
          uni.showModal({
            content: "支付失败,原因为: " + e.errMsg,
            showCancel: false });

        } });

    },
    requestPayment: function () {var _requestPayment = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e, index) {var _this2 = this;var orderInfo;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                this.providerList[index].loading = true;_context.next = 3;return (
                  this.getOrderInfo(e.id));case 3:orderInfo = _context.sent;
                console.log("得到订单信息", orderInfo);if (!(
                orderInfo.statusCode !== 200)) {_context.next = 9;break;}
                console.log("获得订单信息失败", orderInfo);
                uni.showModal({
                  content: "获得订单信息失败",
                  showCancel: false });return _context.abrupt("return");case 9:



                uni.requestPayment({
                  provider: e.id,
                  orderInfo: orderInfo.data,
                  success: function success(e) {
                    console.log("success", e);
                    uni.showToast({
                      title: "感谢您的赞助!" });

                  },
                  fail: function fail(e) {
                    console.log("fail", e);
                    uni.showModal({
                      content: "支付失败,原因为: " + e.errMsg,
                      showCancel: false });

                  },
                  complete: function complete() {
                    _this2.providerList[index].loading = false;
                  } });case 10:case "end":return _context.stop();}}}, _callee, this);}));function requestPayment(_x, _x2) {return _requestPayment.apply(this, arguments);}return requestPayment;}(),


    getOrderInfo: function getOrderInfo(e) {
      var appid = "";



      var url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=' + this.price;
      return new Promise(function (res) {
        uni.request({
          url: url,
          success: function success(result) {
            res(result);
          },
          fail: function fail(e) {
            res(e);
          } });

      });
    },
    priceChange: function priceChange(e) {
      console.log(e.detail.value);
      this.price = e.detail.value;
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ "./node_modules/@dcloudio/uni-mp-alipay/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      msg: '' };

  },
  onLoad: {
    toHome: function toHome() {
      this.$emit('toHome', this.toHome); //主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
    } },

  methods: {
    toClickMenu: function toClickMenu() {// 去点餐
      console.log('去点餐');
      uni.navigateTo({
        url: '../shopMall/index' });

    },
    toPay: function toPay() {// 去买单
      console.log('去买单');
      uni.navigateTo({
        url: '../API/request-payment/request-payment' });

    },
    toMy: function toMy() {
      uni.navigateTo({
        url: '../my/index' });

    },
    toHome: function toHome() {
      uni.navigateTo({
        url: '../home/home' });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-alipay/dist/index.js */ "./node_modules/@dcloudio/uni-mp-alipay/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=template&id=33108c83&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue?vue&type=template&id=33108c83& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    { attrs: { _hid: 0 } },
    [
      _c("page-head", {
        attrs: { title: _vm.title, _hid: 1, _batrs: "title", _cid: 0 }
      }),
      _c("view", { staticClass: "uni-padding-wrap", attrs: { _hid: 1003 } }, [
        _c(
          "view",
          {
            staticStyle: { background: "#FFF", padding: "50rpx 0" },
            attrs: { _hid: 1004 }
          },
          [
            _c(
              "view",
              {
                staticClass: "uni-hello-text uni-center",
                attrs: { _hid: 1005 }
              },
              []
            ),
            _c(
              "view",
              {
                staticClass: "uni-h1 uni-center uni-common-mt",
                attrs: { _hid: 1007 }
              },
              [
                _c(
                  "text",
                  { staticClass: "rmbLogo", attrs: { _hid: 1008 } },
                  []
                ),
                _c("input", {
                  staticClass: "price",
                  attrs: {
                    type: "digit",
                    value: _vm.price,
                    maxlength: "4",
                    _hid: 1010,
                    _batrs: "value"
                  },
                  on: { input: _vm.priceChange }
                })
              ]
            )
          ]
        ),
        _c("view", {
          staticClass: "uni-btn-v uni-common-mt",
          attrs: { _hid: 1011 }
        })
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=template&id=07957cae&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue?vue&type=template&id=07957cae& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { _hid: 0 } }, [
    _c("view", { staticClass: "tabbar-nav", attrs: { _hid: 1 } }, [
      _c("view", { staticClass: "flex-item1", attrs: { _hid: 2 } }, [
        _c("img", {
          attrs: { src: __webpack_require__(/*! ../../static/images/icon_home.png */ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_home.png"), _hid: 3 },
          on: {
            click: function($event) {
              _vm.toHome()
            }
          }
        }),
        _c("span", { attrs: { _hid: 4 } }, [])
      ]),
      _c(
        "view",
        {
          staticClass: "flex-item1",
          attrs: { _hid: 6 },
          on: {
            click: function($event) {
              _vm.toClickMenu()
            }
          }
        },
        [
          _c("img", {
            attrs: {
              src: __webpack_require__(/*! ../../static/images/icon_order.png */ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_order.png"),
              _hid: 7
            }
          }),
          _c("span", { attrs: { _hid: 8 } }, [])
        ]
      ),
      _c(
        "view",
        {
          staticClass: "flex-item1",
          attrs: { _hid: 10 },
          on: {
            click: function($event) {
              _vm.toPay()
            }
          }
        },
        [
          _c("img", {
            attrs: {
              src: __webpack_require__(/*! ../../static/images/icon_money.png */ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_money.png"),
              _hid: 11
            }
          }),
          _c("span", { attrs: { _hid: 12 } }, [])
        ]
      ),
      _c(
        "view",
        {
          staticClass: "flex-item1",
          attrs: { _hid: 14 },
          on: {
            click: function($event) {
              _vm.toMy()
            }
          }
        },
        [
          _c("img", {
            attrs: { src: __webpack_require__(/*! ../../static/images/icon_my.png */ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_my.png"), _hid: 15 }
          }),
          _c("span", { attrs: { _hid: 16 } }, [])
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages.json":
/*!***********************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue":
/*!**********************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _request_payment_vue_vue_type_template_id_33108c83___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request-payment.vue?vue&type=template&id=33108c83& */ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=template&id=33108c83&");
/* harmony import */ var _request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request-payment.vue?vue&type=script&lang=js& */ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./request-payment.vue?vue&type=style&index=0&lang=css& */ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _request_payment_vue_vue_type_template_id_33108c83___WEBPACK_IMPORTED_MODULE_0__["render"],
  _request_payment_vue_vue_type_template_id_33108c83___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./request-payment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./request-payment.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=template&id=33108c83&":
/*!*****************************************************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/API/request-payment/request-payment.vue?vue&type=template&id=33108c83& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_template_id_33108c83___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./request-payment.vue?vue&type=template&id=33108c83& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\API\\request-payment\\request-payment.vue?vue&type=template&id=33108c83&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_template_id_33108c83___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_request_payment_vue_vue_type_template_id_33108c83___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue":
/*!****************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabBar_vue_vue_type_template_id_07957cae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabBar.vue?vue&type=template&id=07957cae& */ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=template&id=07957cae&");
/* harmony import */ var _tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabBar.vue?vue&type=script&lang=js& */ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabBar.vue?vue&type=style&index=0&lang=css& */ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tabBar_vue_vue_type_template_id_07957cae___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tabBar_vue_vue_type_template_id_07957cae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./tabBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./tabBar.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=template&id=07957cae&":
/*!***********************************************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/pages/components/tabBar.vue?vue&type=template&id=07957cae& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_template_id_07957cae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./tabBar.vue?vue&type=template&id=07957cae& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\waiBaoProject\\new_project\\new_project\\pages\\components\\tabBar.vue?vue&type=template&id=07957cae&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_template_id_07957cae___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_1_6_2_20190220_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_tabBar_vue_vue_type_template_id_07957cae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon.jpg":
/*!***********************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon.jpg ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_home.png":
/*!****************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon_home.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD20lEQVRYR+2XfWhbVRjGnyfNurY6JH6AoChMFGWgoojIUJRu84NOcQgylGkVA7Xk3pNG6he66CZapeSe3FglA3X+NakKymDT6YZSJuh/g4mKAxUzFD+KKIbS3PvIGclIv78iIuz9J+Gee97nx7nnec97iP84uBJ9z/PuJPmbtfbT5eZZLgCNMS8D6JMkAI9ba4eWA7FkgEwms7qtre0tAHdI+gvAapKrJL2ZSqV68/l8vBSQJQFks9kzJe0FcJ2kX0huknQ6SffsDEkfVKvVLeVy+e/FQiwaIJfLXVir1T4meZGkY8lksnt4ePh7JzQwMHBJFEUHSF4g6QiATdbanxcDsSgAY8yVkj4keQ6Az0j2FAqF35sFcrnc2XXAyyUdj+N4YxiGXy4EsSCAMeZWSW+T7ALwXhRFd4dhODFb4nQ63dXZ2fkuyZvd/pB0e7FYPDQfxLwAxpgHAOwCkADwShAE/QDcrp8z8vl8Ynx8/FWSD0mKJN1bLBb3zDVhTgBjzE4ATzqbkXwsCIIXF1rO5nHf97MAhkk6jR1BEDw92/wZAOl0elVXV9frAO6RNOl+rbWjSxFvvOv7fg+AUZIdkvZUq9Vt5XLZ5TwZUwAGBwfXTExM7CV5A4A/SW4uFAqfLEe8McfzvKtJOoekJI11dHT0DA0N/dEYPwmQyWTOb2tr2w9gnaSfEonEhkKhcHQl4o252Wx2raQDANYC+EbSRmvtD278BEA2m10Xx/FHJM8FcDSKolvCMPyxFeKNHH19fan29vZ9JK8F8KukbmvtEVfT1wPYB2CN27Ukd1YqlR2jo6NRKwHqn3cQwCP1PeGq5Rb6vr/f+bZZLI7jrfNZZzlgvu8/R/KJ5rmuatLzvItJbiXpvL7dvSDJlVL3zVoWxhhXQ0r1hM84mSiK3p/iAt/3D5K8CUB3EAQHW6YOwBhzPwBn791BELj/J+L/B+D6gWQyeZ8kV++vdweUs63byJOTk97IyIjrEWZES1agXiW/AHAFgAqAb+tKV9Vd9I619q5/DaBu2TEAYaVSyTZb1ff93SS31Wq180ql0vHpEC1ZAWPMjQAOkTSFQsE2i/i+/wLJR2u12mWlUumrUwCnVmD6Cnie15tIJF4D8EYQBL2zFiJjjCu/GyRttta6VntKrGQT+r7/vOusJL1krXWH0sxKaIxxt5tBSYddEzEdQNI1JG8D8J0rqdPGn3K9o6RdJKfYUFKK5MMAknEcry8Wi4dnBejv7z8rmUyOkby0ledAI5ek7dbaZ5tzz+gJ3e0njuMHSZ7WQoivoyj6PAzDY9NzLngvaCHErKn+AS/uQGnQ9fAdAAAAAElFTkSuQmCC"

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_money.png":
/*!*****************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon_money.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADA0lEQVRYR82XT2hdRRTGv+++t1GqzUIprQ8FY9WFBf8ULLgoiAuxIIJkpa2gqBWTzLzspIu+orgKuXNenoJtXWgRBBFcuhFBVNxoCyJo2yCKLeJColFEmjdfmTZJX5O2b265Nd7tfPPN7545c2YOsc4f13l9rAGYmJhoNRqNA5KeIdnIAZQkkr9I+qLRaOyfmZk5njMvaS4C8N7vBvAWgOsA/Cbpe5LKMCsA3AvgBklnADxlZh9kzLsAMDk5eQ/JYwD+BfCSmb2bY7CsGRsba7RarcckHQZwE8m7yrI8OcxjJQLOuYMknyf5OID5GONOks1hBqvHJT1I8lFJn5P8JI1LWuz3++/1er0fV+tXALz3JyS1libtqrrwML2kPsk3m83mK9PT038v6wcj8AfJG5eIvyL5doxxriiKnBy47PoxRhZFMSrpOZI7ABzr9/s7Zmdn01ZfyAHn3ALJDQA+GhkZebLT6cRhf1VlvNPpFPPz8x8CeELSXjNLyb4WQNJtZvZzFfNcrXPuVpI/SfrMzHZeCuDXEMLWXMOr0TnnjpPcGELYtAYAwA9mtr2q8dTU1J0xxi2Z81LoN4cQzuXbYBIuXA3A8vHNXHxZtlAbgPc+ZXOqhG+k+nElEEmbSO4FUCtAugpWkmpYJLz3qdreXmcEEsCnZvbwsMXTuPf+awBbrwmA9/41APtijA91u90vLwV0TQGcc6na7Sb5clmW3/3nAOu5BUfN7P5MgDkAN9eZA3+mhwiAbwH8nnEM7677GD4r6VWSuZUwMdZXB3LCPqip/RTUBuC9T3t5IoTwQFXTKnrn3DcARs1s4+rL6GTaxxDC9VUMq2iXHiV/STptZnesBjj3KAWwJ4RwpIpxrtY5t4fkO5IOmdkLFwG02+1tMcaj6UaT9HS32/041zhH1263H4kxvg9gpCiK+8qyTMf2io3JKUlzmY3JZRnON00cBXALgH8AvDgY4TWt2fj4+JZms/l6ikJuazYsAktP8iOLi4v7er3e6UH9/685HfY3dY+fBQrCtjBx1BLGAAAAAElFTkSuQmCC"

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_my.png":
/*!**************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon_my.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADoUlEQVRYR+2XX2hcVRDGv283TdyKGK1/HqIiiJU+2LSICBUafFGsiqINCCJipftg3JyzSUyqICxIkYB4Z7LGhxWMDxKp4INRoS+KolIsxYLFFpFGhWKVoGTVRBZ378iBjUSb7L2bLRTBeZ1z5vudOWdm7iUusPEC6+O/C1AqlTLVavV6AJcD+CqKoj82ks22MzA8PLyH5DMkbwGQa4rGAD4hOdvd3X1ocnKymhamHQB6718EMBKCm9kPJI8COGFmmwHsI3mZmS1kMpk9URQdSwORGsA5VyG5H8B8HMf5qampD1YL5PP5zblcbgxAieTvALaLyHdJEKkAvPf3AHgPwNlGo9FfLpcX1gvsnHuI5FsAPhOR3ecL4CMAAyQfiKLonaSgzrlpkk8CuFdE3m+1PjEDQ0NDW7q6uhZIfiMiNyWJB3+xWLzZzL4E8LqIPN4RgHPuLpKHAbwmIk+kAQhrnHNVkvMisrMjAO/9IwDeADAtIk+1AfA9gIyqXtsRgHNuN8mPzWxOVe9PA5DP5zflcrnfAHytqv0dAYyOjl7RaDR+AvDr8vLyVZVK5c8kCOfcYKgEM5tR1X0dATTv802SD5P0URRpq4ClUql7cXHxBICtZnafqobyXdcSqyDsHBkZ2RrHcQiaIbm3RSnSOfcqyfBYj4jIrqRspQJolpYzMzEzI/kKgIMicjb4CoVCD8ldJJ8jeYeZna7X67dNT0//fN4AmhCPxXEcNXt+eAtHmgNpB8lNTbGjJO+OouiXJPHgT50B7/3tAJ42s9AXLloJbmY1kqfCSAbwoYjMhFmVRjwVwODgYLavr+95ABMAwtidIzkH4IulpaXTlUpleS2xQqFwTblcPpME0jIDY2NjF9fr9dDLB8xsNo7jiTRBQ/cE8C6AR1X10EarIMz/0ILvNLNJVT2QdJoVfzh9Npv91MyuAzCsqi+vt3fdDHjvCwCmAKiI+LTiqyCuzGazh82sP47jW8vl8vG1YqwJMD4+fkmtVjtD8lsR2dGu+Mp67334ZjwZPmJ6e3u3l0ql8Ib+YWsCeO/HAUymnf+tAJ1zz5I8aGZ7VfXttACfm9mNqrqlnZJaC6SZzR8BHFPVgUSAYrGYi+N4ieRMO/O/VRa897Nm9qCq/t0/VtafcwXe+23NexsVkZc2ev+r9znnDpB8geQNURTNr/adAzAxMXFprVbbaWanVDWM4Y7NOXc1yW09PT3H//3PkLoVd0yxToD/Af4CJyN1MPVqrRwAAAAASUVORK5CYII="

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_next.png":
/*!****************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon_next.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABBklEQVRYR8XUMQrCMBTG8ZcbNOCBnEUqiOjayUWhDzq49giB7tL7uaSbCCFSodDJJC9faZYsCf8fgRdFKy+1cp+CgKZpNs65p7X23Pf9Gw0OAsZgXdelUupmrT2gEVGAJRHRgAlBRPdhGErUSyQBRgQzn7z3VxQiGYBGiABzhNZ637btRzodYsCEIKKqKIqjFJEFQCCyAbkICCAHAQNIEVCABAEHzBAP59yu67rXvxFdClB57y9a60NoPOEAZq6IaGuMGffgggJS46MOBpDEYQBpHALIiWcDcuNZAERcDEDFRQBkPBmAjicBlohHA5aKRwGYuSCi1hjDwY9dcAD2FQvavyurA74RUaMhrdiFPwAAAABJRU5ErkJggg=="

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_order.png":
/*!*****************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon_order.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACzUlEQVRYR+WVQUhUURSG//NmpnA2oQwuBFvoQloZFIUIEWEGUYsiykVEkEyQDPe+ERqwRYNFi9DeHN4EMWBQBLppVRRKtKhAWgRRmyLFjQhBOKvGKee9E1c0NDXnWeMQ3cXbvHPP/93//e9cQpUXVVkf/yaAbdt1IpIRkaPGQSJ6QkTacZzZoI5uygGt9RsAzQAeLwoeE5EJZt5bcQDbtjtFZLRUKjVls9kpI2jbdpOITBLREcdxxoJABHZAa31FRE4zc+tyIaXUewDDzHyj0gD9InLY9/0LoVConoimHceZUEqNAxhj5qsVAVBKtRDRcRHpJqKWtURE5AMRDYnII2b+WA7Ihp9Aa70bQAZAG4AXAJ4CGCeiz/l8fiYWi4WKxWJ9OBxuEJF9RGT+jAOmBoDOZDJvfweyLkA8Ho9Go9HbAM6IyB3Lsq6X+5v19vbGSqVSH4BLRDRcKBR6crlcYS2QNQGSyWSr53kPAcz6vn/Sdd3pcuz8tSaZTDYu9qmzLOuE4zgmqCvWKoBEItFsWdZrAM9ra2vPptPp75sRX9qTTqe35fP5BwAO+b6/33XdyeX9VgAsWmeGzDgzd/2J8K97lVIjJkfhcHjP4ODgl6X3KwCUUs8ARObm5jpyudz83wSIx+ORmpoa03+emTtWAWitkwD6iWhnuWELCmgc9jzvk4j0M7OzcI+YRyKR2B4KhWZEJBt0kASF0Fr3mIN6ntfguu63BQCtdbeI3IxEIo0DAwNfgzYNWE9a6ykRucbMQwsAZowS0btMJnMxYLNNlSulbplAMnMbpVKpHcViMQ/gIDObSVfxpbVuF5GXRFRn7DglIiPMHK648jIBpVSJiLpIKZUCcJ6Zd20xgLm47hoHHBFpJ6LLWwlgQg/glXHgHhGd20rxJS0Rub/hdVxpsOoDKKX6iKiz0iddp/+oyUB1Aap08p+y1c/Af+/AD8d2KVXYBkrTAAAAAElFTkSuQmCC"

/***/ }),

/***/ "F:\\waiBaoProject\\new_project\\new_project\\static\\images\\icon_score.png":
/*!*****************************************************************************!*\
  !*** F:/waiBaoProject/new_project/new_project/static/images/icon_score.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD4ElEQVRYR+2XXWibVRjH//+T9GMtnVvnB2vXIXa2iUMQRaw3UrzwSld90ygOpxdjU0GodTWds2DUadt3s4q7mN/iLgRNUruJDEVwN8M5BBF1ffslVdsM/AA1mKXr+55H3tSM2uarM6E35i7nPOc8v/ec5/fkDbHKH65yfqwIINx+ZXVqQ2WDQzRCexqUkiYBhOCshjMLW8dTc5g5dHxyrtgHKwiwJ7jlGq/2bhOwA5CbSOZdIyIu0GlARkQ7R80PJkbzweTcrDfQerdA7SdxdbFPkzVOZFxT+g5ExyLZ5pcBuMecvLT6PYLb/lPiJYsFEq35NbUjfGI6tXhqGUCo0/chwdtLmTyzl0COmVGrIyfAXqPlRlGe0+VIntmTwusHYme+uvB9cbJQwPcIyUPlBBDRD5uxsVdyALQ+RKrD5QWQB82Y9VpWgL2Blqs01ThBTzkgBOIoG1sGRqzprADuYG+n/1kAfWUCeNqMWuG8FqQhAq1dQvYTXFMaEHHVe3Qwar26dL9lGvYEfTcfjFin9hj+zR6l+yhqO4iaiwIRJIX6XXvefmbo6NRMT9DXdjBifZ7zBPYZ/o22kikKPp1zUve/NDL9e89tV9SquvWdAB4A0F5UKyY+A/jOeSYiL0Zmzj1xl2+Do3iExC0ejZbnh0fPZrfA8O+kwhvupIgkALyNeRk0j43F3bFgEJ7m5Oa1UuOtg66ug7LXO1AObCY83rk/mbQT1R/9+EcY0G58OLi1MuU420XBBHiZO0bROwdiY29lBegN+HaBvKDIQlD6/t4HZJg2vx4YsX5wB7NdSRhQCcPf5FX6OoAGgA6AlyyO1cCuA9HR9EOmgRZPPhlsaZzXaopkVa47F5E5gN+D8vO/YoSXk2gGUJlvbYXSzc9Fxmdzavh4wN+tiKGLKroCiwSyz4xa/QU1DBn+HVA4TKC2VCAi8rIZs7oKatgb9F07GLG+eayjuamiomK/CO7JdyWFAN2fYYf2Uy9EJs+EDH+bOTx6KucJuDVgi5oUQVemX3cHt9ZXan2vAPeRaCuUcMEgTBByQsF5sz828UX4joaaZOVat/CMvDUQCvh2k/ynW8knEAwNxqyPM0m7g5vWVKGqEVKxyRFsVESj+04ogriHOOsIZ2t/O/dT5qUj3A5vsr71TlANkWhakEp2D8as14vWUES+JHFEtHxb4/GeDEe+O5/vFFz3/7LtW5WiIWSAQH3pNEy3VjkJcAKQXxYaC9cJxdWvDkJF4IZcrdtV+H8NC2qYCSiHhtlqp+Afk1JomK9oCwIsXpxNw/S8RpwK8aUaFtMzVgRQzIYrjVl1gL8BfrXIMKBWL9QAAAAASUVORK5CYII="

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-alipay/common/vendor.js.map