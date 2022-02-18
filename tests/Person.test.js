const Person = require('../src/domain/Person.js');

test("Create a person", () => {
    const person = new Person("Hans", "Vandenbogaerde", "hans.vdb@gmail.com");
    expect(person.firstName).toBe("Hans");
    expect(person.lastName).toBe("Vandenbogaerde");
    expect(person.eMailAddress).toBe("hans.vdb@gmail.com");
    expect(person.id).toBeUndefined();
})

