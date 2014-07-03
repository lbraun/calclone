/**
 * Copies events from private to public calendar, erasing the description.
 */
function transferNewEvents() {
  var staffCalendarName = "Events at BHFH (staff version)"
  var housieCalendarName = "Test BHFH Public"
  var originCalendar = CalendarApp.getCalendarsByName(staffCalendarName).pop();
  var destinationCalendar = CalendarApp.getCalendarsByName(housieCalendarName).pop();
  var copiedTag = "[COPIED]";
  var privateTag = "[PRIVATE]";
  var publicDescriptionTag = "[PUBLIC AFTER THIS]";
  var numberOfDaysToCopy = 2;
  var today = new Date();
  var startDate = today;
  var endDate = new Date()
  endDate.setDate(startDate.getDate() + numberOfDaysToCopy);
  var events = originCalendar.getEvents(startDate, endDate);
  while (events.length > 0) {
    var event = events.pop();
    var desc = event.getDescription();
    var copyable = (desc.indexOf(copiedTag) == -1) && (desc.indexOf(privateTag) == -1);
    if (copyable) {
      var publicDescription = '';
      if (desc.indexOf(publicDescriptionTag) !== -1) { // If the description contains the public tag
        var descriptionParts = desc.split(publicDescriptionTag);
        publicDescription = descriptionParts[1].trim();
      }
      makePublicCopy(originCalendar, destinationCalendar, event, publicDescription);
      // event.setDescription(desc + " " + copiedTag);
    }
  }
};

/**
 * Copies the given event without the description field.
 */
function makePublicCopy(origCal, destCal, origEvent, publicDescription) {
  var today = new Date();
  var title = origEvent.getTitle();
  var start = origEvent.getStartTime();
  var end = origEvent.getEndTime();
  //var desc = origEvent.getDescription().split("PUBLIC: ")[1];
  var desc = publicDescription;
  desc += '\n\nCopied from "' + origCal.getName() + '" on ' + today.toLocaleDateString() + '.';
  var loc = origEvent.getLocation();

  if (origEvent.isRecurringEvent()) {
    var origEventSeries = origEvent.getEventSeries();
    var origRecurrence
    var eventSeries = destCal.createEventSeries(title, start, end, recurrance, {
        description : desc,
        location : loc
    });
  }

  var event = destCal.createEvent(title, start, end, {
      description : desc,
      location : loc
  });
};





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
