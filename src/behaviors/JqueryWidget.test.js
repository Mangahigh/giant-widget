(function () {
    "use strict";

    module("Jquery Widget");

    // TODO: Test for methodName
    test("Event subscription", function () {
        expect(5);

        var JqueryWidget = $widget.Widget.extend('JqueryWidget')
            .addTrait($widget.JqueryWidget);

        JqueryWidget.addMocks({
            _getGlobalSelector: function (selector) {
                equal(selector, 'hello', "should get global selector for specified selector");
                return 'global';
            },

            _jqueryOnProxy: function (eventName, selector, handler) {
                equal(eventName, 'foo', "should bind jQuery event to specified event name");
                equal(selector, 'global', "should bind jQuery event on specified global selector");
                equal(typeof handler, 'function', "should pass function as handler to jQuery binding");
            }
        });

        strictEqual(JqueryWidget.on('foo', 'hello', 'onEvent'), JqueryWidget, "should be chainable");

        JqueryWidget.removeMocks();
    });

    test("Event unsubscription", function () {
        expect(4);

        var JqueryWidget = $widget.Widget.extend('JqueryWidget')
            .addTrait($widget.JqueryWidget);

        JqueryWidget.addMocks({
            _getGlobalSelector: function (selector) {
                equal(selector, 'hello', "should get global selector for specified selector");
                return 'global';
            },

            _jqueryOffProxy: function (eventName, selector) {
                equal(eventName, 'foo', "should bind jQuery event to specified event name");
                equal(selector, 'global', "should bind jQuery event on specified global selector");
            }
        });

        strictEqual(JqueryWidget.off('foo', 'hello'), JqueryWidget, "should be chainable");

        JqueryWidget.removeMocks();
    });
}());
