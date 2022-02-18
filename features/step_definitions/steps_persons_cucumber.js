const assert = require('assert');
const { Given, When, Then, BeforeAll} = require('@cucumber/cucumber');
const {Service} = require("../../src/service/Service.js");
const exit = require("exit");

let mongoDBPassword = undefined;
let service;

let lastDBResult;
let lastInsertedId;

/**
 * Pik het mongoDBPassword op uit de environment variable
 */
BeforeAll(async function() {
    mongoDBPassword = process.env.MONGODBPASSWORD;
    service = new Service(mongoDBPassword);
    if (mongoDBPassword===undefined) {
        console.log("You should specify MONGODBPASSWORD environment variable in order for these tests to work!");
        exit(1);
    }
})

Given('er zijn geen bekende personen', async function () {
    await service.forgetKnownPersons();
    assert.strictEqual(await service.countKnownPersons(), 0);
});

When('de CSR een persoon toevoegt met voornaam {string}, familienaam {string} en e-mailadres {string}',
                                                        async function (firstName, lastName, eMailAddress) {
    lastDBResult = undefined;
    lastDBResult = await service.addPerson(firstName, lastName, eMailAddress);
});

Then(/^(?:is|zijn) er (.+) bekende (?:persoon|personen)$/, async function (numberstr) {
    assert.strictEqual(await service.countKnownPersons(), parseInt(numberstr) );
});

Then('krijgt de CSR het enige toegekende uniek id', function () {
    assert.ok(lastDBResult.insertedId !== undefined)
});

Given('er zijn 3 bekende personen', async function (dataTable) {
    // First we clean up the data in the database
    await service.forgetKnownPersons();
    // Subsequently we add person by person the data from the datatable
    for (let i = 1; i < dataTable.rawTable.length; i++) {
        lastDBResult = undefined;
        let firstName = dataTable.rawTable[i][0];
        let lastName = dataTable.rawTable[i][1];
        let eMailAddress = dataTable.rawTable[i][2];
        lastDBResult = await service.addPerson(firstName, lastName, eMailAddress);
    }
    // Verify that we now have 3 persons in the collection
    assert.strictEqual(await service.countKnownPersons(), 3);
});

When(/^de CSR een lijst van bekende personen opvraagt$/, async function () {
    lastDBResult = undefined;
    lastDBResult = await service.showListOfPersons();
});

Then(/^krijgt hij "([^"]*)" als resultaat$/, async function (expectedResult) {
    assert.strictEqual(lastDBResult, expectedResult);
});

Then(/^krijgt hij als resultaat voor de lijst van bekende personen$/, async function (dataTable) {
    let actualResultList = lastDBResult.split(/\n/);
    for (let i = 1; i < dataTable.rawTable.length; i++) {
        assert.strictEqual( actualResultList[i-1], dataTable.rawTable[i][0])
    }
});

Given(/^de CSR een persoon toegevoegd heeft met voornaam "([^"]*)", familienaam "([^"]*)" en e\-mailadres "([^"]*)"$/,
                async function (firstName, lastName, eMailAddress) {
    lastDBResult = undefined; lastInsertedId = undefined;
    lastDBResult = await service.addPerson(firstName, lastName, eMailAddress);
});

Given(/^de CSR het toegekende uniek id gekregen heeft$/, function () {
    lastInsertedId = lastDBResult.insertedId; // ObjectId type
    assert.strictEqual(lastInsertedId.toString().length, 24);
});

When(/^de CSR de persoon met het toegekende uniek id opzoekt$/, async function () {
    lastDBResult = undefined;
    lastDBResult = await service.searchPersonById(lastInsertedId);
});

Then(/^krijgt hij "([^"]*)"$/, function (expectedValue) {
    assert.strictEqual(lastDBResult, expectedValue);
});

When(/^de CSR de persoon met het e\-mailadres "([^"]*)" opzoekt$/, async function (eMailAddress) {
    lastDBResult = undefined;
    lastDBResult = await service.searchPersonByEmailAddress(eMailAddress);
});

When(/^een andere toepassing API\-info opvraagt$/, async function () {
    lastDBResult = undefined;
    lastDBResult = await service.getApiInfo();
});

Then(/^is de waarde van "([^"]*)" gelijk aan "([^"]*)"$/, function (prop, val) {
    assert.strictEqual(lastDBResult[prop], val);
});