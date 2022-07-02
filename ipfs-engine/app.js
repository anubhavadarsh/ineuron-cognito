var express = require('express');
var bodyParser = require('body-parser');
const { create } = require("ipfs");
const fs = require("fs")
const multer = require("multer")
const upload = multer({ dest: "uploads/" });
var app = express();

app.use(bodyParser.urlencoded({  limit: "50mb", extended: false }));
app.use(bodyParser.json());

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

app.post('/store_file', upload.single("file"), async function (req, res) {
    try {
        let ipfs = await ipfsClient();
        let data = fs.readFileSync("req.file")
        let options = {
            warpWithDirectory: false,
            progress: (prog) => console.log(`Saved :${prog}`)
        }
        let result = await ipfs.add(data, options);
        console.log(result)
        ipfs.stop().catch(err => console.error(err))
        return res.send(result);

    } catch (e) {
        res.end(e.message || e.toString());
    }
});


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