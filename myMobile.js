var http = require('http');
var express = require('express');
var exp = express();
var parser = require('body-parser')
var fs = require('fs');
var cors = require('cors');

/****************************Displaying all mobile data*******************/

exp.get('/rest/api/getAllMob', cors(), (req, res) => {
    var fileData;
    fs.readFile('mobile.json', function (err, data) {
        // res.writeHead(200,{'Content-Type':'text/plain'});
        fileData = JSON.parse(data.toLocaleString());
        console.log("All Mobile data:\n",fileData);
        res.send(fileData);
        res.end();
    });
})
/********************************Mobiles belonging to specific range**************/
exp.get('/rest/api/getRange', cors(), (req, res) => {
    var fileData;
    var block = [];
    var j = 0;
    fs.readFile('mobile.json', function (err, data) {
        fileData = JSON.parse(data.toLocaleString());
        for (i = 0; i < fileData.length; i++) {
            if (fileData[i].mobPrice >= 10000 && fileData[i].mobPrice <= 50000) {
                block[j] = fileData[i];
                j++;
            }
        }
        console.log("Mobiles with price between 10,000 and 50,000:\n",block);
        res.send(block)
        res.end();
    });
})

/**************************Updating mobile name***********************************/
exp.use(parser.json());
exp.route('/rest/api/putName', cors()).put((req, res) => {
    fs.readFile('mobile.json', function (err, data) {
        fileData = JSON.parse(data.toLocaleString());
        for (i = 0; i < fileData.length; i++) {
            if (fileData[i].mobId == 1002) {
                fileData[i].mobName = "Samsung";
            }
        }
        fs.writeFileSync('mobile.json', JSON.stringify(fileData))
        console.log("Updated mobile details:\n",fileData)
        res.send(fileData)
        res.end();
    });
})


/***************************Adding new mobile**********************************/
exp.route('/rest/api/postNew', cors()).post((req, res) => {

    fs.readFile('mobile.json', function (err, data) {
        fileData = JSON.parse(data.toLocaleString());

        var obj = { "mobId": 1009, "mobName": "MI", "mobPrice": 9139 };
        fileData.push(obj);
        fs.writeFileSync('mobile.json', JSON.stringify(fileData))
        console.log("Addng new mobile details:\n",fileData)
        res.send(fileData)
        res.end()
    });
})


exp.use(cors()).listen(3000, () => console.log("RUNNING...."));