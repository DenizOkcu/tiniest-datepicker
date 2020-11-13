import { drawCalendar } from "../utils/drawCalendar";

export function setupHtml(datepicker) {
  datepicker.container = datepicker.document.createElement("div");
  datepicker.container.className = "datepicker";
  datepicker.inputElement.parentNode.appendChild(datepicker.container);
  var optionsHtml = "";

  for (var i = 0; i < 24; i++) {
    var hour = i < 10 ? "0" + i : i;
    optionsHtml +=
      '<option value="' +
      hour +
      ':00">' +
      hour +
      ":00</option>" +
      '<option value="' +
      hour +
      ':30">' +
      hour +
      ":30</option>";
  }
  datepicker.timeElement.innerHTML = optionsHtml;

  datepicker.hideCalendar();

  datepicker.pickDate(datepicker.date);
}

export function addListeners(datepicker) {
  datepicker.timeElement.addEventListener("change", function () {
    datepicker.pickDate();
  });

  datepicker.document.addEventListener("click", function (e) {
    console.log("e", e.target.id);
    if (
      e.target.id !== "datepicker" &&
      e.target.id !== "plus-wrapper" &&
      e.target.id !== "minus-wrapper"
    ) {
      datepicker.hideCalendar();
    }
  });

  datepicker.inputElement.addEventListener("focusin", function () {
    datepicker.inputElement.classList.add("active"); // keep input element in focus
    drawCalendar(datepicker);
  });
}
