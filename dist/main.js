var Lib=function(t){"use strict";function e(t){for(var e=[],n=new Date(Date.UTC(2017,0,2)),a=0;a<7;a++)e.push(n.toLocaleDateString(t,{weekday:"short"})),n.setDate(n.getDate()+1);return e}function n(t,e){return t=Math.abs((t-1)%12),function(t){for(var e=[],n=new Date(Date.UTC(2017,0,1)),i=0;i<12;i++)e.push(n.toLocaleDateString(t,{month:"long"})),n=a(n,1);return e}(e)[t]}function a(t,e){if(t&&e){var n,a=(t=new Date(+t)).getDate();t.setMonth(t.getMonth()+e,1),n=t.getMonth(),t.setDate(a),t.getMonth()!==n&&t.setDate(0)}return t}function i(t,e){return new Date(e,t-1).getDay()-1}function o(t,e){return new Date(e,t,0).getDate()}function r(t,r){function d(t,e){switch(t){case"day":return e.getDate();case"month":return e.getMonth()+1;case"year":return e.getFullYear()}}return{now:t=new Date(t.setSeconds(0,0)),displayDate:t,currentDay:d("day",t),currentMonth:d("month",t),currentYear:d("year",t),addMonths:a,firstDayOfMonth:i,daysInMonth:o,getDateUnit:d,dayNames:e(r),getMonthName:n}}function d(t,e,n,a){var i=t.dateUtil,o=i.getDateUnit,r=[],d=i.firstDayOfMonth(o("month",a),o("year",a)),s=7*e+n+1;return s>d&&s-d<=i.daysInMonth(o("month",a),o("year",a))?(s-=d,r.push("day")):s="",new Date(o("year",a),o("month",a)-1,s)<new Date(o("year",i.now),o("month",i.now)-1,i.currentDay)&&r.push("inactive"),new Date(o("year",a),o("month",a)-1,s).toString()===new Date(o("year",i.now),o("month",i.now)-1,i.currentDay).toString()&&r.push("today"),s===i.displayDate.getDate()&&r.push("selected"),'<td class="'+r.join(" ")+'"><span class="calendar-day" data-day="'+o("year",a)+"-"+o("month",a)+"-"+s+'">'+s+"</span></td>"}function s(t,e,n){for(var a=[],i=0;i<7;i++)a.push(d(t,e-1,i,n));return"<tr>"+a.join("")+"</tr>"}function l(t,e){for(var n=t.dateUtil,a=n.getDateUnit,i=[],o=Math.ceil((n.daysInMonth(a("month",e),a("year",e))+n.firstDayOfMonth(a("month",e),a("year",e)))/7)+1,r=0;r<o;r++)i.push(s(t,r,e));return'<div class="body"><table><tr class="day-names"><td>'+n.dayNames.join("</td><td>")+"</td></tr>"+i.join("")+"</table></div>"}function c(t){var e,n=t.document,a=t.selectPast?"td.day":"td.day:not(.inactive)",i=function(e){var n=e.target.dataset.day.split("-");t.pickDate(new Date(n[0],parseInt(n[1])-1,n[2]))};t.container.innerHTML=function(t){for(var e=t.dateUtil,n=e.getDateUnit,a=e.displayDate,i=t.months,o='<div class="table"><div class="head">'+t.title+'<i class="icon-close">x</i></div>',r=0;r<i;r++)a=e.addMonths(a,r),o+='<div class="month-container"><div class="month-selector">',o+='<span class="month-name">'+e.getMonthName(n("month",a),t.locale)+" "+n("year",a)+"</span>",o+=0===r?'<div id="minus-wrapper">&#8249;</div>':"",o+=r===i-1?'<div id="plus-wrapper">&#8250;</div>':"",o+="</div>"+l(t,a)+"</div>";return o+"</div>"}(t),t.container.style.display="block";for(var o=(e=n.querySelectorAll(a)).length-1;o>=0;o--)e[o].addEventListener("mousedown",i);n.getElementById("plus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,1),c(t)})),n.getElementById("minus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,-1),c(t)}))}function u(t){t.container=t.document.createElement("div"),t.container.className="datepicker",t.inputElement.parentNode.appendChild(t.container);for(var e="",n=0;n<24;n++){var a=n<10?"0"+n:n;e+='<option value="'+a+':00">'+a+':00</option><option value="'+a+':30">'+a+":30</option>"}t.timeElement.innerHTML=e,t.hideCalendar(),t.pickDate(t.date)}function p(t){t.timeElement.addEventListener("change",(function(){t.pickDate()})),t.document.addEventListener("click",(function(e){console.log("e",e.target.id),"datepicker"!==e.target.id&&"plus-wrapper"!==e.target.id&&"minus-wrapper"!==e.target.id&&t.hideCalendar()})),t.inputElement.addEventListener("focusin",(function(){t.inputElement.classList.add("active"),c(t)}))}function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this,n=t._document||document,a=function(t){u(t),p(t)};e.document=n,e.date=t.date||new Date,e.months=t.months||1,e.title=t.title||"",e.selectPast=void 0===t.selectPast||t.selectPast,e.input=t.input||{},e.input.datepicker=e.input.datepicker||"datepicker",e.inputElement=n.getElementById(e.input.datepicker),e.input.timeselect=e.input.timeselect||"time-select",e.timeElement=n.getElementById(e.input.timeselect),e.timeElement.value=t.time||"10:00",e.locale=t.locale||"en-US",e.dateUtil=new r(e.date,e.locale),e.selectedDate=void 0,n.addEventListener("DOMContentLoaded",(function(){a(e)})),n.addEventListener("pageshow",(function(){e.inputElement||a(e)}))}return h.prototype.pickDate=function(t){if("Invalid Date"!==(t=t||this.selectedDate).toString()){var e=this.timeElement.value.split(":");this.inputElement.value=t.toLocaleDateString(this.locale),t.setHours(e[0],e[1],0),this.selectedDate=t,this.dateUtil.displayDate=t,this.hideCalendar()}},h.prototype.hideCalendar=function(){this.container.style.display="none",this.inputElement.classList.remove("active")},t.DatePicker=h,Object.defineProperty(t,"__esModule",{value:!0}),t}({});
//# sourceMappingURL=main.js.map
