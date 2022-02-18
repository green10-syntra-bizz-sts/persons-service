const {DatabaseManager} = require("../dao/DatabaseManager.js");
const {Person} = require("../domain/Person.js");

class Service {

    constructor(mongoDBPassword) {
        this.dbm = new DatabaseManager(mongoDBPassword);
    }

    async addPerson(firstName, lastName, eMailAddress) {
        return await this.dbm.addPerson(firstName, lastName, eMailAddress);
    }

    async forgetKnownPersons() {
        await this.dbm.emptyPersonsCollection();
    }

    async countKnownPersons() {
        return await this.dbm.countPersonCollectionDocuments();
    }

    async getListOfPersons() {
        return await this.dbm.getListOfPersons();
    }

    async showListOfPersons() {
        let listPersons = await this.getListOfPersons();
        let result = ""; let number = 0;
        await listPersons.forEach( (person) => {
            result += person.firstName + " " + person.lastName + "\n";
            number++;
        })
        result += "Aantal bekende personen " + number;
        return result;
    }

    async searchPersonObjById(lastInsertedId) {
        let result = await this.dbm.findPersonById(lastInsertedId);
        return result;
    }

    async searchPersonById(lastInsertedId) {
        let result = await this.searchPersonObjById(lastInsertedId);
        return(result.firstName + " " + result.lastName + ", " + result.eMailAddress);
    }

    async searchPersonByEmailAddress(eMailAddress) {
        let result = await this.dbm.findPersonByEmailAddress(eMailAddress);
        if (result != null) {
            return(result.firstName + " " + result.lastName + ", " + result.eMailAddress);
        } else {
            return null;
        }
    }

    async getApiInfo() {
        return await this.dbm.getApiInfo();
    }
}

module.exports = {Service}