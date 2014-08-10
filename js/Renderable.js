/*global dessert, troop, sntls, shoeshine */
troop.postpone(shoeshine, 'Renderable', function () {
    "use strict";

    var base = troop.Base,
        self = base.extend();

    /**
     * @class
     * @extends troop.Base
     */
    shoeshine.Renderable = self
        .addPrivateMethods(/** @lends shoeshine.Renderable# */{
            /**
             * Proxy for document.createElement.
             * @param {string} tagName
             * @returns {HTMLElement}
             * @private
             */
            _createElementProxy: function (tagName) {
                return document.createElement(tagName);
            },

            /**
             * Proxy for fetching DOM element by its ID.
             * @param {string} elementId
             * @returns {HTMLElement}
             * @private
             */
            _getElementByIdProxy: function (elementId) {
                return document.getElementById(elementId);
            },

            /**
             * Proxy for setting an attribute on a DOM element.
             * @param {HTMLElement} element
             * @param {string} attributeName
             * @param {string} attributeValue
             * @private
             */
            _attributeSetterProxy: function (element, attributeName, attributeValue) {
                element.setAttribute(attributeName, attributeValue);
            },

            /**
             * Proxy for setting a DOM element's inner HTML.
             * @param {HTMLElement} element
             * @param {string} innerHtml
             * @private
             */
            _innerHtmlSetterProxy: function (element, innerHtml) {
                element.innerHTML = innerHtml;
            },

            /**
             * Proxy for appending child DOM element to parent.
             * @param {HTMLElement} parentElement
             * @param {HTMLElement} childElement
             * @private
             */
            _appendChildProxy: function (parentElement, childElement) {
                parentElement.appendChild(childElement);
            },

            /**
             * Proxy for inserting DOM element before another one.
             * @param {HTMLElement} parentElement
             * @param {HTMLElement} afterElement
             * @param {HTMLElement} element
             * @private
             */
            _insertBeforeProxy: function (parentElement, afterElement, element) {
                parentElement.insertBefore(element, afterElement);
            },

            /**
             * Proxy for replacing a DOM element with a different one.
             * @param {HTMLElement} parentElement
             * @param {HTMLElement} afterElement
             * @param {HTMLElement} beforeElement
             * @private
             */
            _replaceChildProxy: function (parentElement, afterElement, beforeElement) {
                parentElement.replaceChild(afterElement, beforeElement);
            }
        })
        .addMethods(/** @lends shoeshine.Renderable# */{
            /**
             * Call from host's .init.
             * @param {string} elementId
             * @param {shoeshine.HtmlAttributes} htmlAttributes
             */
            init: function (elementId, htmlAttributes) {
                /**
                 * @type {string}
                 */
                this.htmlTag = 'div';

                /**
                 * @type {string}
                 */
                this.elementId = elementId;

                /**
                 * @type {shoeshine.HtmlAttributes}
                 */
                this.htmlAttributes = htmlAttributes ?
                    htmlAttributes.clone() :
                    shoeshine.HtmlAttributes.create();
            },

            /**
             * Sets HTML tag property.
             * @param {string} htmlTag
             * @returns {shoeshine.Renderable}
             */
            setHtmlTag: function (htmlTag) {
                dessert.isString(htmlTag, "Invalid HTML tag");
                this.htmlTag = htmlTag;
                return this;
            },

            /**
             * Creates a new DOM element based on the current state of the instance.
             * Has no effect if the instance already has an element in the DOM associated with it.
             * @returns {HTMLElement}
             */
            createElement: function () {
                var element = this._createElementProxy(this.htmlTag),
                    attributeSetterProxy = this._attributeSetterProxy,
                    innerHtml = this.contentMarkup()
                        .toTemplate()
                        .clearPlaceholders();

                // adding attributes to element
                this.htmlAttributes
                    .getFinalAttributes()
                    .forEachItem(function (attributeValue, attributeName) {
                        attributeSetterProxy(element, attributeName, attributeValue);
                    });

                // adding contents to element
                this._innerHtmlSetterProxy(element, innerHtml);

                return element;
            },

            /**
             * Fetches element from DOM associated with current instance.
             * @returns {HTMLElement}
             */
            getElement: function () {
                return this._getElementByIdProxy(this.elementId);
            },

            /**
             * Renders instance into the specified element by appending it to it.
             * @param {HTMLElement} element
             * @returns {shoeshine.Renderable}
             */
            renderInto: function (element) {
                this._appendChildProxy(element, this.createElement());
                return this;
            },

            /**
             * Renders instance before the specified element.
             * @param {HTMLElement} element
             * @returns {shoeshine.Renderable}
             */
            renderBefore: function (element) {
                this._insertBeforeProxy(element.parentNode, element, this.createElement());
                return this;
            },

            /**
             * Re-renders instance by replacing the current DOM element with a new one.
             * Has no effect when instance has never been rendered.
             * External references to the instance's DOM must be updated after re-rendering.
             * @returns {shoeshine.Renderable}
             */
            reRender: function () {
                var element = this.getElement();
                if (element) {
                    this._replaceChildProxy(element.parentNode, this.createElement(), element);
                }
                return this;
            },

            /**
             * @returns {string}
             */
            contentMarkup: function () {
                return '';
            }
        });
});