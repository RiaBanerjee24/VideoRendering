const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const multer = require('multer');
const AWS = require('aws-sdk');
const { exec } = require('child_process');

// Define a route that renders the index.js file
app.get('/', (req, res) => {
    // Assuming index.js is in the same directory as app.js
    const indexPath = path.join(__dirname, 'index.html');

    // Send the index.js file as the response
    res.sendFile(indexPath);
});

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(new Error('Only .mp4 files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// AWS S3 configuration
const AWS_ACCESS_KEY = 'AKIA5WAL6F3KQRENMEUJ';
const AWS_SECRET_KEY = '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';
const S3_BUCKET = 'mlnumen';

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: 'us-east-2'
});

// Route for handling file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file part");
    }

    const file = req.file;

    if (file.filename === '') {
        return res.status(400).send("No selected file");
    }
    console.log('File Buffer:', file);


    const params = {
        Bucket: S3_BUCKET,
        Key: file.originalname,
        Body: require('fs').createReadStream(file.path),
    };


    const env_creation_script = 'env_create.sh';
    const canonical_pose_script = 'canonical_pose.sh';
    const env_creation_flag = true
    // Upload the file to S3
    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        //environment creation script execution
        exec(`${env_creation_script}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing ${env_creation_script}: ${error}`);
                return;
            }
            console.log(`Output: ${stdout}`);
        });

        // exec(`./${canonical_pose_script}`, (error, stdout, stderr) => {
        //     if (error) {
        //         console.error(`Error executing ${canonical_pose_script}: ${error}`);
        //         return;
        //     }
        //     console.log(`Output: ${stdout}`);
        // });




        return res.send("File uploaded successfully");
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
