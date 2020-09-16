function getDayNames(locale) {
  var dayNames = [],
    baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday

  for (var i = 0; i < 7; i++) {
    dayNames.push(baseDate.toLocaleDateString(locale, { weekday: "short" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }

  return dayNames;
}

function getMonthNames(locale) {
  var monthNames = [],
    baseDate = new Date(Date.UTC(2017, 0, 1)); // just a Day in January

  for (var i = 0; i < 12; i++) {
    monthNames.push(baseDate.toLocaleDateString(locale, { month: "long" }));
    baseDate = addMonths(baseDate, 1);
  }

  return monthNames;
}

function getMonthName(index, locale) {
  // -1 because January is 0 instead of 1
  // returned from getDateUnit for 'month'
  // % 12 because 13 should be 1
  index = Math.abs((index - 1) % 12);
  return getMonthNames(locale)[index];
}

function addMonths(date, count) {
  if (date && count) {
    var month,
      // dont remove the '+' in front of the date
      // http://xkr.us/articles/javascript/unary-add/
      day = (date = new Date(+date)).getDate();

    date.setMonth(date.getMonth() + count, 1);
    month = date.getMonth();

    date.setDate(day);

    if (date.getMonth() !== month) {
      date.setDate(0);
    }
  }

  return date;
}

function firstDayOfMonth(month, year) {
  return new Date(year, month - 1).getDay() - 1;
}

function daysInMonth(month, year) {
  // don't -1 for the month!
  // it is actually (month -1) + 1 to get the correct value
  return new Date(year, month, 0).getDate();
}

export function DateUtil(now, locale) {
  // remove seconds and miliseconds from the date
  // to normalise programmatic differences
  now = new Date(now.setSeconds(0, 0));

  function getDateUnit(unit, date) {
    switch (unit) {
      case "day":
        return date.getDate();
      case "month":
        return date.getMonth() + 1;
      case "year":
        return date.getFullYear();
    }
  }

  return {
    now: now,
    displayDate: now,
    currentDay: getDateUnit("day", now),
    currentMonth: getDateUnit("month", now),
    currentYear: getDateUnit("year", now),
    addMonths: addMonths,
    firstDayOfMonth: firstDayOfMonth,
    daysInMonth: daysInMonth,
    getDateUnit: getDateUnit,
    dayNames: getDayNames(locale),
    getMonthName: getMonthName,
  };
}
