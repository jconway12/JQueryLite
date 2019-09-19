const DomNodeCollection = require("./dom_node_collection.js");

const funcArr = [];
const $l = function(arg) {

  if(arg instanceof Array) {
    // debugger
    const domNodeCollection = new DomNodeCollection(arg);
    return domNodeCollection;
  } else if (typeof(arg) === "string") {
    // debugger
    const domNodeCollection = new DomNodeCollection(document.querySelectorAll(arg));
    return domNodeCollection;
  } else if (arg instanceof HTMLElement) {
    // debugger
    const domeNodeCollection = new DomNodeCollection([arg]);
    return domeNodeCollection;
  } else if(arg instanceof Function) {
    funcArr.push(arg);
    if (document.readyState === "complete") {
      arg();
    }
  }
}

 document.addEventListener("DOMContentLoaded", event => {
   for (let i = 0; i < funcArr.length; i++) {
     funcArr[i]();
   }
 });

 $l.extend = function(obj1, obj2, ...objs) {
   
     let newObject = {...obj1, ...obj2};
     for (let i = 0; i < objs.length; i++) {
     newObject =  {...newObject, ...objs[i]};
       
     }
     obj1 =  newObject;
     return newObject;
 }

 $l.ajax = function(options) {
   const xhr = new XMLHttpRequest();

   const def = {
     success: () => {console.log('success')},
     error: () => {console.log('error')},
     method: 'GET',
     url: 'https://cors-anywhere.herokuapp.com/' + "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
     contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
     data: {}
   };

   options = $l.extend(def, options);

  xhr.open(options["method"], options["url"]);
  xhr.onload = (event) => {
    if(xhr.status === 200) {
        options.success(JSON.parse(xhr.response));
    } else {
      options.error(JSON.parse(xhr.response));
    }
  }

  xhr.send(JSON.stringify(options.data));
 }

 
window.$l = $l;



