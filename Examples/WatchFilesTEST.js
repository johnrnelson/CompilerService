/*
    Easy test to compile a local file...
*/
var CompService = require("../index").Service;


/*
    Setup our testing paths...
*/
var TARGETFOLDER = '/home/ubuntu/workspace/TESTFILES/';
var TARGETFile = 'testcomp.js';
var TARGETFilePath = TARGETFOLDER + TARGETFile;

CompService.API.WatchAFolder(TARGETFOLDER);

 