'use strict';

htmlEditor.$inject = [];
function htmlEditor() {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            if (!ngModel)
                return;

            var editor = new MediumEditor(element, {
                buttonLabels: 'fontawesome',
                toolbar: {
                    relativeContainer: element.parent()[0],
                    buttons: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'quote', 'unorderedlist', 'table', 'bold', 'italic', 'underline', 'anchor', 'removeFormat'],
                    static: true
                },
                placeholder: false,
                extensions: {
                    table: new MediumEditorTable()
                },
                anchor: {
                    placeholderText: 'Type a link',
                    customClassOption: 'btn',
                    customClassOptionText: 'Create Button'
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

angular.module('ninepixels.ui.htmlEditor', [])
        .directive('npHtmlEditor', htmlEditor);