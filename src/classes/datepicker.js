import { DateUtil } from "../utils/date";
import { setupHtml, addListeners } from "../utils/setup";

function init(datepicker) {
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
    init(datepicker);
  });

  // fixes the missing domcontentloaded event in
  // Firefox and Safari after using the browser back button
  datepicker.document.addEventListener("pageshow", function () {
    if (!datepicker.inputElement) {
      init(datepicker);
    }
  });
}

DatePicker.prototype.pickDate = function (date) {
  date = date || this.selectedDate;
  if (date.toString() !== "Invalid Date") {
    var time = this.timeElement.value.split(":");

    this.inputElement.value = date.toLocaleDateString(this.locale);

    date.setHours(time[0], time[1], 0);
    this.selectedDate = date;
    this.dateUtil.displayDate = date;
    this.hideCalendar();
  }
};

DatePicker.prototype.hideCalendar = function () {
  this.container.style.display = "none";
  this.inputElement.classList.remove("active");
};
