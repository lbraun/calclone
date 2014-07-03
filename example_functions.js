/**
 * Creates a simple calendar event - requires modify permissions on the
 * calendar in question.
 * For more information on using Calendar events, see
 * https://developers.google.com/apps-script/class_calendarevent.
 */
function createEvent(calendarId) {
  var cal = CalendarApp.getCalendarById(calendarId);
  var title = 'Script Demo Event';
  var start = new Date("April 1, 2012 08:00:00 PDT");
  var end = new Date("April 1, 2012 10:00:00 PDT");
  var desc = 'Created using Google Apps Script';
  var loc = 'Script Center';

  var event = cal.createEvent(title, start, end, {
      description : desc,
      location : loc
  });
};

/**
 * Creates an event, invite guests, book rooms, and sends invitation emails.
 * For more information on using Calendar events, see
 * https://developers.google.com/apps-script/class_calendarevent.
 */
function createEventInvitePeople() {
  var calId = 'your_cal_id';
  var room1CalId = 'a_room_cal_id';
  var room2CalId = 'another_room_cal_id';
  var guest1Email = 'guest1@yourdomain.com';
  var guest2Email = 'guest2@yourdomain.com';
  var invitees = room1CalId + ',' + room2CalId + ',' + guest1Email + ',' +
      guest2Email;

  var cal = CalendarApp.getCalendarById(calId);
  var title = 'Script Center Demo Event';
  var start = new Date("April 1, 2012 08:00:00 PDT");
  var end = new Date("April 1, 2012 10:00:00 PDT");
  var desc = 'Created using Apps Script';
  var loc = 'Script Center';
  var send = 'true';

  var event = cal.createEvent(title, start, end, {
      description : desc,
      location : loc,
      guests : invitees,
      sendInvites : send
  });
};

/**
 * Creates an event that recurs weekly for 10 weeks. These settings
 * are very simple; recurring events can become quite complex. Search for
 * 'google apps script class recurrence' to get more details.
 * For more information on using Calendar events, see
 * https://developers.google.com/apps-script/class_calendarevent.
 */
function createEventSeries() {
  var calId = 'your_cal_id';
  var cal = CalendarApp.getCalendarById(calId);
  var title = 'Script Center Demo Recurring Event';
  var start = new Date("April 1, 2012 08:00:00 PDT");
  var end = new Date("April 1, 2012 10:00:00 PDT");
  var desc = 'Created using Apps Script';
  var loc = 'Script Center';

  var recurrence = CalendarApp.newRecurrence();
  recurrence.addWeeklyRule().times(10);
  var series = cal.createEventSeries(title, start, end, recurrence, {
      description : desc,
      location : loc
  });
};
