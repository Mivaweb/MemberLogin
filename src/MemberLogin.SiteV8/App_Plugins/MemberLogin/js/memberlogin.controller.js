(function () {

    'use strict';

    function memberLoginController(
            $scope,
            $http,
            editorState,
            navigationService,
            contentResource
        ) {

        var vm = this;

        vm.member = editorState.current.name;
        vm.node = null;
        vm.contentId = 0;

        vm.init = init;
        vm.close = close;
        vm.reset = reset;
        vm.login = login;



        // ##########################"



        // ## Init dialog
        function init() {

            // Set the modal to be passed through the contentPicker
            $scope.model = {
                view: 'itempicker',
                title: 'Select content',
                size: 'small',
                section: 'content',
                treeAlias: 'content',
                multiPicker: false,
                show: true
                //hideSubmitButton: true,
                //submit: function (model) {

                //    // Get the first selected content node
                //    var data = model.selection[0];

                //    setContent(data);

                //}
            }

            // Set view
            vm.view = $scope.model.view;

            setView();
        }

        // ## Close navigation
        function close() {
            navigationService.hideNavigation();
        }

        // ## Reset
        function reset() {
            setContent();
        }

        // ## Set view
        function setView() {

            if (vm.view) {
                
                if (vm.view.indexOf(".html") === -1) {
                    var viewAlias = vm.view.toLowerCase();
                    vm.view = "views/common/overlays/" + viewAlias + "/" + viewAlias + ".html";
                }

            }

        }

        // ## Set Content in UI
        function setContent(node) {

            // Reset
            if (!node) {
                vm.contentId = 0;
                vm.node = null;
                return;
            }

            // Set the ContentId
            vm.contentId = node.id;

            // Get node data
            contentResource.getById(vm.contentId).then(function (data) {

                // Update the UI
                vm.node = data;
                vm.node.status = !vm.node.published ? 'This item is not published' : '';

            });

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