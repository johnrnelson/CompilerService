/*
    Testing try...
 USE for CSS
 https://github.com/css/csso
 
 FOR HTML
 https://github.com/kangax/html-minifier
*/
//====================================================================================
"use strict";
var fs = require("fs");
var path = require("path");

var chokidar = require('chokidar');

var ServiceAPI = {
    /*
        Because this task is so processor intensive, we only do one at a time...
    */
    IsCompiling: false,
    /*
        List of files to compile because we wait till the last one is finshed
        before starting another one....
     */
    CompilerList: {
        //added to over time...
    },
    /*
        
    */
    Compiler: function(FilePath_Target, FilePath_Destination) {
        // debugger;
        if (ServiceAPI.CompilerList[FilePath_Target]) {
            return;
        }
        else {
            ServiceAPI.CompilerList[FilePath_Target] = {
                d: new Date(),
                p: FilePath_Destination
            }
        }


        if (ServiceAPI.IsCompiling == true) {
            return;
        }
        else {
            ServiceAPI.IsCompiling = true;

            //Compile next file in the list..
            WorkNextFile();


            function GetNextFile2Compile() {
                for (var f in ServiceAPI.CompilerList) {
                    return f;
                }
            };

            function WorkNextFile() {


                var nextFilePath = GetNextFile2Compile();
                if (!nextFilePath) {
                    ServiceAPI.IsCompiling = false;
                    BugLog.Warn(' ****   COMPILED EVERYTHING   ****');
                    return;
                }
                var nextFilePathObj = ServiceAPI.CompilerList[nextFilePath];

                CompileTheFile(path.basename(nextFilePath), path.basename(nextFilePathObj.p), function(error) {
                    if (error) {
                        debugger;
                    }
                    delete ServiceAPI.CompilerList[nextFilePath];
                    // BugLog.Info('Finished compiling:' + nextFilePath ); //+ '\r\n\t\t' + nextFilePathObj.p
                    WorkNextFile();
                });

            }

            function CompileTheFile(FileName_Target, FileName_Destination, Compiled) {

                /*
                https://github.com/dcodeIO/ClosureCompiler.js
                */



                var ClosureCompiler = require("closurecompiler");

                // debugger;
                ClosureCompiler.compile(
                    FilePath_Target, {
                        // Options in the API exclude the "--" prefix
                        compilation_level: "SIMPLE_OPTIMIZATIONS",
                        // compilation_level: "ADVANCED_OPTIMIZATIONS",

                        // compilation_level:"WHITESPACE_ONLY",


                        // Capitalization does not matter 
                        // Formatting: "PRETTY_PRINT",


                        // If you specify a directory here, all files inside are used
                        // externs: ["externs/file3.js", "externs/contrib/"],

                        // ^ As you've seen, multiple options with the same name are
                        //   specified using an array.
                        // ...
                    },
                    function(error, result) {
                        if (result) {
                            // BugLog.Info('Finished Building FILE :' + FilePath_Destination);

                            fs.writeFile(FilePath_Destination, result, function(err) {
                                // if (err) throw err;
                                if (err) {
                                    debugger;
                                    BugLog.Warn('Error Writing FILE :' + FilePath_Destination);
                                }
                                else {
                                    ServiceAPI.IsCompiling = false;
                                    Compiled();

                                }
                            });


                        }
                        else {
                            // Display error...
                            debugger;
                            BugLog.Warn('ERROR!!!\r\n', error);
                            // process.exit(-1);
                            ServiceAPI.IsCompiling = false;
                            Compiled(error);
                        }
                    }
                );

            } //End Compile

        }


    }

};




