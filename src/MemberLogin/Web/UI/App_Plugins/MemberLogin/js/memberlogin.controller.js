(function () {

    'use strict';



    function memberLoginNavController(
        $scope,
        $http,
        editorState,
        navigationService) {

        var vm = this;

        // Set the member name
        vm.memberName = editorState.current.name;

        vm.doLogin = login;
        vm.close = close;


        //////////////////////////////////

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
                function (response) {

                    // ### Redirect
                    // Open the root page
                    window.open('/', '_blank');

                    // Close navigation
                    navigationService.hideNavigation();

                },
                function (error) { }
            );
        }
    }

    /*
     * @ngdoc Controller
     * @name Mivaweb.Navigation.MemberLoginController
     * 
     * @description
     * Contains the logic of the Navigation MemberLogin
     * 
     */
    angular.module('umbraco')
        .controller('Mivaweb.Navigation.MemberLoginController', memberLoginNavController);



    // ############################



    function memberLoginController(
        $scope,
        $http,
        editorState,
        navigationService,
        contentResource) {

        var vm = this;

        // Check if you are creating a new member
        vm.isNew = editorState.current.id <= 0;

        // Define the login as member function
        vm.doLogin = login;
 

        //////////////////////////////////


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
                    // Get the redirect page from config
                    var urlPageRedirect = $scope.model.config.memberRedirectPage;

                    // Check if page is set in the config
                    if (urlPageRedirect) {
                        contentResource.getNiceUrl(urlPageRedirect).then(function (data) {
                            window.open(data, '_blank') // Get the first url
                        });
                    } else {
                        // Open the root page
                        window.open('/', '_blank');
                    }

                },
                function (error) { }
            );
        }
    }

    /*
     * @ngdoc Controller
     * @name Mivaweb.PropertyEditor.MemberLoginController
     * 
     * @description
     * Contains the logic of the PropertyEditor MemberLogin
     * 
     */
    angular.module('umbraco')
        .controller('Mivaweb.PropertyEditor.MemberLoginController', memberLoginController);

})();