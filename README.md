# CompilerService
Compiler service for javascript
 

## Index
- [What is this?](#what-is-this)
- [Installation](#installing)
- [Using](#using)
- [Helpful Links](#helpful-links)


## What is this?
Compile code on the fly.



 
## Installing
Good old NPM to the resuce! 

    npm install git+https://git@github.com/johnrnelson/CompilerService.git --save
 
 
 
## Using
Sample code....

    var servFile = '**path to file**';
    CompilerService.Service.API.ServeCompileFile(isDebugMode, servFile, function(err, FileType, FileContents) {
        if (err) {
            console.log(err);
            Response.end('');
        }
        else {
            if (FileType == '.js') {
                Response.writeHead(200, {
                    "Content-Type": "application/javascript"
                });
            }
            else {
                Response.writeHead(200, {
                    "Content-Type": "text/html"
                });
            }
            Response.end(FileContents);
    
        }
    });
    
That should be it.  :-)



## Helpful Links
https://www.johnrnelson.com

