/**
 * Copies events from private to public calendar, erasing the description.
 */
function transferNewEvents() {
  // Load calendars
  var staffCalendarName = "Events at BHFH (staff version)"
  var housieCalendarName = "BHFH Resident Calendar"
  var publicCalendarName = "BHFH Public Events"
  var originCalendar = CalendarApp.getCalendarsByName(staffCalendarName).pop();
  var destinationCalendar = CalendarApp.getCalendarsByName(housieCalendarName).pop();
  var publicCalendar = CalendarApp.getCalendarsByName(publicCalendarName).pop();

  // Define the different tags we will need
  var copiedTag = "[COPIED]";
  var privateTag = "[PRIVATE]";
  var publicTag = "[PUBLIC]";
  var publicDescriptionTag = "[PUBLIC AFTER THIS]";

  // Define how many days into the future the script should copy
  var numberOfDaysToCopy = 180;

  // Set up the copying date span
  var today = new Date();
  var startDate = today;
  var endDate = new Date()
  endDate.setDate(startDate.getDate() + numberOfDaysToCopy);


  // Go through all the events that fall within the date span
  var events = originCalendar.getEvents(startDate, endDate);
  while (events.length > 0) {
    var event = events.pop();
    var privateDescription = event.getDescription();

    // If the event hasn't been copied already and is not marked as private it is copyable
    var notCopied = privateDescription.indexOf(copiedTag) == -1;
    var notPrivate = privateDescription.indexOf(privateTag) == -1;
    var copyable = notCopied && notPrivate;
    if (copyable) {

      // If the description contains the public tag
      // change the destination calendar to the public calendar and delete the public tag
      if (privateDescription.indexOf(publicTag) !== -1) {
        destinationCalendar = publicCalendar;
        privateDescription = privateDescription.replace(publicTag, '').trim();
      }

      // If the description contains the public description tag
      // split the description into its public and private parts
      var publicDescription = '';
      if (privateDescription.indexOf(publicDescriptionTag) !== -1) {
        var descriptionParts = privateDescription.split(publicDescriptionTag);
        publicDescription = descriptionParts[1].trim();
      }

      // Copy the event and add the [COPIED] tag to its description
      makePublicCopy(originCalendar, destinationCalendar, event, publicDescription);
      event.setDescription(event.getDescription() + " " + copiedTag);
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
