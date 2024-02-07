"use strict";

console.log("calendar.js is running");

document.addEventListener('DOMContentLoaded', function() {
  fetch('/calendar-events')
  .then((response) => response.json())
  .then((responseData) => {
    document.querySelector('#my-div').innerText = responseData;
  
    console.log(responseData)

    const calendarEl = document.getElementById('calendar');
  
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      initialDate: '2024-02-06',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: responseData
    });
  
    calendar.render();
  });
  });