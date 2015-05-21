# node-promise-chain

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Gratipay][gratipay-image]][gratipay-url]

Chains an array of functions that return promises

## Installation

```bash
$ npm install promise-chain
```


## Usage
```javascript
promiseChain(promises[, context]);
```

* **promises** - A list of functions that return a promise when called. Can be an array or a single function. NOTE: supports any promise library that has promises with a *then* function
* **context** - An optional list of context values for the functions. These will be passed as the thisArg when calling the function. Can be an array or a single object.


## Example
```javascript
var promiseChain = require("promise-chain");

// WITHOUT CONTEXT
var promises = [];
for(var i = 0; i < 5; i++) {
    promises.push(function() {
        return new Promise(function(fulfill, reject) {
            setTimeout(function() {
                console.log(Math.round(Math.random() * 100));
                return fulfill();
            }, Math.random() * 5000);
        });
    });
}

promiseChain(promises).then(function() {
    console.log("done");
});

// OUTPUT:
// 5
// 39
// 65
// 48
// 78
// done


// WITH CONTEXT
promises = [];
for(var i = 0; i < 5; i++) {
    promises.push(function() {
        var _this = this;
        return new Promise(function(fulfill, reject) {
            setTimeout(function() {
                console.log(_this.value);
                return fulfill();
            }, Math.random() * 5000);
        });
    });
}

var context = [];
for(var i = 0; i < promises.length; i++) {
    context[i] = {
        value: "test" + i
    };
}

promiseChain(promises, context).then(function() {
    console.log("done");
});

// OUTPUT:
// test0
// test1
// test2
// test3
// test4
// done
```

[npm-image]: https://img.shields.io/npm/v/promise-chain.svg?style=flat
[npm-url]: https://npmjs.org/package/promise-chain
[downloads-image]: https://img.shields.io/npm/dm/promise-chain.svg?style=flat
[downloads-url]: https://npmjs.org/package/promise-chain
[gratipay-image]: https://img.shields.io/gratipay/DanielHuisman.svg?style=flat
[gratipay-url]: https://gratipay.com/DanielHuisman/
