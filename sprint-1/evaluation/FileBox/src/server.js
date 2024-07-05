const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


//creating a write stream
// const logFilePath = path.join(__dirname.split('/').slice(-1),)
const logStream = fs.createWriteStream(path.join(__dirname,'filebox.log'),{flags:'a'});

// app.use(morgan(':method :status :res[content-length] - :response-time ms :date[clf] :http-version :url',{stream:logStream}));
app.use(morgan('combined',{stream:logStream}));

// server static files from uplads
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));


// configuring multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const ext = path.extname(file.originalname).substring(1);
      const dir = 'uploads/'+ext;
      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
      }
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname,ext);
      const timestamp = Date.now();
      cb(null,`${basename}-${timestamp}${ext}`);
    }
  
});

// configuring multer upload
const uplads = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*10
    },
    fileFilter: (req,file,cb) => {
        if(file.size > 1024*1024*10){
            const ext = path.extname(file.originalname,ext);
            const basename = path.basename(file.originalname,ext);
            const versionedFilename = `${basename}-v${Date.now}${ext}`;
            fs.writeFileSync(path.join('uploads',versionedFilename),file.buffer);
            logStream.write(`[${new Date().toISOString()}] File size exceeded: ${file.size} bytes File name: ${file.originalname} renamed to ${versionedFilename}\n`);
            return cb(null,false);
        }
        cb(null,true);
    }
});

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));
})

// get files
app.get('/files',(req,res) => {
    fs.readdir('uploads/',{withFileTypes:true},(err,files)=>{
        if(err){
            return res.status(500).send(err);
        }
        
        const result = files.map(file => {
            if(file.isDirectory()){
                return {
                    name:file.name,
                    type:'directory',
                    files:fs.readdirSync('uploads/'+file.name)
                };
            }
            return {name:file.name,type:'file'};
        })
        res.json(result);
    });
});

// post route upload
app.post('/upload',uplads.single('file'), (req,res) => {
    if(!req.file){
        return res.status(400).send('File size exceeds 10 MB limit and has been renamed.');
    }
    res.send("File uploaded successfully.");
});

// delete route
app.delete('/delete/:filename',(req,res) => {
    console.log(req.params);
    console.log(req.params.filename);
    const {filename} = req.params;
    const folderName = filename.split(".")[1];
    console.log(folderName);
    const fileDir = __dirname.split("\\").slice(0,-1).join('/');
    console.log(fileDir);
    const filePath = path.join(fileDir,'uploads',folderName,filename);
    console.log(filePath);
    fs.unlink(filePath, (err) => { 
        if(err){
            return res.status(500).send("file not found");
        }
        else{
            res.status(200).send("file deleted successfully");
        }
    });
})

// deploying the server
app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
})