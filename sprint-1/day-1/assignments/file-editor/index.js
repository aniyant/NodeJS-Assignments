// index.js
import fs from 'fs';

// Get the command line arguments
const args = process.argv.slice(2);
const operation = args[0];
const filePath = args[1];
const content = args[2];
console.log(args);

switch (operation) {
    case 'read':
        readFile(filePath);
        break;
    case 'delete':
        deleteFile(filePath);
        break;
    case 'create':
        createFile(filePath,content);
        break;
    case 'append':
        appendToFile(filePath, content);
        break;
    case 'rename':
        renameFile(filePath, content);
        break;
    case 'list':
        listDirectory(filePath);
        break;
    default:
        console.log(`Invalid operation '${operation}'`);
}

// Function to read a file
function readFile(filePath) {
    // fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) {
    //         console.error(`Error reading file '${filePath}':`, err.message);
    //     } else {
    //         console.log(data);
    //     }
    // });
    const data = fs.readFileSync(filePath); //readFile('./text.txt', 'utf8');
    console.log(data.toString());
}

// Function to delete a file
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => { 
        if (err) {
            console.error(`Error deleting file '${filePath}':`, err.message);
        } else {
            console.log(`File '${filePath}' deleted`);
        }
    });
}

// Function to create a file
function createFile(filePath,content='') {
    fs.writeFile(filePath,content, (err) => {
        console.log(content);
        if (err) {
            console.error(`Error creating file '${filePath}':`, err.message);
        } else {
            console.log(`File '${filePath}' created`);
        }
    });
}

// Function to append content to a file
function appendToFile(filePath, content) {
    fs.appendFile(filePath, `${content}\n`, (err) => {
        if (err) {
            console.error(`Error appending to file '${filePath}':`, err.message);
        } else {
            console.log(`Content appended to the file '${filePath}'`);
        }
    });
}

// Function to rename a file
function renameFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(`Error renaming file '${oldPath}' to '${newPath}':`, err.message);
        } else {
            console.log(`File '${oldPath}' renamed to '${newPath}'`);
        }
    });
}

// Function to list the contents of a directory
function listDirectory(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(`Error listing directory '${directoryPath}':`, err.message);
        } else {
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}
