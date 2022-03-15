const { deepStrictEqual } = require("assert");
const fs = require("fs");
const path = require("path");

let types = {
    media:["mp4","mkv","mp3"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','text','txt','ps'],
    app:['exe','dmg','pkg','deb'],
    images:['png','jpg','jpeg']
}
function organize(srcPath){
    if(srcPath == undefined){
        // console.log(srcPath);
        srcPath = process.cwd();

        // Method returns the current working directory of the Node js process
        // console.log("Source path in",srcPath);
    }
    // srcPath = process.cwd();
    // console.log(srcPath);
    
    // 2. to create a directory organized_Files.
    let organizedFiles = path.join(srcPath,"organized_Files");
    console.log("organzied files:" ,organizedFiles);
    // let organized_Files = srcPath + "/" + "organized_Files";
    // console.log("Organized files folder in:",organizedFiles);
    if(fs.existsSync(organizedFiles)==false)
    {
        fs.mkdirSync(organizedFiles);
    }

    else console.log('Folder already exists');  


    // 3. scan the entire path(download folder in this case)
    // basically reads the files present in directory.
    let allFiles = fs.readdirSync(srcPath);
    // read the  contents of directory |
    console.log(allFiles);


    // 4 . Traverse over all the files and classify them on the basis of extension.
    for(let i =0;i<allFiles.length;i++){
    //     // let extension  = allFiles[i].split(".")[1];
    //     let ext = path.extname(allFiles[i]); // extname returns the extension of the files
    //     console.log(ext);

    let fullPathOfFile = path.join(srcPath,allFiles[i]);
    console.log(fullPathOfFile);

    // 1. check if it is a file or Folder.
    // lstatsync gives the information regarding the link proivded.
    let isFile =fs.lstatSync(fullPathOfFile).isFile();
    if(isFile){
        // console.log(fullPathOfFile);
        // 1.1 get ext name
        let ext = path.extname(allFiles[i]).split(".")[1];
        console.log(ext);
        // 1.2 get folder name from extension
        let folderName = getFolderName(ext);
        // 1.3 copy from src and paste to destination

                        //copy     kyacopy       paste
        copyFileToDest(srcPath,fullPathOfFile,folderName);

    }
    }


}

function getFolderName(ext){
    // code
    for(let key in types){
        // console.log(key);
        for(let i = 0;i<types[key].length;i++){
            if(types[key][i] == ext){
                return key;
            }
        }
    }
    return "miscellaneous";
    // return folderName;
}
function copyFileToDest(srcPath,fullPathOfFile,folderName) { 

    // code
    // 1 . folder ka path banana hai
    let desFolderPath = path.join(srcPath,"organized_files",folderName);
    // console.log(des);

    // 2.check folder if exists if does not then make folder
    if(!fs.existsSync(desFolderPath)){
        fs.mkdirSync(desFolderPath);
    }

    // 3.copy path from src folder to dest folder

    // returns the last portion of a path
    let fileName = path.basename(fullPathOfFile);
    let destFileName = path.join(desFolderPath,fileName);
                     // src       ,   dest
    fs.copyFileSync(fullPathOfFile,destFileName);
    
 }
// let srcPath =  "C:/Users/acer/Desktop/FrontEnd-PEP/FileOrganizer/downloads";
// organize(srcPath);

module.exports = {
    organize : organize
}




