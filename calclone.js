/**
 * Copies events from private to public calendar, erasing the description.
 */
function transferNewEvents() {
  var staffCalendarName = "Events at BHFH (staff version)"
  var housieCalendarName = "BHFH Resident Calendar"
  var originCalendar = CalendarApp.getCalendarsByName(staffCalendarName).pop();
  var destinationCalendar = CalendarApp.getCalendarsByName(housieCalendarName).pop();
  var copiedTag = "[COPIED]";
  var privateTag = "[PRIVATE]";
  var publicDescriptionTag = "[PUBLIC AFTER THIS]";
  var numberOfDaysToCopy = 180;
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
      event.setDescription(desc + " " + copiedTag);
    }
  }
};

/**
 * Copies the given event without the description field.
 */
function makePublicCopy(origCal, destCal, origEvent, publicDescription) {
  var includeCopyInformation = false;
  var today = new Date();
  var title = origEvent.getTitle();
  var start = origEvent.getStartTime();
  var end = origEvent.getEndTime();
  var desc = publicDescription;
  if (includeCopyInformation) {
    desc += '\n\nCopied from "' + origCal.getName() + '" on ' + today.toLocaleDateString() + '.';
  }
  var loc = origEvent.getLocation();

  var event = destCal.createEvent(title, start, end, {
      description : desc,
      location : loc
  });
};
