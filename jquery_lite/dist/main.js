/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DomNodeCollection {\n  constructor(html_array) {\n    this.collection = html_array;\n  }\n\n  html(arg) {\n    if(arg == undefined) {\n      return this.collection[0].innerHTML;\n    } else {\n      for (let index = 0; index < this.collection.length; index++) {\n        this.collection[index].innerHTML = arg;\n      }\n    }\n  }\n\n  empty() {\n      this.html(\" \");\n  }\n\n  append(arg) {\n    if(arg instanceof DomNodeCollection) {\n      for (let i = 0; i < arg.collection.length; i++) {\n        const outerHtml = arg.collection[i].outerHTML;\n        \n        for (let index = 0; index < this.collection.length; index++) {\n          this.collection[index].innerHTML = this.collection[index].innerHTML + outerHtml;\n        }\n        \n      }\n    }\n    else if(typeof arg === 'string') {\n     for (let index = 0; index < this.collection.length; index++) {\n          this.collection[index].innerHTML = this.collection[index].innerHTML + arg;\n        }\n    } else if(arg instanceof HTMLElement) {\n      for (let index = 0; index < this.collection.length; index++) {\n          this.collection[index].innerHTML = this.collection[index].innerHTML + arg.outerHTML;\n      }\n    }\n  }\n\n  attr(key, val) {\n    let elem = this.collection[0];\n    \n    if(val == undefined) {\n      return elem.getAttribute(key);\n    } else {\n      elem.setAttribute(key, val);\n    }\n  }\n\n  addClass(className) {\n    for (let i = 0; i < this.collection.length; i++) {\n      this.collection[i].setAttribute('class', className);\n      \n    }\n  }\n\n    removeClass(className) {\n      for (let i = 0; i < this.collection.length; i++) {\n        this.collection[i].classList.remove(className);\n      }\n    }\n\n    children() {\n      let children = [];\n      for(let i = 0; i < this.collection.length; i++) {\n        children = children.concat(Array.from(this.collection[i].children));\n      }\n\n      return new DomNodeCollection(children);\n    }\n\n    parent() {\n      let parents = [];\n      for(let i = 0; i < this.collection.length; i++) {\n        parents.push(this.collection[i].parentElement);\n      }\n\n      return new DomNodeCollection(parents);\n    }\n\n    find(selector) {\n      //return this if this.length === 0\n      let elements = [];\n      for (let i = 0; i < this.collection.length; i++) {\n        const arr = Array.from(this.collection[i].querySelectorAll(selector)); \n        elements = elements.concat(arr);\n        \n      }\n      return new DomNodeCollection(elements);\n    }\n\n    remove() {\n      for (let i = 0; i < this.collection.length; i++) {\n        let elem = this.collection[i];\n        elem.parentNode.removeChild(elem);\n      }\n    }\n\n    on(type, cb) {\n      for(let i = 0; i < this.collection.length; i++) {\n        this.collection[i][`myEvent-${type}`] = this.collection[i][`myEvent-${type}`] || [];\n        this.collection[i][`myEvent-${type}`].push(cb);\n        this.collection[i].addEventListener(type, cb);\n      }\n    }\n\n    off(type, cb) {\n      if (typeof cb === 'undefined') {\n        for (let i = 0; i < this.collection.length; i++) {\n          this.collection[i][`myEvent-${type}`].forEach( cb => {\n            this.collection[i].removeEventListener(type, cb);\n         });\n        }\n      } else {\n      for (let i = 0; i < this.collection.length; i++) {\n        this.collection[i].removeEventListener(type, cb);\n      }\n    }\n  }\n  \n\n}\n\nmodule.exports = DomNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nconst funcArr = [];\nconst $l = function(arg) {\n\n  if(arg instanceof Array) {\n    // debugger\n    const domNodeCollection = new DomNodeCollection(arg);\n    return domNodeCollection;\n  } else if (typeof(arg) === \"string\") {\n    // debugger\n    const domNodeCollection = new DomNodeCollection(document.querySelectorAll(arg));\n    return domNodeCollection;\n  } else if (arg instanceof HTMLElement) {\n    // debugger\n    const domeNodeCollection = new DomNodeCollection([arg]);\n    return domeNodeCollection;\n  } else if(arg instanceof Function) {\n    funcArr.push(arg);\n    if (document.readyState === \"complete\") {\n      arg();\n    }\n  }\n}\n\n document.addEventListener(\"DOMContentLoaded\", event => {\n   for (let i = 0; i < funcArr.length; i++) {\n     funcArr[i]();\n   }\n });\n\n $l.extend = function(obj1, obj2, ...objs) {\n   \n     let newObject = {...obj1, ...obj2};\n     for (let i = 0; i < objs.length; i++) {\n     newObject =  {...newObject, ...objs[i]};\n       \n     }\n     obj1 =  newObject;\n     return newObject;\n }\n\n $l.ajax = function(options) {\n   const xhr = new XMLHttpRequest();\n\n   const def = {\n     success: () => {console.log('success')},\n     error: () => {console.log('error')},\n     method: 'GET',\n     url: 'https://cors-anywhere.herokuapp.com/' + \"http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b\",\n     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n     data: {}\n   };\n\n   options = $l.extend(def, options);\n\n  xhr.open(options[\"method\"], options[\"url\"]);\n  xhr.onload = (event) => {\n    if(xhr.status === 200) {\n        options.success(JSON.parse(xhr.response));\n    } else {\n      options.error(JSON.parse(xhr.response));\n    }\n  }\n\n  xhr.send(JSON.stringify(options.data));\n }\n\n \nwindow.$l = $l;\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });