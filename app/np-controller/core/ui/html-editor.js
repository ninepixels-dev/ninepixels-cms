/* global MediumEditor */

'use strict';

htmlEditor.$inject = [];
function htmlEditor() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            if (!ngModel)
                return;

            var editor = new MediumEditor(element, {
                autoLink: true,
                targetBlank: true,
                placeholder: false,
                toolbar: {
                    relativeContainer: element.parent()[0],
                    buttons: ['h1', 'h2', 'h3', 'h4', 'quote', 'unorderedlist', 'table', 'bold', 'italic', 'underline', 'anchor', 'removeFormat'],
                    static: true,
                    updateOnEmptySelection: true
                },
                extensions: {
                    table: new MediumEditorTable()
                },
                anchor: {
                    placeholderText: 'Type a link',
                    linkValidation: true,
                    customClassOption: 'btn',
                    customClassOptionText: 'Create Button',
                    targetCheckbox: true,
                    targetCheckboxText: 'Open in new window'
                },
                paste: {
                    cleanPastedHTML: true
                }
            });

            ngModel.$render = function () {
                editor.setContent(ngModel.$viewValue || "");
            };

            editor.subscribe('editableInput', function (e, elem) {
                ngModel.$setViewValue(elem.innerHTML.trim());
            });

            scope.$on('$destroy', function () {
                editor.destroy();
            });
        }
    };
}

angular.module('ninepixels.ui', [])
        .directive('npHtmlEditor', htmlEditor);