// Not working on some machines with incorrect config.
const test = require('./main');

let firstDate = new Date('2013/10/07');
let secondDate = new Date('2014/01/01');

// This will only take an array. Use a generator function to create a list of static date for Task 3 in the PDF.
let publicHolidays = [new Date('2013/12/25'), new Date('2013/12/26'), new Date('2014/01/01')];

test('Should return 59 days with the given inputs.', () => {
    expect(test('business', firstDate, secondDate, publicHolidays)).toBe(59);
});