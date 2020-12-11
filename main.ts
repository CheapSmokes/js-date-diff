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
  publicHolidays: string[] = ['25/12/2013', '26/12/2013', '01/1/2014'];

  // Constructor to select the correct
  constructor(mode: string) {
    // Check which task we want to test for.
    if (mode === 'weekdays') {
      this.diff = this.weekdaysDaysBetweenTwoDates();
    } else if (mode === 'business') {
      this.diff = this.businessDaysBetweenTwoDates();
    }
  }

  weekdaysDaysBetweenTwoDates(): number {
    moment.updateLocale('us', {
      workingWeekdays: this.workingDays,
    });

    // Get the diff minus 1 day on the trailing end.
    //var diff = moment('07/10/2013', 'DD/MM/YYYY').nextBusinessDay().businessDiff(moment('09/10/2013', 'DD/MM/YYYY').subtract(1, 'days'));
    return 0;
  }

  // Method: 
  businessDaysBetweenTwoDates(): number {
    moment.updateLocale('us', {
      holidays: this.publicHolidays,
      holidayFormat: this.format,
      workingWeekdays: this.workingDays,
    });

    // Vars for start and end date. This can take date objects as well if need be.
    let startDate = moment('24/12/2013', 'DD/MM/YYYY');
    let endDate = moment('27/12/2013', 'DD/MM/YYYY');

    // Total days between
    let diff = endDate.diff(startDate, 'days');

    // Set total count to zero.
    var totalBusinessDays = 0;

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
}

var run = new BusinessDayCounter('business');

console.log(run.diff);
