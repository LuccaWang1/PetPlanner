document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: '2024-02-14',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable: true,
    events: function(info, successCallback, failureCallback) {
      console.log(info)
      // Fetch events from the server
      fetch('/show-events')
      .then(response => response.json())
      .then(data => {
          if (data && data.events) {
            console.log(data)
            console.log(data.events)
              const eventsData = data.events.map(event => ({
                  title: event.title,
                  description: event.description,
                  start: event.start_date,
                  end: event.end_date,
                  allDay: event.allDay,
              }));

              successCallback(eventsData);

          } else {
              console.error('Received data or events array is undefined.');
              failureCallback('Received data or events array is undefined.');
          }
      });
    },
  });
  calendar.render();
});