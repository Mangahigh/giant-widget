/*global giant */
$oop.postpone(giant, 'WidgetCollection', function () {
    "use strict";

    var base = $data.Collection.of(giant.Widget),
        self = base.extend();

    /**
     * Creates a WidgetCollection instance.
     * @name giant.WidgetCollection.create
     * @function
     * @param {object} [items]
     * @returns {giant.WidgetCollection}
     */

    /**
     * The WidgetCollection is a specified collection merging the Collection API with the Widget API.
     * Also allows serialization of all widgets in the collection into a single string.
     * @class
     * @extends $data.Collection
     * @extends giant.Widget
     */
    giant.WidgetCollection = self
        .addMethods(/** @lends giant.WidgetCollection# */{
            /**
             * Generates the markup for all widgets in the collection, in the order of their names.
             * @returns {string}
             */
            toString: function () {
                return this.callOnEachItem('toString')
                    .getSortedValues()
                    .join('');
            }
        });
});

$oop.amendPostponed($data, 'Hash', function () {
    "use strict";

    $data.Hash
        .addMethods(/** @lends $data.Hash# */{
            /**
             * Converts `Hash` to `WidgetCollection`.
             * @returns {giant.WidgetCollection}
             */
            toWidgetCollection: function () {
                return giant.WidgetCollection.create(this.items);
            }
        });
});

(function () {
    "use strict";

    $oop.extendBuiltIn(Array.prototype, /** @lends Array# */{
        /**
         * Converts array of `Widget` instances to a `WidgetCollection`.
         * @returns {giant.WidgetCollection}
         */
        toWidgetCollection: function () {
            return giant.WidgetCollection.create(this);
        }
    });
}());
