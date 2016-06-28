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


function SetApp(app) {





    app.get('/www/js/*', function(Request, Response) {
        try {

            ServeCompileFile('/home/ubuntu/WEBSERVER/ubuntu.com/html/www/js/', '/www/js/', Request, Response);
        }
        catch (e) {
            Server.BugLog.Warn('Compile file from /www/js/*  ');
            Response.end();

        }
    });



    app.get('/SYSx/*', function(Request, Response) {

        try {

            ServeCompileFile('/home/ubuntu/WEBSERVER/ubuntu.com/html/www/DESKTOP/', '/SYSx/', Request, Response);
        }
        catch (e) {
            console.log(e);
            Server.BugLog.Warn('Compile file from /SYSx/*  ');
            Response.end();

        }



    });





}



process.exit(0);