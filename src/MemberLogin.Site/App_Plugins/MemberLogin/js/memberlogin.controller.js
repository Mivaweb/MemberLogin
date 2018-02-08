(function () {

    'use strict';

    function memberLoginController(
            $scope,
            $http,
            editorState,
            dialogService,
            navigationService,
            contentResource
        ) {

        var vm = this;

        vm.member = editorState.current.name;
        vm.dialogOpen = false;
        vm.node = null;
        vm.contentId = 0;

        vm.close = close;
        vm.openDialog = openDialog;
        vm.reset = reset;
        vm.login = login;

        // ## Close navigation
        function close() {
            dialogService.closeAll();
            navigationService.hideNavigation();
        }

        // ## Reset
        function reset() {
            setContent();
        }

        // ## Open contentPicker dialog
        function openDialog() {

            vm.dialogOpen = true;

            vm.contentPickerOverlay = {
                view: 'contentPicker',
                title: 'Select content',
                multiPicker: false,
                show: true,
                hideSubmitButton: true,
                close: function () {

                    vm.dialogOpen = false;

                    vm.contentPickerOverlay.show = false;
                    vm.contentPickerOverlay = null;

                },
                submit: function (model) {

                    // Get the first selected content node
                    var data = model.selection[0];

                    setContent(data);

                    vm.dialogOpen = false;

                    vm.contentPickerOverlay.show = false;
                    vm.contentPickerOverlay = null;

                }
            }
        }

        // ## Set Content in UI
        function setContent(node) {

            // Make sure we have an object for the node property
            if (!vm.node) vm.node = {};

            // Reset
            if (!node) {
                vm.contentId = 0;
                vm.node = null;
                return;
            }

            // Set the content Id
            vm.contentId = node.id;

            // Update the UI
            vm.node = node;
            vm.node.published = node.metaData.IsPublished;
            vm.node.status = !vm.node.published ? 'This item is not published' : '';
        }

        // ## Login as the selected member
        function login() {

            // ### Setup cookie
            var url = 'backoffice/memberlogin/memberloginapi/dologin';

            // Get the current member id using the editorState
            var _memberId = editorState.current.id;

            // Do Login
            $http.post(
                url,
                _memberId).then(
                function (response) {

                    // ### Redirect
                    // Check if page is set in the config
                    if (vm.contentId) {
                        contentResource.getNiceUrl(vm.contentId).then(function (data) {
                            window.open(data, '_blank')
                        });
                    } else {
                        // Open the root page
                        window.open('/', '_blank');
                    }

                    // Close navigation
                    navigationService.hideNavigation();

                },
                function (error) { }
            );
        }

    }

    /*
     * @ngdoc Controller
     * @name Mivaweb.MemberLoginController
     * 
     * @description
     * Contains the logic of the MemberLogin
     * 
     */
    angular.module('umbraco')
        .controller('Mivaweb.MemberLoginController', memberLoginController);

})();