/*jshint node:true */

/** @namespace */
var giant = giant || require('giant-namespace');

if (typeof require === 'function') {
    require('giant-assertion');
    require('giant-oop');
    require('giant-data');
    require('giant-event');
}

/**
 * @function
 * @see http://api.jquery.com
 */
var jQuery = jQuery || require('jquery');

if (typeof document === 'undefined') {
    /**
     * Built-in global document object.
     * @type {Document}
     */
    document = undefined;
}
/**
 * Native DOM element class.
 * @name Element
 */
var Element = Element || undefined;

/**
 * Native DOM event class.
 * @name Event
 */
var Event = Event || undefined;

/**
 * Native number class.
 * @name Number
 * @class
 */

/**
 * Native string class.
 * @name String
 * @class
 */

/**
 * Native array class.
 * @name Array
 * @class
 */

/**
 * @name giant.Hash
 * @class
 */
