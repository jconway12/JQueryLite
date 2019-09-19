class DomNodeCollection {
  constructor(html_array) {
    this.collection = html_array;
  }

  html(arg) {
    if(arg == undefined) {
      return this.collection[0].innerHTML;
    } else {
      for (let index = 0; index < this.collection.length; index++) {
        this.collection[index].innerHTML = arg;
      }
    }
  }

  empty() {
      this.html(" ");
  }

  append(arg) {
    if(arg instanceof DomNodeCollection) {
      for (let i = 0; i < arg.collection.length; i++) {
        const outerHtml = arg.collection[i].outerHTML;
        
        for (let index = 0; index < this.collection.length; index++) {
          this.collection[index].innerHTML = this.collection[index].innerHTML + outerHtml;
        }
        
      }
    }
    else if(typeof arg === 'string') {
     for (let index = 0; index < this.collection.length; index++) {
          this.collection[index].innerHTML = this.collection[index].innerHTML + arg;
        }
    } else if(arg instanceof HTMLElement) {
      for (let index = 0; index < this.collection.length; index++) {
          this.collection[index].innerHTML = this.collection[index].innerHTML + arg.outerHTML;
      }
    }
  }

  attr(key, val) {
    let elem = this.collection[0];
    
    if(val == undefined) {
      return elem.getAttribute(key);
    } else {
      elem.setAttribute(key, val);
    }
  }

  addClass(className) {
    for (let i = 0; i < this.collection.length; i++) {
      this.collection[i].setAttribute('class', className);
      
    }
  }

    removeClass(className) {
      for (let i = 0; i < this.collection.length; i++) {
        this.collection[i].classList.remove(className);
      }
    }

    children() {
      let children = [];
      for(let i = 0; i < this.collection.length; i++) {
        children = children.concat(Array.from(this.collection[i].children));
      }

      return new DomNodeCollection(children);
    }

    parent() {
      let parents = [];
      for(let i = 0; i < this.collection.length; i++) {
        parents.push(this.collection[i].parentElement);
      }

      return new DomNodeCollection(parents);
    }

    find(selector) {
      //return this if this.length === 0
      let elements = [];
      for (let i = 0; i < this.collection.length; i++) {
        const arr = Array.from(this.collection[i].querySelectorAll(selector)); 
        elements = elements.concat(arr);
        
      }
      return new DomNodeCollection(elements);
    }

    remove() {
      for (let i = 0; i < this.collection.length; i++) {
        let elem = this.collection[i];
        elem.parentNode.removeChild(elem);
      }
    }

    on(type, cb) {
      for(let i = 0; i < this.collection.length; i++) {
        this.collection[i][`myEvent-${type}`] = this.collection[i][`myEvent-${type}`] || [];
        this.collection[i][`myEvent-${type}`].push(cb);
        this.collection[i].addEventListener(type, cb);
      }
    }

    off(type, cb) {
      if (typeof cb === 'undefined') {
        for (let i = 0; i < this.collection.length; i++) {
          this.collection[i][`myEvent-${type}`].forEach( cb => {
            this.collection[i].removeEventListener(type, cb);
         });
        }
      } else {
      for (let i = 0; i < this.collection.length; i++) {
        this.collection[i].removeEventListener(type, cb);
      }
    }
  }
  

}

module.exports = DomNodeCollection;