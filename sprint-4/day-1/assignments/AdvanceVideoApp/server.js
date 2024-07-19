const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('dev'));

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 * 1024 } // 5 GB limit
});

// Upload route
app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFilePath = path.join(__dirname, 'uploads', req.file.filename);
    const outputDir = path.join(__dirname, 'uploads', path.parse(req.file.filename).name);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // const ffmpegCommand = `ffmpeg -i ${inputFilePath} -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 10 -hls_playlist_type vod -b:v 2500k -maxrate 2675k -bufsize 3750k -b:a 128k -hls_segment_filename ${outputDir}/output_720p_%03d.ts ${outputDir}/output_720p.m3u8 -vf scale=w=854:h=480:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 10 -hls_playlist_type vod -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename ${outputDir}/output_480p_%03d.ts ${outputDir}/output_480p.m3u8 -vf scale=w=640:h=360:force_original_aspect_ratio=decrease -c:a aac -ar 48000 -c:v h264 -profile:v main -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_time 10 -hls_playlist_type vod -b:v 800k -maxrate 856k -bufsize 1200k -b:a 128k -hls_segment_filename ${outputDir}/output_360p_%03d.ts ${outputDir}/output_360p.m3u8 -master_pl_name ${outputDir}/master.m3u8 -var_stream_map v:0,a:0 v:1,a:0 v:2,a:0 -f hls ${outputDir}/master.m3u8`;
    const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease" -c:a aac -ar 48000 -b:a 128k "${outputDir}/output_720p.mp4"`;

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error processing video.');
        }

        if (stderr) {
            console.error(`FFmpeg stderr: ${stderr}`);
            return res.status(500).send('Error processing video. Check server logs.');
        }

        console.log(`FFmpeg stdout: ${stdout}`);
        res.send(`${outputDir}/master.m3u8`);
    });
});

// Stream video
app.get('/video/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return;
        }

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
