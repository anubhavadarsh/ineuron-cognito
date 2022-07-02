var express = require('express');
var bodyParser = require('body-parser');
const { create } = require("ipfs");
const expFileUpload = require("express-fileupload");
const fs = require("fs")
const multer = require("multer")
const upload = multer({ dest: "uploads/" });
var app = express();

app.use(bodyParser.urlencoded({  limit: "50mb", extended: false }));
app.use(bodyParser.json());
app.use(expFileUpload());

async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https"
        }
    );
    return ipfs;
}

app.post('/store_data', async function (req, res) {
    try {
            let ipfs = await ipfsClient();
            console.log(req.body)
            let result = await ipfs.add(JSON.stringify(req.body));
            ipfs.stop().catch(err => console.error(err))
            return res.send(result);
        } catch (e) {
        res.end(e.message || e.toString());
    }
});

app.post("/store_file", (req, res) => {
    let fileObj = {};
    if (req.files.inputFile) {
        const file = req.files.inputFile;
        const fileName = file.name;
        const filePath = __dirname + "/uploads/" + fileName;

        file.mv(filePath, async (err) => {
            if (err) {
                console.log("Error: failed to download file.");
                return res.status(500).send(err);
            }

            const fileHash = await addFile(fileName, filePath);
            console.log("File Hash received __>", fileHash);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("Error: Unable to delete file. ", err);
                }
            });
            fileObj = {
                file: file,
                name: fileName,
                path: filePath,
                hash: fileHash
            };
            return res.send(fileObj);
        });
    }
});

const addFile = async (fileName, filePath) => {
    let ipfs = await ipfsClient();
    const file = fs.readFileSync(filePath);
    const filesAdded = await ipfs.add({ path: fileName, content: file }, {
    progress: (len) => console.log("Uploading file..." + len)
    });
    ipfs.stop().catch(err => console.error(err))
    console.log(filesAdded);
    const fileHash = filesAdded.cid.toString();
    return fileHash;
};

app.post('/get', async function (req, res) {
    try {
        let ipfs = await ipfsClient();

        let asyncitr = ipfs.cat(req.body.hash)
        let data =""
        for await (const itr of asyncitr) {

            data = Buffer.from(itr).toString()
            console.log(data)
        }
        ipfs.stop().catch(err => console.error(err))
        return res.send(data);

    } catch (e) {
        res.end(e.message || e.toString());
    }
});


app.listen('3000', function(){
    console.log('Server listening on port 3000');
});