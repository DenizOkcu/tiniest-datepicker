import { draw } from "../utils/draw";

export function setupHtml(datepicker) {
  datepicker.container = datepicker.document.createElement("div");
  datepicker.container.className = "datepicker";
  datepicker.inputElement.parentNode.appendChild(datepicker.container);

  datepicker.hideCalendar();

  datepicker.pickDate(datepicker.date);
}

export function addListeners(datepicker) {
  datepicker.timeElement.addEventListener("change", function () {
    datepicker.pickDate();
  });

  datepicker.document.addEventListener("click", function (e) {
    if (e.target.id !== "datepicker") {
      datepicker.hideCalendar();
    }
  });

  datepicker.inputElement.addEventListener("focusin", function () {
    datepicker.inputElement.classList.add("active"); // keep input element in focus
    draw(datepicker);
  });
}
