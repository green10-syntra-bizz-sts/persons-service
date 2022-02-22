const express = require("express");

const app = express();
const jsonParser = express.json();
app.use(jsonParser)
app.use(express.static('public'));

const {Service} = require("../src/service/Service.js");

let mongoDBPassword = process.env.MONGODBPASSWORD;
let service;

app.get('/api/v1/info', async (req, res) => {
    let replyObj = await service.getApiInfo();
    res.status(200);
    res.send(replyObj);
});

app.get('/api/v1/persons', async (req, res) => {
    let replyObj = await service.getListOfPersons();
    replyObj = {
        'listPersons': replyObj
    }
    res.send(replyObj);
});

app.get('/api/v1/persons/:emailaddress', async (req, res) => {
    let replyStr = await service.searchPersonByEmailAddress(req.params.emailaddress);
    let replyObj;
    if (replyStr!=null) {
        replyObj = {
            "foundPerson": replyStr
        };
        res.status(200);
    } else {
        replyObj = {
            "unknown": req.params.emailaddress
        };
        res.status(404);
    }
    res.send(replyObj);
});

app.post('/api/v1/persons', async (req, res) => {
    let addStatus = await service.addPerson(req.body.firstName, req.body.lastName, req.body.eMailAddress);
    let replyObj = await service.searchPersonObjById(addStatus.insertedId);
    res.status(201);
    res.send(replyObj);
});

app.delete('/api/v1/persons', async (req, res) => {
    await service.forgetKnownPersons();
    let replyObj = await service.getListOfPersons();
    replyObj = {
        'listPersons': replyObj
    }
    res.status(200);
    res.send(replyObj);
})

if (mongoDBPassword===undefined) {
        const readline = require('readline');
        const rl = readline.createInterface(process.stdin, process.stdout);

        rl.question('Enter the MongoDB password please: ', (answer) => {
            mongoDBPassword = answer;
            rl.close();
            // Now the Express server can start listening
        });
} else {
    // MongoDBPassword has been retrieved from environment variable, Express can start listening at once
}

app.listen(5000, () => {
    service = new Service(mongoDBPassword);
    console.log('\nExample app listening on port 5000!');
});


