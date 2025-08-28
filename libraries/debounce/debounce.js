//     Underscore.js 1.13.7
//     https://underscorejs.org
//     (c) 2009-2024 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
// adapted by Maave

/**
 * Prevent a button from being double-tapped.
 * 
 * When a sequence of calls of the returned function ends, the argument
 * function is triggered. The end of a sequence is defined by the `wait`
 * parameter. If `immediate` is passed, the argument function will be
 * triggered at the beginning of the sequence instead of at the end.
 * 
 * @param {function} func - callback function
 * @param {int} wait - delay in milliseconds, default 200
 * @param {boolean} immediate - run function at the beginning (true) or end (false), default true
 * @returns 
 */
function debounce(func, wait = 200, immediate = true) {
    var timeout, previous, args, result, context;

    var later = function() {
        var passed = performance.now() - previous;
        console.log("time passed: " + passed);
        if (wait > passed) {
            timeout = setTimeout(later, wait - passed);
        } else {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
            // This check is needed because `func` can recursively invoke `debounced`.
            if (!timeout) args = context = null;
        }
    };

    // collect arguments passed by callback func
    var debounced = restArguments(function(_args) {
        context = this;
        args = _args;
        previous = performance.now();
        if (!timeout) {
            timeout = setTimeout(later, wait);
            if (immediate) result = func.apply(context, args);
        }
        return result;
    });

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = args = context = null;
    };

    return debounced;
}


/**
 * Some functions take a variable number of arguments, or a few expected
 * arguments at the beginning and then a variable number of values to operate
 * on. This helper accumulates all remaining arguments past the function’s
 * argument length (or an explicit `startIndex`), into an array that becomes
 * the last argument. Similar to ES6’s "rest parameter".
 * 
 * @param {*} func 
 * @param {*} startIndex 
 * @returns 
 */
function restArguments(func, startIndex) {
    
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
        var length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length),
            index = 0;
        for (; index < length; index++) {
            rest[index] = arguments[index + startIndex];
        }
        
        switch (startIndex) {
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        
        return func.apply(this, args);
    };
}
