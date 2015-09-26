(function () {
    "use strict";

    module("Renderable");

    /**
     * @class
     * @extends $oop.Base
     * @extends $widget.Renderable
     */
    var Renderable = $oop.Base.extend()
        .addTrait($widget.Renderable)
        .addMethods({
            init: function () {
                $widget.Renderable.init.apply(this, arguments);
            }
        });

    test("Instantiation", function () {
        var htmlAttributes = $widget.HtmlAttributes.create({foo: 'bar'}),
            instance = Renderable.create(htmlAttributes);

        equal(instance.tagName, 'div', "should set tag name to 'div'");
        ok(instance.htmlAttributes.isA($widget.HtmlAttributes), "should add HTML attribute collection");
        strictEqual(instance.htmlAttributes, htmlAttributes, "should set HTML attribute");
    });

    test("Tag name setter", function () {
        var instance = Renderable.create();

        strictEqual(instance.setTagName('foo'), instance, "should be chainable");
        equal(instance.tagName, 'foo', "should set tag name property");
    });

    test("CSS class addition", function () {
        expect(7);

        var instance = Renderable.create(),
            instanceElement = {};

        instance.htmlAttributes.addMocks({
            addCssClass: function (cssClass) {
                equal(cssClass, 'foo', "should add CSS class to htmlAttributes");
                return this;
            }
        });

        instance.htmlAttributes.cssClasses.addMocks({
            toString: function () {
                ok(true, "should fetch serialized CSS class list");
                return 'FOO';
            }
        });

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch DOM element");
                return instanceElement;
            },

            _setAttributeProxy: function (element, attributeName, attributeValue) {
                strictEqual(element, instanceElement, "should pass instance element to attribute setter");
                equal(attributeName, 'class', "should pass 'class' as attribute name");
                equal(attributeValue, 'FOO', "should pass serialized CSS class list as attribute value");
            }
        });

        strictEqual(instance.addCssClass('foo'), instance, "should be chainable");
    });

    test("CSS class reference decrease", function () {
        expect(7);

        var instance = Renderable.create(),
            instanceElement = {};

        instance.htmlAttributes.addMocks({
            decreaseCssClassRefCount: function (cssClass) {
                equal(cssClass, 'foo', "should decrease CSS class ref count on htmlAttributes");
                return this;
            }
        });

        instance.htmlAttributes.cssClasses.addMocks({
            toString: function () {
                ok(true, "should fetch serialized CSS class list");
                return 'FOO';
            }
        });

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch DOM element");
                return instanceElement;
            },

            _setAttributeProxy: function (element, attributeName, attributeValue) {
                strictEqual(element, instanceElement, "should pass instance element to attribute setter");
                equal(attributeName, 'class', "should pass 'class' as attribute name");
                equal(attributeValue, 'FOO', "should pass serialized CSS class list as attribute value");
            }
        });

        strictEqual(instance.decreaseCssClassRefCount('foo'), instance, "should be chainable");
    });

    test("CSS class removal", function () {
        expect(7);

        var instance = Renderable.create(),
            instanceElement = {};

        instance.htmlAttributes.addMocks({
            removeCssClass: function (cssClass) {
                equal(cssClass, 'foo', "should remove CSS class from htmlAttributes");
                return this;
            }
        });

        instance.htmlAttributes.cssClasses.addMocks({
            toString: function () {
                ok(true, "should fetch serialized CSS class list");
                return 'FOO';
            }
        });

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch DOM element");
                return instanceElement;
            },

            _setAttributeProxy: function (element, attributeName, attributeValue) {
                strictEqual(element, instanceElement, "should pass instance element to attribute setter");
                equal(attributeName, 'class', "should pass 'class' as attribute name");
                equal(attributeValue, 'FOO', "should pass serialized CSS class list as attribute value");
            }
        });

        strictEqual(instance.removeCssClass('foo'), instance, "should be chainable");
    });

    test("CSS class tester", function () {
        expect(2);

        var instance = Renderable.create();

        instance.htmlAttributes.cssClasses.addMocks({
            getItem: function (itemName) {
                equal(itemName, 'foo', "should get item from CSS class collection");
                return 'FOO';
            }
        });

        equal(instance.hasCssClass('foo'), true,
            "should return item value returned from CSS class list");
    });

    test("Inline style setter", function () {
        expect(8);

        var instance = Renderable.create(),
            instanceElement = {};

        instance.htmlAttributes.addMocks({
            addInlineStyle: function (styleName, styleValue) {
                equal(styleName, 'foo', "should pass style name to htmlAttribute's style setter");
                equal(styleValue, 'bar', "should pass style value to htmlAttribute's style setter");
                return this;
            },

            removeInlineStyle: function (styleName) {
                equal(styleName, 'foo', "should pass style name to htmlAttribute's style removal");
                return this;
            }
        });

        instance.htmlAttributes.inlineStyles.addMocks({
            toString: function () {
                ok(true, "should fetch serialized inline styles");
                return 'FOO';
            }
        });

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch DOM element");
                return instanceElement;
            },

            _setStyleProxy: function (element, styleAttribute) {
                strictEqual(element, instanceElement, "should pass instance element to style setter");
                equal(styleAttribute, 'FOO', "should pass serialized styles to style setter");
            }
        });

        strictEqual(instance.setInlineStyle('foo', 'bar'), instance, "should be chainable");

        instance.removeMocks();
        instance.htmlAttributes.inlineStyles.removeMocks();

        instance.setInlineStyle('foo', undefined);
    });

    test("Attribute addition", function () {
        expect(7);

        var instance = Renderable.create(),
            instanceElement = {};

        instance.htmlAttributes.addMocks({
            setItem: function (attributeName, attributeValue) {
                equal(attributeName, 'foo', "should pass attribute name to htmlAttribute item setter");
                equal(attributeValue, 'bar', "should pass attribute value to htmlAttribute item setter");
                return this;
            }
        });

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch DOM element");
                return instanceElement;
            },

            _setAttributeProxy: function (element, attributeName, attributeValue) {
                strictEqual(element, instanceElement, "should pass instance element to attribute setter");
                equal(attributeName, 'foo', "should pass attribute name to DOM attribute setter");
                equal(attributeValue, 'bar', "should pass attribute value to DOM attribute setter");
            }
        });

        strictEqual(instance.addAttribute('foo', 'bar'), instance, "should be chainable");
    });

    test("Attribute removal", function () {
        expect(5);

        var instance = Renderable.create(),
            instanceElement = {};

        instance.htmlAttributes.addMocks({
            deleteItem: function (attributeName) {
                equal(attributeName, 'foo', "should pass attribute name to htmlAttribute item removal");
                return this;
            }
        });

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch DOM element");
                return instanceElement;
            },

            _removeAttributeProxy: function (element, attributeName) {
                strictEqual(element, instanceElement, "should pass instance element to attribute removal");
                equal(attributeName, 'foo', "should pass attribute name to DOM attribute removal");
            }
        });

        strictEqual(instance.removeAttribute('foo'), instance, "should be chainable");
    });

    test("Element creation", function () {
        expect(8);

        var instance = Renderable.create()
                .setTagName('customTag'),
            instanceElement = {};

        instance.addMocks({
            _createElementProxy: function (tagName) {
                equal(tagName, 'customTag', "should create element");
                return instanceElement;
            },

            _attributeSetterProxy: function (element, attributeName, attributeValue) {
                strictEqual(element, instanceElement, "should set attribute on element");
                equal(attributeName, 'foo', "should pass attribute name to attribute setter");
                equal(attributeValue, 'bar', "should pass attribute value to attribute setter");
            },

            contentMarkup: function () {
                return 'hello world{{placeholder}}';
            },

            _innerHtmlSetterProxy: function (element, innerHtml) {
                strictEqual(element, instanceElement, "should set innerHTML on element");
                equal(innerHtml, 'hello world',
                    "should pass content markup to innerHTML setter stripped of placeholders");
            }
        });

        instance.htmlAttributes.addMocks({
            getFinalAttributes: function () {
                ok(true, "should fetch final HTML attributes");
                return $widget.HtmlAttributes.create({foo: 'bar'});
            }
        });

        strictEqual(instance.createElement(), instanceElement, "should return created element");
    });

    test("Element getter", function () {
        expect(2);

        var instance = Renderable.create($widget.HtmlAttributes.create().setIdAttribute('hello')),
            instanceElement = {};

        instance.addMocks({
            _getElementByIdProxy: function (elementId) {
                equal(elementId, 'hello', "should get element from DOM by ID");
                return instanceElement;
            }
        });

        strictEqual(instance.getElement(), instanceElement, "should return matching element from DOM");
    });

    test("Rendering into element", function () {
        expect(5);

        var instance = Renderable.create(),
            instanceElement = {},
            targetElement = {};

        instance.addMocks({
            getElement: function () {
                ok(true, "should attempt to fetch existing element");
            },

            createElement: function () {
                ok(true, "should create instance element");
                return instanceElement;
            },

            _appendChildProxy: function (parentElement, childElement) {
                strictEqual(parentElement, targetElement, "should append to target element");
                strictEqual(childElement, instanceElement, "should append instance element");
            }
        });

        strictEqual(instance.renderInto(targetElement), instance, "should be chainable");
    });

    test("Moving DOM into element", function () {
        expect(3);

        var instance = Renderable.create(),
            instanceElement = {},
            targetElement = {};

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch existing element");
                return instanceElement;
            },

            createElement: function () {
                ok(true, "should NOT create instance element");
            },

            _appendChildProxy: function (parentElement, childElement) {
                strictEqual(parentElement, targetElement, "should append to target element");
                strictEqual(childElement, instanceElement, "should append instance element");
            }
        });

        instance.renderInto(targetElement);
    });

    test("Rendering before element", function () {
        expect(6);

        var instance = Renderable.create(),
            instanceElement = {},
            targetElement = {
                parentNode: {}
            };

        instance.addMocks({
            getElement: function () {
                ok(true, "should attempt to fetch existing element");
            },

            createElement: function () {
                ok(true, "should create instance element");
                return instanceElement;
            },

            _insertBeforeProxy: function (parentElement, afterElement, element) {
                strictEqual(parentElement, targetElement.parentNode, "should pass target's parent element");
                strictEqual(afterElement, targetElement, "should pass target element");
                strictEqual(element, instanceElement, "should insert instance element before target");
            }
        });

        strictEqual(instance.renderBefore(targetElement), instance, "should be chainable");
    });

    test("Moving DOM before element", function () {
        expect(4);

        var instance = Renderable.create(),
            instanceElement = {},
            targetElement = {
                parentNode: {}
            };

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch existing element");
                return instanceElement;
            },

            createElement: function () {
                ok(true, "should NOT create instance element");
            },

            _insertBeforeProxy: function (parentElement, afterElement, element) {
                strictEqual(parentElement, targetElement.parentNode, "should pass target's parent element");
                strictEqual(afterElement, targetElement, "should pass target element");
                strictEqual(element, instanceElement, "should insert instance element before target");
            }
        });

        instance.renderBefore(targetElement);
    });

    test("Re-rendering", function () {
        expect(6);

        var instance = Renderable.create(),
            currentElement = {
                parentNode: {}
            },
            newElement = {};

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch current DOM element");
                return currentElement;
            },

            createElement: function () {
                ok(true, "should create a new element");
                return newElement;
            },

            _replaceChildProxy: function (parentElement, afterElement, beforeElement) {
                strictEqual(parentElement, currentElement.parentNode,
                    "should pass current element's parent as parent element");
                strictEqual(afterElement, newElement, "should pass new element parent");
                strictEqual(beforeElement, currentElement, "should pass current element");
            }
        });

        strictEqual(instance.reRender(), instance, "should be chainable");
    });

    test("Re-rendering contents", function () {
        expect(4);

        var instance = Renderable.create(),
            currentElement = {};

        instance.addMocks({
            getElement: function () {
                ok(true, "should fetch current DOM element");
                return currentElement;
            },

            contentMarkup: function () {
                return 'foo{{bar}}';
            },

            _innerHtmlSetterProxy: function (parentElement, innerHtml) {
                strictEqual(parentElement, currentElement,
                    "should pass current element's parent as parent element");
                equal(innerHtml, 'foo', "should re-generate content markup");
            }
        });

        strictEqual(instance.reRenderContents(), instance, "should be chainable");
    });

    test("Serialization without placeholders", function () {
        expect(3);

        var instance = Renderable.create()
            .setTagName('span');

        instance.addMocks({
            contentMarkup: function () {
                ok(true, "should fetch contentMarkup");
                return 'FOO{{placeholder}}';
            }
        });

        instance.htmlAttributes.addMocks({
            toString: function () {
                ok(true, "should serialize attribute list");
                return 'ATTRIBUTES';
            }
        });

        equal(
            instance.toString(),
            '<span ATTRIBUTES>FOO</span>',
            "should return markup with tag, attributes, and custom markup");
    });
}());
