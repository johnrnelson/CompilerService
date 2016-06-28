/*
    This will simpulate your web service...
*/
var CompService = require("../index");
 


var TARGETFOLDER = '~/workspace/TESTFILES/';
var TARGETFile = 'testcomp.js';
var TARGETFilePath = TARGETFOLDER + TARGETFile;

CompService.ServeCompileFile(TARGETFilePath,  function(err, FileType, FileContents) {
    if (err) {
        Server.BugLog.Warn('File ERROR-->' + TARGETFilePath);
        Server.BugLog.Warn(err);
    }
    else {
        Server.BugLog.Info(FileType, FileContents);

    }
});

 