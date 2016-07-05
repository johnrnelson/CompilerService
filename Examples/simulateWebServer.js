/*
    This will simpulate your web service...
*/
var CompService = require("../index");
 


var TARGETFOLDER = '/home/ubuntu/workspace/TESTFILES/';
var TARGETFile = 'testcomp.jsx';
var TARGETFilePath = TARGETFOLDER + TARGETFile;

CompService.Service.API.ServeCompileFile(true,TARGETFilePath,  function(err, FileType, FileContents) {
    if (err) {
        console.log('File ERROR-->' + TARGETFilePath);
        console.log(err);
    }
    else {
        console.log(FileType, FileContents);

    }
    process.exit(0);
});

 