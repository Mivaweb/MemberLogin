(function () {

    'use strict';

    function memberLoginController(
            $scope,
            $http,
            $location,
            editorState,
            navigationService,
            contentResource,
            contentTypeResource,
            editorService,
            languageResource
        ) {

        var vm = this;

        vm.member = editorState.current.name;
        vm.node = null;
        vm.languages = [];
        vm.selectedLanguage = {};
        vm.languageSelectorIsOpen = false;
        vm.loaded = false;

        vm.init = init;
        vm.close = close;
        vm.login = login;
        vm.pickRedirectPage = pickRedirectPage;
        vm.toggleLanguageSelector = toggleLanguageSelector;
        vm.selectLanguage = selectLanguage;

        var currNode = null;



        // ##########################"



        // ## Init dialog
        function init() {
            // load languages
            loadLanguages().then(function (languages) {
                vm.languages = languages;

                if (vm.languages.length > 0) {
                    var currCulture = null;
                    var mainCulture = $location.search().mculture;
                    if (mainCulture) {
                        currCulture = _.find(vm.languages, function (l) {
                            return l.culture.toLowerCase() === mainCulture.toLowerCase();
                        });
                    }

                    vm.selectedLanguage = currCulture;
                }
                vm.loaded = true;
            });

        }

        // ## This loads the language data, if the are no variant content types configured this will return no languages
        function loadLanguages() {
            return contentTypeResource.allowsCultureVariation().then(function (b) {
                return languageResource.getAll();
                });
        }

        // ## Toggle language selector
        function toggleLanguageSelector() {
            vm.languageSelectorIsOpen = !vm.languageSelectorIsOpen;
        };

        // ## Open editorService contentpicker
        function pickRedirectPage() {
            navigationService.allowHideDialog(false);
            editorService.contentPicker({
                submit: function (model) {
                    // Get the first selected content node
                    setContent(model.selection[0]);

                    editorService.close();
                    navigationService.allowHideDialog(true);
                },
                close: function () {
                    editorService.close();
                    navigationService.allowHideDialog(true);
                }
            });
        }

        // ## Set Content
        function setContent(data) {
            var node = data;

            // Get node data
            contentResource.getById(data.id).then(function (data) {
                currNode = data;

                // Get the variant and url based on the selected language culture
                getVariant(node);
                getUrl(node);

                vm.node = node;
            });
        }

        // ## Get content node variant based on culture
        function getVariant(node) {
            if (currNode.variants.length > 0) {
                var currVariant = null;
                if (vm.selectedLanguage) {
                    currVariant = _.find(currNode.variants, function (v) {

                        if (v.language !== null) {
                            return v.language.id == vm.selectedLanguage.id;
                        }
                    });
                }

                if (currVariant === null) {
                    currVariant = currNode.variants[0]
                }

                node.variant = currVariant;
                node.published = node.variant.state.toLowerCase() === 'published';
                node.status = !node.published ? 'This item is not published' : '';
                node.name = node.variant.name;
            }
        }

        // ## Get the url based on variant culture
        function getUrl(node) {
            if (currNode.urls.length > 0) {
                var currUrl = null;
                if (vm.selectedLanguage) {
                    currUrl = _.find(currNode.urls, function (u) {
                        if (!u.culture) return false;

                        return u.culture.toLowerCase() === vm.selectedLanguage.culture.toLowerCase();
                    });
                }

                if (currUrl === null) {
                    currUrl = currNode.urls[0];
                }

                node.url = currUrl;

                if (node.published)
                    node.status = node.url.text;
            }
        }

        // ## Change selected language
        function selectLanguage(language) {
            vm.selectedLanguage = language;
            vm.languageSelectorIsOpen = false;

            // Check if we have a node selected
            if (vm.node) {
                getVariant(vm.node);
                getUrl(vm.node);
            }
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
                    if (vm.node && vm.node.id && vm.node.url && vm.node.url.isUrl) {
                        window.open(vm.node.url.text, '_blank');
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
     * @name Mivaweb.MemberLoginController
     * 
     * @description
     * Contains the logic of the MemberLogin
     * 
     */
    angular.module('umbraco')
        .controller('Mivaweb.MemberLoginController', memberLoginController);

})();