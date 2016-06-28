/*
    Easy test to compile a local file...
*/
var CompService = require("../index");



var TARGETFOLDER = '/home/ubuntu/workspace/TESTFILES/';
var TARGETFile = 'testcomp.js';
var TARGETFilePath = TARGETFOLDER + TARGETFile;




CompService.Service.API.ServeCompileFile(false,TARGETFilePath, function(err, FileType, FileContents) {
    if (err) {
        console.log('File ERROR-->' , TARGETFilePath);
        console.log(err);
    }
    else {
        console.log(FileType);
        console.log('CONTENTS-->',FileContents);

    } 
});
