(function () {

    'use strict';

    function memberLoginController(
        $scope,
        $http,
        editorState,
        contentResource) {

        var vm = this;

        vm.isNew = false;

        // Check if you are creating a new member
        vm.isNew = editorState.current.id <= 0;

        // Define the login as member function
        vm.loginAsMember = login;
 

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

    angular.module('umbraco')
        .controller('MemberLoginController', memberLoginController);

})();