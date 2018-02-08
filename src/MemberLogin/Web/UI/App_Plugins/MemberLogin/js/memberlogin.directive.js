(function () {

    'use strict';

    function memberLoginDirective(
            entityResource
        ) {
        return {
            scope: {
                value: '=',
                config: '='
            },
            restrict: 'E',
            replace: true,
            templateUrl: '/App_Plugins/MemberLogin/views/memberlogin.directive.html',
            link: function (scope) {
                
                function initValue() {
                    
                    if (!scope.value) scope.value = {};

                    if (!scope.value.contentId) return;

                    // Get the content object by Id using the entityResource
                    entityResource.getById(scope.value.contentId, 'content').then(function (data) {
                        setContent(data);
                    });

                }

                function setContent(node) {

                    // Make sure we have an object for the value property
                    if (!scope.value) scope.value = {};

                    // Reset
                    if (!node) {
                        scope.value.contentId = 0;
                        scope.node = null;
                        return;
                    }

                    // Set the content Id in the value
                    scope.value.contentId = node.id;

                    // Update the UI
                    scope.node = node;

                }

                scope.removeContent = function () {
                    setContent();
                }
                
                scope.selectContent = function () {

                    scope.$parent.vm.dialogOpen = true;

                    scope.contentPickerOverlay = {
                        view: 'contentPicker',
                        title: 'Select content',
                        multiPicker: false,
                        show: true,
                        hideSubmitButton: true,
                        close: function() {

                            scope.$parent.vm.dialogOpen = false;

                            scope.contentPickerOverlay.show = false;
                            scope.contentPickerOverlay = null;

                        },
                        submit: function (model) {
                            
                            // Get the first selected content node
                            var data = model.selection[0];

                            setContent(data);

                            scope.$parent.vm.dialogOpen = false;

                            scope.contentPickerOverlay.show = false;
                            scope.contentPickerOverlay = null;

                        }
                    }
                };

                initValue();

            }
        };
    }

    /*
     * @ngdoc Directive
     * @name Mivaweb.PropertyEditor.MemberLoginController
     * 
     * @description
     * Contains the logic of the PropertyEditor MemberLogin
     * 
     */
    angular.module('umbraco')
        .directive('memberLogin', memberLoginDirective);

})();