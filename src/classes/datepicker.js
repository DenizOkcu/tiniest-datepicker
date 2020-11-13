import { DateUtil } from "../utils/date";
import { setupHtml, addListeners } from "../utils/setup";

export function DatePicker(options = {}) {
  var datepicker = this,
    datepickerDocument = options._document || document,
    init = function init(datepicker) {
      setupHtml(datepicker);
      addListeners(datepicker);
    };

  datepicker.document = datepickerDocument;

  datepicker.date = options.date || new Date();
  datepicker.months = options.months || 1;
  datepicker.title = options.title || "";
  datepicker.selectPast =
    options.selectPast === undefined ? true : options.selectPast;

  datepicker.input = options.input || {};

  datepicker.input.datepicker = datepicker.input.datepicker || "datepicker";
  datepicker.inputElement = datepickerDocument.getElementById(
    datepicker.input.datepicker
  );

  datepicker.input.timeselect = datepicker.input.timeselect || "time-select";
  datepicker.timeElement = datepickerDocument.getElementById(
    datepicker.input.timeselect
  );

  datepicker.timeElement.value = options.time || "10:00";

  datepicker.locale = options.locale || "en-US";
  datepicker.dateUtil = new DateUtil(datepicker.date, datepicker.locale);
  datepicker.selectedDate = undefined;

  datepickerDocument.addEventListener("DOMContentLoaded", function () {
    init(datepicker);
  });

  // fixes the missing domcontentloaded event in
  // Firefox and Safari after using the browser back button
  datepickerDocument.addEventListener("pageshow", function () {
    if (!datepicker.inputElement) {
      init(datepicker);
    }
  });
}

DatePicker.prototype.pickDate = function pickDate(date) {
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

DatePicker.prototype.hideCalendar = function hideCalendar() {
  this.container.style.display = "none";
  this.inputElement.classList.remove("active");
};
