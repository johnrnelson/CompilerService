/*

*/
var Service={
  
     RootFolder: __dirname,
     LaunchDate: new Date(),  
     API:require("./LIB/API")
};



var buglog = require("buglog");
global.BugLog = buglog.Config({
     StackDepth: 6,
     // RootFolder: __dirname,
     RootFolder: "*do not replace*",
    //  ShowDebugInfo: true,
     OnLog: function(LogRecord) {
          return;
          console.log('================================================================================');
          console.log(LogRecord);
          console.log('================================================================================');
     }
}, global);

BugLog.Info('Compiler Service is using Node Version  ...' + process.version);


exports.Service=Service;

 