/*
    See if we need to compile and if so then do so.. :-)
*/
function ServeCompileFile(isDebugMode, FilePath, OnFile) {


    // var FolderPath = '/home/johnrnelson/WEBSERVER/johnrnelson.com/html/www/js/';

    try {

        // var isDebugMode = false;



        var FileName = path.basename(FilePath, '.js');
        var FileNameExt = path.extname(FilePath);
        var FolderPath = path.dirname(FilePath);

        var minFile = FolderPath + '/' + FileName + '-min.js';
        var regFile = path.normalize(FilePath);








        //Get the reg file first.. so we know how long the source has been...
        fs.stat(regFile, function(err, SourceFileStats) {
            // debugger;
            if (err) {
                OnFile(err, FileNameExt, null);
                // debugger;;

            }
            else {
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                //GotSource Stats!!!
                var SourceFileEdit = SourceFileStats.mtime.getTime();
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



                if (isDebugMode) {
                    fs.readFile(regFile, 'utf8', function(err, data) {
                        if (err) {
                            // console.log(regFile);
                            // debugger;;
                            OnFile(err, FileNameExt, null);
                        }
                        else {

                            OnFile(null, FileNameExt, data);
                            // debugger;;
                        };
                    });
                }
                else {
                    fs.readFile(minFile, 'utf8', function(err, data) {
                        if (err) {

                            // debugger;
                            BugLog.Info('Compile FILE::' + regFile + '-----' + minFile);
                            ServiceAPI.Compiler(regFile, minFile);


                            fs.readFile(regFile, 'utf8', function(err, RegFileData) {
                                if (err) {
                                    // debugger;
                                    // BugLog.Warn(err);
                                    OnFile(err, FileNameExt, null);
                                }
                                else {
                                    // Response.end(data + header_Code);
                                    OnFile(null, FileNameExt, RegFileData);

                                    // Response.sendFile(Server.rootWWWFolder + '/index.html');
                                };
                            });
                        }
                        else {

                            fs.stat(minFile, function(err, stats) {
                                // debugger;
                                if (err) {
                                    debugger;;
                                }
                                else {
                                    var MinFileEdit = stats.mtime.getTime();
                                };

                                var diffTime = MinFileEdit - SourceFileEdit;

                                if (diffTime < 0) {
                                    ServiceAPI.Compiler(regFile, minFile);
                                }


                                OnFile(null, FileNameExt, data);

                            });
                        };
                    });
                }






                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                //GotSource Stats!!!
            }
        });


    }
    catch (errCmpFile) {
        debugger;;
        OnFile(errCmpFile);
    }


};

exports.ServeCompileFile = ServeCompileFile;

//.............................................................................




function GetFilePaths(FilePath) {
    var returnFilePaths = {
        FullPath: path.normalize(FilePath),
        FileName: path.basename(FilePath, '.js'),
        FileNameExt: path.extname(FilePath),
        FolderPath: path.dirname(FilePath)
    };
    returnFilePaths.MinFile = returnFilePaths.FolderPath + '/' + returnFilePaths.FileName + '-min.js';

    // returnFilePaths.RegFile = path.normalize(FilePath);
    return returnFilePaths;
}


function WatchAFolder(FolderPath2Watch) {
    /*
        Read the documentation at https://github.com/paulmillr/chokidar  
    */

    var watcher = chokidar.watch(FolderPath2Watch, {
        
        ignored: /node_modules|-min.js|\.git/,
        persistent: true,
        depth: 30,
        // followSymlinks: false,
        // useFsEvents: false,
        // usePolling: false
    });
    watcher.on('unlink', (event, path) => {
        // BugLog.Warn(event, path);
    });
    watcher.on('add', (path) => {
        var fPath = GetFilePaths(path);


        fs.stat(fPath.FullPath, function(err, stats) {
            fPath.FullPathEditDate = stats.mtime.getTime();
            fs.stat(fPath.MinFile, function(err, stats) {

                if (err) {
                    // debugger;;
                    BugLog.Info('No Min File Found : ' + fPath.MinFile);
                    ServiceAPI.Compiler(fPath.FullPath, fPath.MinFile);
                }
                else {
                    var MinFileEdit = stats.mtime.getTime();

                    var diffTime = MinFileEdit - fPath.FullPathEditDate;

                    if (diffTime < 0) {

                        BugLog.Info('Min File Time Diff : ' + diffTime + ' |  ' + fPath.FullPath);
                        ServiceAPI.Compiler(fPath.FullPath, fPath.MinFile);

                    }
                    else {
                        // BugLog.Info('File is OK-->'+ fPath.FullPath);
                    }
                };

            });

        });
    });
    watcher.on('change', (path, stats) => {
        if (stats) {
            var fPath = GetFilePaths(path);
            BugLog.Info('File changed so compiling ==> ' + fPath.FullPath);
            ServiceAPI.Compiler(fPath.FullPath, fPath.MinFile);
        }
        // console.log(`File ${path} changed size to ${stats.size}`);
    });
    watcher.on('ready', () => {
        BugLog.Info('File Watcher is Ready!');
    })
}
exports.WatchAFolder = WatchAFolder;
