# kombiner

![build status](https://travis-ci.org/Trskldn/kombiner.svg?branch=master)

multiple inheritance,with super method call, for Backbone classes

## Instalation

bower
```bash
$ bower i --save kombiner
```
npm
```bash
$ npm i --save kombiner
```

global

just  checkout `kombiner.min.js` from this repo

## Example

```js
    var f1 = function() {
    };
    var f2 = function() {
    };
    var f3 = function() {
    };
    var f4 = function() {
    };

    var f = kombiner(f1, f2, f3, f4);
    f().then(function() {
    });

```