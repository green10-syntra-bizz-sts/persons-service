class Person {

    constructor(firstName, lastName, eMailAddress) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._eMailAddress = eMailAddress;
        // the id will be set by the DatabaseManager upon saving to the database
        this._id = undefined;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get eMailAddress() {
        return this._eMailAddress;
    }

    set eMailAddress(value) {
        this._eMailAddress = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}

module.exports = Person;