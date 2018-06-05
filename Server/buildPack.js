
console.log("running build pack");


var rimraf = require('rimraf');
var child_process = require('child_process')


rimraf('../client/build', function (){ 
    console.log('done'); 

});

rimraf('../praipsio-widget/build', function (){ 
    console.log('done'); 

});


    child_process.exec('buildPack.bat', (err, stdout, stderr) => {
   console.log("stdout", stdout)
        
        })






console.log("hellooooooooooooooooooo")