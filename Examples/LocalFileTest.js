/*
    Easy test to compile a local file...
*/
var CompService = require("../index");


/*
    Setup our testing paths...
*/
var TARGETFOLDER = '/home/ubuntu/workspace/TESTFILES/';
var TARGETFile = 'testcomp.js';
var TARGETFilePath = TARGETFOLDER + TARGETFile;



//Call the service API...
CompService.Service.API.ServeCompileFile(false,TARGETFilePath, function(err, FileType, FileContents) {
    if (err) {
        console.log('File ERROR-->' , TARGETFilePath);
        console.log(err);
    }
    else {
        console.log('The type of file:',FileType);
        console.log('CONTENTS-->',FileContents);

    } 
});
