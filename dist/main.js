var Lib=function(t){"use strict";function e(t){for(var e=[],n=new Date(Date.UTC(2017,0,2)),a=0;a<7;a++)e.push(n.toLocaleDateString(t,{weekday:"short"})),n.setDate(n.getDate()+1);return e}function n(t,e){return t=Math.abs((t-1)%12),function(t){for(var e=[],n=new Date(Date.UTC(2017,0,1)),i=0;i<12;i++)e.push(n.toLocaleDateString(t,{month:"long"})),n=a(n,1);return e}(e)[t]}function a(t,e){if(t&&e){var n,a=(t=new Date(+t)).getDate();t.setMonth(t.getMonth()+e,1),n=t.getMonth(),t.setDate(a),t.getMonth()!==n&&t.setDate(0)}return t}function i(t,e){return new Date(e,t-1).getDay()-1}function o(t,e){return new Date(e,t,0).getDate()}function d(t,d){function s(t,e){switch(t){case"day":return e.getDate();case"month":return e.getMonth()+1;case"year":return e.getFullYear()}}return{now:t=new Date(t.setSeconds(0,0)),displayDate:t,currentDay:s("day",t),currentMonth:s("month",t),currentYear:s("year",t),addMonths:a,firstDayOfMonth:i,daysInMonth:o,getDateUnit:s,dayNames:e(d),getMonthName:n}}function s(t,e,n,a){var i=t.dateUtil,o=i.getDateUnit,d=[],s=i.firstDayOfMonth(o("month",a),o("year",a)),r=7*e+n+1;return r>s&&r-s<=i.daysInMonth(o("month",a),o("year",a))?(r-=s,d.push("day")):r="",new Date(o("year",a),o("month",a)-1,r)<new Date(o("year",i.now),o("month",i.now)-1,i.currentDay)&&d.push("inactive"),new Date(o("year",a),o("month",a)-1,r).toString()===new Date(o("year",i.now),o("month",i.now)-1,i.currentDay).toString()&&d.push("today"),'<td class="'+d.join(" ")+'"><span class="calendar-day" id="'+t.input.type+'-datepicker" data-day="'+o("year",a)+"-"+o("month",a)+"-"+r+'">'+r+"</span></td>"}function r(t,e,n){for(var a=[],i=0;i<7;i++)a.push(s(t,e-1,i,n));return"<tr>"+a.join("")+"</tr>"}function c(t,e){for(var n=t.dateUtil,a=n.getDateUnit,i=[],o=Math.ceil((n.daysInMonth(a("month",e),a("year",e))+n.firstDayOfMonth(a("month",e),a("year",e)))/7)+1,d=0;d<o;d++)i.push(r(t,d,e));return'<div class="body"><table><tr class="day-names"><td>'+n.dayNames.join("</td><td>")+"</td></tr>"+i.join("")+"</table></div>"}function l(t){var e,n=t.document,a=t.selectPast?"td.day":"td.day:not(.inactive)",i=function(e){var n=e.target.dataset.day.split("-");t.pickDate(new Date(n[0],parseInt(n[1])-1,n[2]))};t.container.innerHTML=function(t){for(var e=t.dateUtil,n=e.getDateUnit,a=e.displayDate,i=t.months,o='<div class="table"><div class="head">'+t.title+'<div class="head-closer"><i class="icon-close">x</i></div></div>',d=0;d<i;d++)a=e.addMonths(a,d),o+='<div class="month-container"><div class="month-selector">',o+=0===d?'<div id="minus-wrapper"> <span id="minus">-</span> </div>':"",o+='<span class="month-name">'+e.getMonthName(n("month",a),t.locale)+" "+n("year",a)+"</span>",o+=d===i-1?'<div id="plus-wrapper"> <span id="plus">+</span> </div>':"",o+="</div>"+c(t,a)+"</div>";return o+"</div>"}(t),t.container.style.display="block";for(var o=(e=n.querySelectorAll(a)).length-1;o>=0;o--)e[o].addEventListener("mousedown",i);n.getElementById("plus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,1),l(t)})),n.getElementById("minus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,-1),l(t)}))}function u(t){!function(t){t.container=t.document.createElement("div"),t.container.className="datepicker",t.inputElement.parentNode.appendChild(t.container),t.hideCalendar(),t.pickDate(t.date)}(t),function(t){t.timeElement.addEventListener("change",(function(){t.pickDate()})),t.document.addEventListener("click",(function(e){"datepicker"!==e.target.id&&t.hideCalendar()})),t.inputElement.addEventListener("focusin",(function(){t.inputElement.classList.add("active"),l(t)}))}(t)}function p(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this,n=t._document||document;e.document=n,e.date=t.date||new Date,e.months=t.months||1,e.title=t.title||"",e.selectPast=void 0===t.selectPast||t.selectPast,e.input=t.input||{},e.input.datepicker=e.input.datepicker||"datepicker",e.inputElement=n.getElementById(e.input.datepicker),e.input.timeselect=e.input.timeselect||"time-select",e.timeElement=n.getElementById(e.input.timeselect),e.timeElement.value=t.time||"10:00",e.locale=t.locale||"en-US",e.dateUtil=new d(e.date,e.locale),e.selectedDate=void 0,n.addEventListener("DOMContentLoaded",(function(){u(e)})),n.addEventListener("pageshow",(function(){e.inputElement||u(e)}))}return p.prototype.pickDate=function(t){if("Invalid Date"!==(t=t||this.selectedDate).toString()){var e=this.timeElement.value.split(":");this.inputElement.value=t.toLocaleDateString(this.locale),t.setHours(e[0],e[1],0),this.selectedDate=t,this.dateUtil.displayDate=t,this.hideCalendar()}},p.prototype.hideCalendar=function(){this.container.style.display="none",this.inputElement.classList.remove("active")},t.DatePicker=p,t}({});
//# sourceMappingURL=main.js.map
