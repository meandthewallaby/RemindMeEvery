function showPopup() {
    var dt = new Date();
    var hours = dt.getHours();
    var numMinutes = dt.getMinutes();
    var ampm = hours > 11 ? "PM" : "AM";
    hours = (hours % 12 == 0) ? 12 : (hours % 12);
    var minutes = (numMinutes < 10 ? "0" : "") + numMinutes
    var title = hours + ":" + minutes + " " + ampm;
    var notification = window.webkitNotifications.createNotification(
	'icon48.png',
	title,
	'Time to ' + localStorage.reminder
    );

    notification.show();
}

function togglePopups() {
    if(window.webkitNotifications && !intervalOn) {
	notificationIntervalId = setInterval(function() {
	    showPopup();
	}, 60000);
	intervalOn = true;
	chrome.browserAction.setIcon({path:"icon48on.png"});
    } else {
	clearInterval(notificationIntervalId);
	intervalOn = false;
	chrome.browserAction.setIcon({path:"icon48off.png"});
    }
}

//First, set up the options
if (!localStorage.frequency || !localStorage.reminder) {
    localStorage.frequency = 1; //time in minutes
    localStorage.reminder = 'get off Chrome and back to work!';
}

var intervalOn = false;
var notificationIntervalId = 0;
chrome.browserAction.onClicked.addListener(togglePopups);
