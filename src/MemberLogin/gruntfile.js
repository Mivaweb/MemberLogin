module.exports = function (grunt) {
    grunt.initConfig({

        // Clean the Site project /App_Plugins/MemberLogin folder
        clean: {
            folder: ['../MemberLogin.Site/App_Plugins/MemberLogin'],
            options: { force: true }
        },

        // Create /App_Plugins/MemberLogin folder
        mkdir: {
            all: {
                options: {
                    create: ['../MemberLogin.Site/App_Plugins/MemberLogin']
                }
            }
        },

        // Copy files to the /App_Plugins/MemberLogin folder
        copy: {
            files: {
                cwd: 'Web/UI/App_plugins/MemberLogin',
                src: '**/*',
                dest: '../MemberLogin.Site/App_Plugins/MemberLogin',
                expand: true
            }
        },

        // Watch when files are updated => copy to the Site project /App_Plugins/MemberLogin folder
        watch: {
            memberlogin: {
                files: ['Web/UI/App_plugins/MemberLogin/**/*'],
                tasks: ['copy']
            }
        }

    });


    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mkdir');
};