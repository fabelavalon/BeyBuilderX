//     Underscore.js 1.13.7
//     https://underscorejs.org
//     (c) 2009-2024 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.


/**
 * Prevent a button from being double-tapped.
 * 
 * When a sequence of calls of the returned function ends, the argument
 * function is triggered. The end of a sequence is defined by the `wait`
 * parameter. If `immediate` is passed, the argument function will be
 * triggered at the beginning of the sequence instead of at the end.
 * 
 * @param {function} func - callback function
 * @param {int} wait - delay in milliseconds, default 150
 * @param {boolean} immediate - run function at the beginning (true) or end (false), default true
 * @returns 
 */
function debounce(func, wait = 150, immediate = true) {
    var timeout, previous, args, result, context;

    var later = function() {
        var passed = now() - previous;
        if (wait > passed) {
            timeout = setTimeout(later, wait - passed);
        } else {
        timeout = null;
            if (!immediate) result = func.apply(context, args);
            // This check is needed because `func` can recursively invoke `debounced`.
            if (!timeout) args = context = null;
        }
    };

    var debounced = restArguments(function(_args) {
        context = this;
        args = _args;
        previous = now();
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
