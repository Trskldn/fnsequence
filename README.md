# fnsequence

![build status](https://travis-ci.org/Trskldn/fnsequence.svg?branch=master)

run function in sequence

## Instalation

bower
```bash
$ bower i --save fnsequence
```
npm
```bash
$ npm i --save fnsequence
```

## Example

```js
    var fnsequence = require('fnsequence');

    var f1 = function(ctx) {
        ctx.data = 'hello';
    };
    var f2 = function(ctx) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                ctx.asyncdata = 'foo';
                resolve();
            }, 10);
        });
    };
    var f3 = function(ctx) {
        ctx.data2 = new Date();
    };
    var f4 = function(ctx) {
        ctx.data = ctx.data + ' world';
    };

    var f = fnsequence(f1, [f2, f3], f4);
    f().then(function(ctx) {
        console.log(ctx); 
        // {data: 'hello world', data2: Wed May 25 2016 17:55:47 GMT+0300 (EEST), asyncdata: 'foo'}
    });

```