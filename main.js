// entry point of my cmd line

// Importing from help.js
let helpFunc = require("./commands/help");
let organizeFunc = require("./commands/organize");
// console.log(helpFunc.help());
let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

switch (command) {
    case "tree":
        // call tree function
        
        console.log("Tree Function Called and Executed on Successfully path" + path);
        break;
    case "organize":
        // call organize function
        organizeFunc.organize(path);
        // console.log("Organized called on path" +path);

        break;
    case "help":
        // call help function
        helpFunc.help();
        // console.log("Help called on path" + path);
        break;
    default:
        console.log("Command Not Recognized :(");
}