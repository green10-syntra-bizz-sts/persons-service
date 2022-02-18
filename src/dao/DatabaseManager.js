const { MongoClient } = require('mongodb');

const dbName = "sts_db";
const colName = "persons";

const mongoAccount = "jsmongohvdb";
let mongoPassword = undefined;

async function doDB(action, dbname, colname, ...args) {

    const uri = "mongodb+srv://"+mongoAccount+":"+mongoPassword
        +"@cluster0.jwzvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    try {
        await client.connect();
        return await action(client, dbname, colname, args);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

class DatabaseManager {

    constructor(mongoDBPassword) {
        mongoPassword = mongoDBPassword;
        doDB( async (client, dbname, colname) => {
            // Check whether collection "apirelease" exists and has one document
            let apireleaseExists = (await client.db(dbname).collection(colname).count() === 1);
            if (!apireleaseExists) {
                await client.db(dbname).collection(colname).insertOne({
                    "buildtime": 1638790232000,
                    "version": "v1",
                    "methods": "GET, POST, DELETE",
                    "links": "/api/v1/persons"
                })
            };
        }, dbName, "apirelease");
    }

    async emptyPersonsCollection() {
        await doDB( async (client, dbname, colname) => {
            await client.db(dbname).collection(colname).deleteMany({});
        }, dbName, colName);
    }

    async countPersonCollectionDocuments() {
        return await doDB( async (client, dbname, colname) => {
            return await client.db(dbname).collection(colname).count();
        }, dbName, colName);
    }

    async addPerson(firstName, lastName, eMailAddress) {
        return await doDB( async (client, dbname, colname, args) => {
            return await client.db(dbname).collection(colname).insertOne({
                "firstName": args[0],
                "lastName" : args[1],
                "eMailAddress": args[2]
            });
        }, dbName, colName, firstName, lastName, eMailAddress);
    }

    async getListOfPersons() {
        return await doDB ( async (client, dbname, colname) => {
            let result = [];
            let cursor = await client.db(dbname).collection(colname).find({});
            await cursor.forEach((obj) => {
                result.push(obj);
            });
            return result;
        }, dbName, colName)
    }

    async findPersonById(theId) {
        return await doDB( async (client, dbname, colname, args) => {
            return await client.db(dbname).collection(colname).findOne({
                "_id": args[0]
            });
        }, dbName, colName, theId);
    }

    async findPersonByEmailAddress(eMailAddress) {
        return await doDB( async (client, dbname, colname, args) => {
            return await client.db(dbname).collection(colname).findOne({
                "eMailAddress": args[0]
            });
        }, dbName, colName, eMailAddress);
    }

    async getApiInfo() {
        return await doDB( async (client, dbname, colname) => {
            return await client.db(dbname).collection(colname).findOne({});
        }, dbName, "apirelease");
    }
}

module.exports = {DatabaseManager};





