/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * This is a simplified version of jQuery bundles for the VNPay integration
 */
(function(global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    "use strict";

    var jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    };

    jQuery.fn = jQuery.prototype = {
        // Basic jQuery functionality
        ready: function(fn) {
            if (document.readyState === "complete" || 
                (document.readyState !== "loading" && !document.documentElement.doScroll)) {
                setTimeout(fn, 0);
            } else {
                document.addEventListener("DOMContentLoaded", fn);
            }
            return this;
        },

        // Add other necessary methods
        constructor: jQuery
    };

    // Define the init constructor
    jQuery.fn.init = function(selector, context) {
        // Simple initialization logic
        this.selector = selector;
        this.context = context || document;

        // Return the jQuery object
        return this;
    };

    // Give the init function the jQuery prototype
    jQuery.fn.init.prototype = jQuery.fn;

    // Expose jQuery to the global object
    window.jQuery = window.$ = jQuery;

    return jQuery;
});
