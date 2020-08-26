const express = require('express')
const route = express.Router()
const stream = require('stream')
const s3 = require('../awsconfig/awsS3')
const upload = require('../awsconfig/multerconfig')
const aws = require('aws-sdk')
const env = require('../awsconfig/aws')
route.post('/file/upload', upload.single('file'), (req, res) => {
    console.log("simon");
    const s3Client = s3.s3Client;
    const params = s3.uploadParams;

    params.Key = req.file.originalname;
    params.Body = req.file.buffer;
    s3Client.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: err.message });

        }
        res.status(201).json({ message: 'File uploaded successfully! -> keyname =' + req.file.originalname });
    });
})

route.get('/file/upload/:filename',(req,res)=>{
    const s3Client = s3.s3Client;
    const params = s3.downloadParams;
    console.log(req.params.filename);
    params.Key = req.params.filename;
   
    s3Client.getObject(params)
      .createReadStream()
        .on('error', function(err){
          res.status(500).json({error:"Error -> " + err});
      }).pipe(res);



})

module.exports = route