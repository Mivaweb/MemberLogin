(function () {

    'use strict';

    function memberLoginController(
            $scope,
            $http,
            editorState,
            navigationService,
            contentResource,
            editorService
        ) {

        var vm = this;

        vm.member = editorState.current.name;
        vm.node = null;

        vm.init = init;
        vm.close = close;
        vm.login = login;
        vm.pickRedirectPage = pickRedirectPage;



        // ##########################"



        // Open editorService contentpicker
        function pickRedirectPage() {
            navigationService.allowHideDialog(false);
            editorService.contentPicker({
                submit: function (model) {
                    // Get the first selected content node
                    vm.node = model.selection[0];

                    editorService.close();
                    navigationService.allowHideDialog(true);
                },
                close: function () {
                    editorService.close();
                    navigationService.allowHideDialog(true);
                }
            });
        }

        // ## Init dialog
        function init() {

        }

        // ## Close navigation
        function close() {
            navigationService.hideNavigation();
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
                function () {

                    // ### Redirect
                    // Check if page is set in the config
                    if (vm.node && vm.node.id) {
                        contentResource.getNiceUrl(vm.node.id).then(function (data) {
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