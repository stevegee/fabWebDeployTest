module.exports = function (grunt) {
    "use strict";

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * Creates the string for grunt_exec
     * @param  {string} folder name of the destination folder in client
     * @param  {string} target build command to pass along to the child grunt process
     * @return {string}        shell script to execute
     */
    function execute_child_grunt(target, options) {
        var option_list = {
                bower: 'bower install',
//                grunt: 'grunt build:' + target,
                grunt: 'grunt build:Production',
                npm  : 'npm install'
            },
            do_grunt = false,
            command  = '';

        // create default case for build
        if (!options) {
            options = [
                'grunt'
            ];
        }

        // trim out grunt commands, as these need to be last
        var x = 0;
        for (x = 0; x < options.length; x++) {
            if (options[x] === 'grunt') {
                do_grunt = true;
                options.splice(x, 1);
            }
        }

        for (x = 0; x < options.length; x++) {
            command += option_list[options[x]] + ' && ';
        }

        // always ALWAYS, run the grunt command last
        if (do_grunt) {
            command += option_list.grunt + ';';
        }
        else {
            // remove the trailing &&, replace with ;
            command = command.substring(0, command.length - 4) + ';';
        }

        return command;
    }

    function log_task_title(title) {
        var msg_length  = title.length,
            pre_title = 'Beginning Build of ',
            border      = '#################################';

        for (var x = 0; x < msg_length; x++) {
            border += '#';
        }

        /**
         *  Should output something like this:
         *
         *  ##########################################
         *  ####   Beginning Build of 'title'   ####
         *  ##########################################
         *
         */
        grunt.log.writeln();
        grunt.log.writeln(border['green'].bold);
        grunt.log.writeln('####   '['green'].bold + pre_title['white'].bold + title['white'].bold + '   ####'['green'].bold);
        grunt.log.writeln(border['green'].bold);
        grunt.log.writeln();
    }

    grunt.initConfig({
        // configure grunt tasks
        prompt: {
//            build: {
//                options: {
//                   questions: [
//                        {
//                            config  : 'build',
//                            type    : 'list',
//                            message : 'What environment are you deploying to?',
//                            default : 'Local',
//                            choices : ['Local', 'Dev', 'Manticore', 'Staging', 'Production']
//                        }
//                    ]
//                }
//           }
        },

        // Execute child build processes
        exec: {
            prompt: {
                cmd: function (n) {
                    //var target = this.config('build').toLowerCase();
//                    var target = 'Production'
				  		var target = grunt.option('target');
				  		
					    switch ( target ) {
					        case 'Dev' :
					            grunt.log.writeln("Verifed user input for target [" + target + "]");
					            break;
					        case 'Manticore' :
					            grunt.log.writeln("Verifed user input for target [" + target + "]");
					            break;
					        case 'Staging' :
					            grunt.log.writeln("Verifed user input for target [" + target + "]");
					            break;
					        case 'Production' :
					            grunt.log.writeln("Verifed user input for target [" + target + "]");
					            break;
					    	default:
								grunt.log.writeln("Valid Arguement Flags are [Dev, Manticore, Staging, Production]");
								grunt.log.writeln("Example: sudo -u build grunt --target=Staging");
    							grunt.fail.fatal("Could not validate user input for [" + target + "]"['red'].bold);
    					}

  						return 'grunt build:' + target.toLowerCase();
 //                  return 'grunt build:Production';
                }
            },
            // task name
            moneyspot: {
                // current working directory
                cwd: 'moneyspot',
                // command to be executed
                command: function (target) {
                    var options = [
                        'grunt',
                        'bower',
                        'npm'
                    ];

                    log_task_title('Moneyspot');
                    return execute_child_grunt(target, options);
                }
            },
            ltkwidget: {
                cwd: 'ltkwidget',
                command: function (target) {
                    var options = [
                        'grunt',
                        'bower',
                        'npm'
                    ];

                    log_task_title('LTK Widget');
                    return execute_child_grunt(target, options);
                }
            },
            boutique: {
                cwd: 'boutique',
                command: function (target) {
                    var options = [
                        'grunt',
                        'bower',
                        'npm'
                    ];

                    log_task_title('Boutique Widget');
                    return execute_child_grunt(target, options);
                }
            },
            shopthepost: {
                cwd: 'shopthepost',
                command: function (target) {
                    var options = [
                        'grunt',
                        'bower',
                        'npm'
                    ];

                    log_task_title('Shop The Post Widget');

                    return execute_child_grunt(target, options);
                }
            },
            lookbook: {
                cwd: 'lookbook',
                command: function (target) {
                    var options = [
                        'grunt',
                        'bower',
                        'npm'
                    ];

                    log_task_title('Lookbook Widget');

                    return execute_child_grunt(target, options);
                }
            }
        }
    });

    grunt.registerTask('default', function () {
        grunt.task.run([
//            'prompt:build'
             'exec:prompt'
        ]);
    });

    grunt.registerTask('build', function (target) {
        switch (target) {
            case 'dev':
                grunt.task.run([
                    'exec:moneyspot:dev',
                    'exec:ltkwidget:dev',
                    'exec:boutique:dev',
                    'exec:shopthepost:dev',
                    'exec:lookbook:dev'
                ]);
                break;
            case 'manticore':
                grunt.task.run([
                    'exec:moneyspot:manticore',
                    'exec:ltkwidget:manticore',
                    'exec:boutique:manticore',
                    'exec:shopthepost:manticore',
                    'exec:lookbook:manticore'
                ]);
                break;
            case 'staging':
                grunt.task.run([
                    'exec:moneyspot:staging',
                    'exec:ltkwidget:staging',
                    'exec:boutique:staging',
                    'exec:shopthepost:staging',
                    'exec:lookbook:staging'
                ]);
                break;
            case 'production':
                grunt.task.run([
                    'exec:moneyspot:production',
                    'exec:ltkwidget:production',
                    'exec:boutique:production',
                    'exec:shopthepost:production',
                    'exec:lookbook:production'
                ]);
                break;
            // Local and all others
            default:
                grunt.task.run([
                    'exec:moneyspot:local',
                    'exec:ltkwidget:local',
                    'exec:boutique:local',
                    'exec:shopthepost:local',
                    'exec:lookbook:local'
                ]);
                break;
        }
    });
};
