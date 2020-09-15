var Lib=function(t){"use strict";function e(t){for(var e=[],n=new Date(Date.UTC(2017,0,2)),a=0;a<7;a++)e.push(n.toLocaleDateString(t,{weekday:"short"})),n.setDate(n.getDate()+1);return e}function n(t,e){if(t&&e){var n,a=(t=new Date(+t)).getDate();t.setMonth(t.getMonth()+e,1),n=t.getMonth(),t.setDate(a),t.getMonth()!==n&&t.setDate(0)}return t}var a=function(t,a){function i(t,e){switch(t){case"day":return e.getDate();case"month":return e.getMonth()+1;case"year":return e.getFullYear();default:throw new Error("Date unit not known - given: "+t+" (expected: day, month or year)")}}var o=i("month",t=new Date(t.setSeconds(0,0))),r=i("year",t);return{now:t,displayDate:t,currentDay:i("day",t),currentMonth:o,currentYear:r,addMonths:n,firstDayOfMonth:function(t,e){return new Date(e,t-1).getDay()-1},daysInMonth:function(t,e){return new Date(e,t,0).getDate()},getDateUnit:function(t,e){switch(t){case"day":return e.getDate();case"month":return e.getMonth()+1;case"year":return e.getFullYear();default:throw new Error("Date unit not known")}},dayNames:e(a),getMonthName:function(t){return t=Math.abs((t-1)%12),function(t){for(var e=[],a=new Date(Date.UTC(2017,0,1)),i=0;i<12;i++)e.push(a.toLocaleDateString(t,{month:"long"})),a=n(a,1);return e}(a)[t]}}};function i(t){t.container.style.display="none",t.inputElement.classList.remove("active")}function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.selectedDate;if("Invalid Date"!==e.toString()){var n=t.timeElement.value.split(":");t.inputElement.value=e.toLocaleDateString(t.locale),e.setHours(n[0],n[1],0),t.selectedDate=e,t.dateUtil.displayDate=e,i(t)}}function r(t,e,n,a){var i=t.dateUtil,o=i.getDateUnit,r=[],d=i.firstDayOfMonth(o("month",a),o("year",a)),s=7*e+n+1;return s>d&&s-d<=i.daysInMonth(o("month",a),o("year",a))?(s-=d,r.push("day")):s="",new Date(o("year",a),o("month",a)-1,s)<new Date(o("year",i.now),o("month",i.now)-1,i.currentDay)&&r.push("inactive"),new Date(o("year",a),o("month",a)-1,s).toString()===new Date(o("year",i.now),o("month",i.now)-1,i.currentDay).toString()&&r.push("today"),'<td class="'+r.join(" ")+'"><span class="calendar-day" id="'+t.input.type+'-datepicker" data-day="'+o("year",a)+"-"+o("month",a)+"-"+s+'">'+s+"</span></td>"}function d(t,e,n){for(var a=[],i=0;i<7;i++)a.push(r(t,e-1,i,n));return"<tr>"+a.join("")+"</tr>"}function s(t,e){for(var n=t.dateUtil,a=n.getDateUnit,i=[],o=Math.ceil((n.daysInMonth(a("month",e),a("year",e))+n.firstDayOfMonth(a("month",e),a("year",e)))/7)+1,r=0;r<o;r++)i.push(d(t,r,e));return'<div class="body"><table><tr class="day-names"><td>'+n.dayNames.join("</td><td>")+"</td></tr>"+i.join("")+"</table></div>"}function c(t){var e,n=t.selectPast?"td.day":"td.day:not(.inactive)",a=function(e){var n=e.target.dataset.day.split("-");o(t,new Date(n[0],parseInt(n[1])-1,n[2]))};t.container.innerHTML=function(t){for(var e=t.dateUtil,n=e.getDateUnit,a=e.displayDate,i=t.months,o='<div class="table"><div class="head">'+t.title+'<div class="head-closer"><i class="icon-close">x</i></div></div>',r=0;r<i;r++)a=e.addMonths(a,r),o+='<div class="month-container"><div class="month-selector">',o+=0===r?'<div id="minus-wrapper"> <span id="minus">-</span> </div>':"",o+='<span class="month-name">'+e.getMonthName(n("month",a),t.locale)+" "+n("year",a)+"</span>",o+=r===i-1?'<div id="plus-wrapper"> <span id="plus">+</span> </div>':"",o+="</div>"+s(t,a)+"</div>";return o+"</div>"}(t),t.container.style.display="block";for(var i=(e=t.document.querySelectorAll(n)).length-1;i>=0;i--)e[i].addEventListener("mousedown",a);t.document.getElementById("plus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,1),c(t)})),t.document.getElementById("minus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,-1),c(t)}))}function l(t){!function(t){t.container=t.document.createElement("div"),t.container.className="datepicker",t.inputElement.parentNode.appendChild(t.container),i(t),o(t,t.date)}(t),function(t){t.timeElement.addEventListener("change",(function(){o(t)})),t.document.addEventListener("click",(function(e){"datepicker"!==e.target.id&&i(t)})),t.inputElement.addEventListener("focusin",(function(){t.inputElement.classList.add("active"),c(t)}))}(t)}return t.DatePicker=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this;e.document=t._document||document,e.date=t.date||new Date,e.months=t.months||1,e.title=t.title||"",e.selectPast=(t.selectPast,!0),e.input=t.input||{},e.input.datepicker=e.input.datepicker||"datepicker",e.inputElement=e.document.getElementById(e.input.datepicker),e.input.timeselect=e.input.timeselect||"time-select",e.timeElement=e.document.getElementById(e.input.timeselect),e.timeElement.value=t.time||"10:00",e.locale=t.locale||"en-US",e.dateUtil=new a(e.date,e.locale),e.selectedDate=void 0,e.document.addEventListener("DOMContentLoaded",(function(){l(e)})),e.document.addEventListener("pageshow",(function(){e.inputElement||l(e)}))},t}({});
//# sourceMappingURL=main.js.map