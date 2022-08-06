const saveICall = (event) => {
  const newEvent = { ...event }
  // Create the .ics URL
  const url = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART:' + newEvent.dateStart,
    'DTEND:' + newEvent.dateEnd,
    'SUMMARY:' + newEvent.name,
    'DESCRIPTION:' + newEvent.description,
    'LOCATION:' + newEvent.address,
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'REPEAT:1',
    'DURATION:PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  // Open/Save link in Modern Browsers
  window.open(encodeURI('data:text/calendar;charset=utf8,' + url));
}

export default saveICall;
