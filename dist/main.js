var Lib=function(t){"use strict";function e(t){for(var e=[],n=new Date(Date.UTC(2017,0,2)),a=0;a<7;a++)e.push(n.toLocaleDateString(t,{weekday:"short"})),n.setDate(n.getDate()+1);return e}function n(t,e){if(t&&e){var n,a=(t=new Date(+t)).getDate();t.setMonth(t.getMonth()+e,1),n=t.getMonth(),t.setDate(a),t.getMonth()!==n&&t.setDate(0)}return t}function a(t,a){function i(t,e){switch(t){case"day":return e.getDate();case"month":return e.getMonth()+1;case"year":return e.getFullYear();default:throw new Error("Wrong date unit")}}var r=i("month",t=new Date(t.setSeconds(0,0))),o=i("year",t);return{now:t,displayDate:t,currentDay:i("day",t),currentMonth:r,currentYear:o,addMonths:n,firstDayOfMonth:function(t,e){return new Date(e,t-1).getDay()-1},daysInMonth:function(t,e){return new Date(e,t,0).getDate()},getDateUnit:function(t,e){switch(t){case"day":return e.getDate();case"month":return e.getMonth()+1;case"year":return e.getFullYear();default:throw new Error("Unknown date unit")}},dayNames:e(a),getMonthName:function(t){return t=Math.abs((t-1)%12),function(t){for(var e=[],a=new Date(Date.UTC(2017,0,1)),i=0;i<12;i++)e.push(a.toLocaleDateString(t,{month:"long"})),a=n(a,1);return e}(a)[t]}}}function i(t,e,n,a){var i=t.dateUtil,r=i.getDateUnit,o=[],d=i.firstDayOfMonth(r("month",a),r("year",a)),s=7*e+n+1;return s>d&&s-d<=i.daysInMonth(r("month",a),r("year",a))?(s-=d,o.push("day")):s="",new Date(r("year",a),r("month",a)-1,s)<new Date(r("year",i.now),r("month",i.now)-1,i.currentDay)&&o.push("inactive"),new Date(r("year",a),r("month",a)-1,s).toString()===new Date(r("year",i.now),r("month",i.now)-1,i.currentDay).toString()&&o.push("today"),'<td class="'+o.join(" ")+'"><span class="calendar-day" id="'+t.input.type+'-datepicker" data-day="'+r("year",a)+"-"+r("month",a)+"-"+s+'">'+s+"</span></td>"}function r(t,e,n){for(var a=[],r=0;r<7;r++)a.push(i(t,e-1,r,n));return"<tr>"+a.join("")+"</tr>"}function o(t,e){for(var n=t.dateUtil,a=n.getDateUnit,i=[],o=Math.ceil((n.daysInMonth(a("month",e),a("year",e))+n.firstDayOfMonth(a("month",e),a("year",e)))/7)+1,d=0;d<o;d++)i.push(r(t,d,e));return'<div class="body"><table><tr class="day-names"><td>'+n.dayNames.join("</td><td>")+"</td></tr>"+i.join("")+"</table></div>"}function d(t){var e,n=t.document,a=t.selectPast?"td.day":"td.day:not(.inactive)",i=function(e){var n=e.target.dataset.day.split("-");t.pickDate(new Date(n[0],parseInt(n[1])-1,n[2]))};t.container.innerHTML=function(t){for(var e=t.dateUtil,n=e.getDateUnit,a=e.displayDate,i=t.months,r='<div class="table"><div class="head">'+t.title+'<div class="head-closer"><i class="icon-close">x</i></div></div>',d=0;d<i;d++)a=e.addMonths(a,d),r+='<div class="month-container"><div class="month-selector">',r+=0===d?'<div id="minus-wrapper"> <span id="minus">-</span> </div>':"",r+='<span class="month-name">'+e.getMonthName(n("month",a),t.locale)+" "+n("year",a)+"</span>",r+=d===i-1?'<div id="plus-wrapper"> <span id="plus">+</span> </div>':"",r+="</div>"+o(t,a)+"</div>";return r+"</div>"}(t),t.container.style.display="block";for(var r=(e=n.querySelectorAll(a)).length-1;r>=0;r--)e[r].addEventListener("mousedown",i);n.getElementById("plus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,1),d(t)})),n.getElementById("minus-wrapper").addEventListener("mousedown",(function(e){e.stopPropagation(),t.dateUtil.displayDate=t.dateUtil.addMonths(t.dateUtil.displayDate,-1),d(t)}))}function s(t){!function(t){t.container=t.document.createElement("div"),t.container.className="datepicker",t.inputElement.parentNode.appendChild(t.container),t.hideCalendar(),t.pickDate(t.date)}(t),function(t){t.timeElement.addEventListener("change",(function(){t.pickDate()})),t.document.addEventListener("click",(function(e){"datepicker"!==e.target.id&&t.hideCalendar()})),t.inputElement.addEventListener("focusin",(function(){t.inputElement.classList.add("active"),d(t)}))}(t)}function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this,n=t._document||document;e.document=n,e.date=t.date||new Date,e.months=t.months||1,e.title=t.title||"",e.selectPast=void 0===t.selectPast||t.selectPast,e.input=t.input||{},e.input.datepicker=e.input.datepicker||"datepicker",e.inputElement=n.getElementById(e.input.datepicker),e.input.timeselect=e.input.timeselect||"time-select",e.timeElement=n.getElementById(e.input.timeselect),e.timeElement.value=t.time||"10:00",e.locale=t.locale||"en-US",e.dateUtil=new a(e.date,e.locale),e.selectedDate=void 0,n.addEventListener("DOMContentLoaded",(function(){s(e)})),n.addEventListener("pageshow",(function(){e.inputElement||s(e)}))}return c.prototype.pickDate=function(t){if("Invalid Date"!==(t=t||this.selectedDate).toString()){var e=this.timeElement.value.split(":");this.inputElement.value=t.toLocaleDateString(this.locale),t.setHours(e[0],e[1],0),this.selectedDate=t,this.dateUtil.displayDate=t,this.hideCalendar()}},c.prototype.hideCalendar=function(){this.container.style.display="none",this.inputElement.classList.remove("active")},t.DatePicker=c,t}({});
//# sourceMappingURL=main.js.map
