(function () {

    'use strict';

    function memberLoginController(
            $scope,
            $http,
            $location,
            editorState,
            navigationService,
            contentResource,
            editorService,
            languageResource
        ) {

        var vm = this;

        vm.member = editorState.current.name;
        vm.node = null;
        vm.languages = [];
        vm.selectedLanguage = {};
        vm.languageSelectorIsOpen = false;

        vm.init = init;
        vm.close = close;
        vm.login = login;
        vm.pickRedirectPage = pickRedirectPage;
        vm.toggleLanguageSelector = toggleLanguageSelector;



        // ##########################"



        // ## Toggle language selector
        function toggleLanguageSelector() {
            vm.languageSelectorIsOpen = !vm.languageSelectorIsOpen;
        };


        // Open editorService contentpicker
        function pickRedirectPage() {
            navigationService.allowHideDialog(false);
            editorService.contentPicker({
                submit: function (model) {
                    // Get the first selected content node
                    vm.node = model.selection[0];

                    console.log(vm.node);

                    // Get node data
                    contentResource.getById(vm.node.id).then(function (data) {

                        console.log(data);

                        // Update the UI
                        //vm.node = data;
                        //vm.node.status = !vm.node.published ? 'This item is not published' : '';

                    });

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
            // load languages
            loadLanguages().then(function (languages) {
                vm.languages = languages;

                if (vm.languages.length > 1) {
                    var currCulture = null;
                    var mainCulture = $location.search().mculture;
                    if (mainCulture) {
                        currCulture = _.find(vm.languages, function (l) {
                            return l.culture.toLowerCase() === mainCulture.toLowerCase();
                        });
                    }
                    vm.selectedLanguage = currCulture;
                }
            });
        }

        // ## This loads the language data, if the are no variant content types configured this will return no languages
        function loadLanguages() {
            return contentResource.allowsCultureVariation().then(function (b) {
                if (b === true) {
                    return languageResource.getAll();
                }
            });
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
                            window.open(data, '_blank');
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