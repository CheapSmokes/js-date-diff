/**
 * Summary. Business Day Counter (Using available packages. Not the most speed effective method)
 *
 * Description. A class to find the weekday difference between dates with an optional method to find business days.
 *
 * @link   https://github.com/CheapSmokes/js-date-diff
 * @file   This files defines the BusinessDayCounter class.
 * @author CheapSmokes
 * @since  1.0.0
 */

import { relativeTimeThreshold } from 'moment';

// Import the package.
var moment = require('moment-business-days');

class BusinessDayCounter {
  // Init properties
  diff: Number;
  format: string = 'DD/MM/YYYY';
  workingDays: number[] = [1, 2, 3, 4, 5];

  // Constructor. Do I need to explain?
  constructor(mode: string, firstDate: Date, secondDate: Date, publicHolidays?: any[]) {
    // Check which task we want to test for.
    if (mode === 'weekdays') {
      this.diff = this.weekdaysDaysBetweenTwoDates(firstDate, secondDate);
    } else if (mode === 'business') {
      this.diff = this.businessDaysBetweenTwoDates(firstDate, secondDate, publicHolidays);
    }
  }

  // Method: Get diff between two dates.
  weekdaysDaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    moment.updateLocale('us', {
      workingWeekdays: this.workingDays,
    });

    // Calculate the diff!
    let diff: number = this.calculateDiffBetweenDates(firstDate, secondDate);

    // And return it :D
    return diff;
  }

  // Method: Get diff between two dates whilst incorporating public holidays.
  businessDaysBetweenTwoDates(firstDate: Date, secondDate: Date, publicHolidays: any[]): number {
    // Check if publicHolidays was supplied.
    if (!publicHolidays) return null;

    // Check if the public holidays is a complex data structure.
    if (publicHolidays.some((publicHoliday) => publicHoliday.type))
      console.log('Contains complex structure'), (publicHolidays = this.generateDynamicPublicHolidays(dynamicHolidays));

    // Init array to store formatted public holidays.
    var publicHolidaysFormatted: Array<string> = [];

    // Format our public holidays into a string that can be ready by MomentJS.
    publicHolidays.forEach((val) => {
      publicHolidaysFormatted.push(moment(val).format('DD/MM/YYYY'));
    });

    // Update the locale with the stuff we need!
    moment.updateLocale('us', {
      holidays: publicHolidaysFormatted,
      holidayFormat: this.format,
      workingWeekdays: this.workingDays,
    });

    // Calculate the diff!
    let diff: number = this.calculateDiffBetweenDates(firstDate, secondDate);

    // And return it ;)
    return diff;
  }

  calculateDiffBetweenDates(firstDate: Date, secondDate: Date): number {
    // Vars for start and end date. Using this to clone moment objects so they dont get messed up later down the line.
    let startDate = moment(firstDate);
    let endDate = moment(secondDate);

    // Check if the end date is in the past.
    if (moment(endDate).isBefore(startDate)) {
      return 0;
    }

    // Total days between
    let diff = endDate.diff(startDate, 'days');

    // Set total count to zero.
    var totalBusinessDays: number = 0;

    // Loop through each day.
    for (var i = 1; i < diff; i++) {
      // Add 1 day to the date object through the loop.
      var currentDate = startDate.add(1, 'days');

      // Check if it a working today.
      if (currentDate.isBusinessDay()) {
        totalBusinessDays++;
      }
    }

    return totalBusinessDays;
  }

  generateDynamicPublicHolidays(input: Array<object>): Array<string> {
    // * To be completed. But heres the way it would be done.

    // ! Loop through each item and decypher what type of holiday it is. Then create a moment for each based on the exploded parts of the string.

    // ! Add each of the moments in 'DD/MM/YYYY' format to an array. Return the array and pump it into businessDaysBetweenTwoDates();

    var arr = [];
    return arr;
  }
}

module.exports = BusinessDayCounter;

// * Complex data structure for dynamic public holiday generation.
let dynamicHolidays: Array<object> = [
  { type: 'static', date: '25th April', repeat: 'yearly' },
  { type: 'dynamic', date: '1st January', repeat: 'yearly' },
  { type: 'fluid', date: '2nd Monday June', repeat: 'yearly' },
];

// Run the script with the relevant information.
let firstDate: Date = new Date('2013/12/24');
let secondDate: Date = new Date('2013/12/27');

// This will only take an array. Use a generator function to create a list of static date for Task 3 in the PDF.
let publicHolidays: Array<Date> = [new Date('2013/12/25'), new Date('2013/12/26'), new Date('2014/01/01')];

// Run the class!
var run = new BusinessDayCounter('business', firstDate, secondDate, publicHolidays);

// Show the result in the console.
console.log(run.diff);
