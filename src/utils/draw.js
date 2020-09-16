function renderDay(datepicker, row, day, displayDate) {
  var dateUtil = datepicker.dateUtil,
    getDateUnit = dateUtil.getDateUnit,
    classNames = [],
    firstDayOfMonth = dateUtil.firstDayOfMonth(
      getDateUnit("month", displayDate),
      getDateUnit("year", displayDate)
    ),
    displayDay = row * 7 + day + 1;

  if (
    displayDay > firstDayOfMonth &&
    displayDay - firstDayOfMonth <=
      dateUtil.daysInMonth(
        getDateUnit("month", displayDate),
        getDateUnit("year", displayDate)
      )
  ) {
    displayDay = displayDay - firstDayOfMonth;
    classNames.push("day");
  } else {
    displayDay = "";
  }

  if (
    new Date(
      getDateUnit("year", displayDate),
      getDateUnit("month", displayDate) - 1,
      displayDay
    ) <
    new Date(
      getDateUnit("year", dateUtil.now),
      getDateUnit("month", dateUtil.now) - 1,
      dateUtil.currentDay
    )
  ) {
    classNames.push("inactive");
  }

  if (
    new Date(
      getDateUnit("year", displayDate),
      getDateUnit("month", displayDate) - 1,
      displayDay
    ).toString() ===
    new Date(
      getDateUnit("year", dateUtil.now),
      getDateUnit("month", dateUtil.now) - 1,
      dateUtil.currentDay
    ).toString()
  ) {
    classNames.push("today");
  }

  return (
    '<td class="' +
    classNames.join(" ") +
    '"><span class="calendar-day" id="' +
    datepicker.input.type +
    '-datepicker" data-day="' +
    getDateUnit("year", displayDate) +
    "-" +
    getDateUnit("month", displayDate) +
    "-" +
    displayDay +
    '">' +
    displayDay +
    "</span></td>"
  );
}

function renderRow(datepicker, row, displayDate) {
  var days = [];

  for (var i = 0; i < 7; i++) {
    days.push(renderDay(datepicker, row - 1, i, displayDate));
  }

  return "<tr>" + days.join("") + "</tr>";
}

function renderBody(datepicker, displayDate) {
  var dateUtil = datepicker.dateUtil,
    getDateUnit = dateUtil.getDateUnit,
    rows = [],
    numberOfRows =
      Math.ceil(
        (dateUtil.daysInMonth(
          getDateUnit("month", displayDate),
          getDateUnit("year", displayDate)
        ) +
          dateUtil.firstDayOfMonth(
            getDateUnit("month", displayDate),
            getDateUnit("year", displayDate)
          )) /
          7
      ) + 1;

  for (var i = 0; i < numberOfRows; i++) {
    rows.push(renderRow(datepicker, i, displayDate));
  }

  return (
    '<div class="body"><table><tr class="day-names"><td>' +
    dateUtil.dayNames.join("</td><td>") +
    "</td></tr>" +
    rows.join("") +
    "</table></div>"
  );
}

function renderTable(datepicker) {
  var dateUtil = datepicker.dateUtil,
    getDateUnit = dateUtil.getDateUnit,
    displayDate = dateUtil.displayDate,
    noOfMonths = datepicker.months,
    result =
      '<div class="table">' +
      '<div class="head">' +
      datepicker.title +
      '<div class="head-closer">' +
      '<i class="icon-close">x</i>' +
      "</div>" +
      "</div>";

  // loop through the number of months
  for (var i = 0; i < noOfMonths; i++) {
    displayDate = dateUtil.addMonths(displayDate, i);
    result += '<div class="month-container"><div class="month-selector">';

    // only the first line gets the left '<' icon
    result +=
      i === 0
        ? '<div id="minus-wrapper"> <span id="minus">-</span> </div>'
        : "";

    // add the month's name
    result +=
      '<span class="month-name">' +
      dateUtil.getMonthName(
        getDateUnit("month", displayDate),
        datepicker.locale
      ) +
      " " +
      getDateUnit("year", displayDate) +
      "</span>";

    // only the last line gets the right '>' icon
    result +=
      i === noOfMonths - 1
        ? '<div id="plus-wrapper"> <span id="plus">+</span> </div>'
        : "";

    // close the month selector div
    // and add the month calendar body
    result += "</div>" + renderBody(datepicker, displayDate) + "</div>";
  }

  //close the 'table' div
  return result + "</div>";
}

export function draw(datepicker) {
  var daysList,
    datepickerDocument = datepicker.document,
    queryString = datepicker.selectPast ? "td.day" : "td.day:not(.inactive)",
    pickOnClick = function (event) {
      var dateParts = event.target.dataset.day.split("-");
      datepicker.pickDate(
        new Date(dateParts[0], parseInt(dateParts[1]) - 1, dateParts[2])
      );
    };

  datepicker.container.innerHTML = renderTable(datepicker);
  datepicker.container.style.display = "block";

  daysList = datepickerDocument.querySelectorAll(queryString);

  for (var i = daysList.length - 1; i >= 0; i--) {
    daysList[i].addEventListener("mousedown", pickOnClick);
  }

  datepickerDocument
    .getElementById("plus-wrapper") // month plus listener
    .addEventListener("mousedown", function (e) {
      e.stopPropagation();
      datepicker.dateUtil.displayDate = datepicker.dateUtil.addMonths(
        datepicker.dateUtil.displayDate,
        1
      );
      draw(datepicker);
    });
  datepickerDocument
    .getElementById("minus-wrapper") // month minus listener
    .addEventListener("mousedown", function (e) {
      e.stopPropagation();
      datepicker.dateUtil.displayDate = datepicker.dateUtil.addMonths(
        datepicker.dateUtil.displayDate,
        -1
      );
      draw(datepicker);
    });
}
