import DateUtil from "../utils/date";

function hideCalendar(datepicker) {
  datepicker.container.style.display = "none";
  datepicker.inputElement.classList.remove("active");
}

function pickDate(datepicker, date = datepicker.selectedDate) {
  if (date.toString() !== "Invalid Date") {
    var time = datepicker.timeElement.value.split(":");

    datepicker.inputElement.value = date.toLocaleDateString(datepicker.locale);

    date.setHours(time[0], time[1], 0);
    datepicker.selectedDate = date;
    datepicker.dateUtil.displayDate = date;
    hideCalendar(datepicker);
  }
}

function setupHtml(datepicker) {
  datepicker.container = datepicker.document.createElement("div");
  datepicker.container.className = "datepicker";
  datepicker.inputElement.parentNode.appendChild(datepicker.container);

  hideCalendar(datepicker);

  pickDate(datepicker, datepicker.date);
}

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

function draw(datepicker) {
  var daysList,
    queryString = datepicker.selectPast ? "td.day" : "td.day:not(.inactive)",
    pickOnClick = function (event) {
      var dateParts = event.target.dataset.day.split("-");
      pickDate(
        datepicker,
        new Date(dateParts[0], parseInt(dateParts[1]) - 1, dateParts[2])
      );
    };

  datepicker.container.innerHTML = renderTable(datepicker);
  datepicker.container.style.display = "block";

  daysList = datepicker.document.querySelectorAll(queryString);

  for (var i = daysList.length - 1; i >= 0; i--) {
    daysList[i].addEventListener("mousedown", pickOnClick);
  }

  datepicker.document
    .getElementById("plus-wrapper") // month plus listener
    .addEventListener("mousedown", function (e) {
      e.stopPropagation();
      datepicker.dateUtil.displayDate = datepicker.dateUtil.addMonths(
        datepicker.dateUtil.displayDate,
        1
      );
      draw(datepicker);
    });
  datepicker.document
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

function addListeners(datepicker) {
  datepicker.timeElement.addEventListener("change", function () {
    pickDate(datepicker);
  });

  datepicker.document.addEventListener("click", function (e) {
    if (e.target.id !== "datepicker") {
      hideCalendar(datepicker);
    }
  });

  datepicker.inputElement.addEventListener("focusin", function () {
    datepicker.inputElement.classList.add("active"); // keep input element in focus
    draw(datepicker);
  });
}

function initDatepicker(datepicker) {
  setupHtml(datepicker);
  addListeners(datepicker);
}

export function DatePicker(options = {}) {
  var datepicker = this;

  datepicker.document = options._document || document;

  datepicker.date = options.date || new Date();
  datepicker.months = options.months || 1;
  datepicker.title = options.title || "";
  datepicker.selectPast =
    options.selectPast === undefined || true ? true : false;

  datepicker.input = options.input || {};

  datepicker.input.datepicker = datepicker.input.datepicker || "datepicker";
  datepicker.inputElement = datepicker.document.getElementById(
    datepicker.input.datepicker
  );

  datepicker.input.timeselect = datepicker.input.timeselect || "time-select";
  datepicker.timeElement = datepicker.document.getElementById(
    datepicker.input.timeselect
  );

  datepicker.timeElement.value = options.time || "10:00";

  datepicker.locale = options.locale || "en-US";
  datepicker.dateUtil = new DateUtil(datepicker.date, datepicker.locale);
  datepicker.selectedDate = undefined;

  datepicker.document.addEventListener("DOMContentLoaded", function () {
    initDatepicker(datepicker);
  });

  // fixes the missing domcontentloaded event in
  // Firefox and Safari after using the browser back button
  datepicker.document.addEventListener("pageshow", function () {
    if (!datepicker.inputElement) {
      initDatepicker(datepicker);
    }
  });
}
