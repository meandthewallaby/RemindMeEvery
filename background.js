function showPopup(reminderText) {
    var dt = new Date();
    var hours = dt.getHours();
    var numMinutes = dt.getMinutes();
    var ampm = hours > 11 ? "PM" : "AM";
    hours = (hours % 12 == 0) ? 12 : (hours % 12);
    var minutes = (numMinutes < 10 ? "0" : "") + numMinutes
    var title = hours + ":" + minutes + " " + ampm;

    if(!window.webkitNotifications){
        new Notification(title, {body: 'Time to ' + reminderText, icon: "icon48.png"});
    } else {
        var notification = window.webkitNotifications.createNotification(
    	'icon48.png',
    	title,
    	'Time to ' + reminderText
        );
        notification.show();
    }
}

function showPopups() {
    var reminders = JSON.parse(localStorage.reminders);
    for (var i = 0; i < reminders.length; i++) {
	var intervalId = 
	    setInterval(function(text) {
		showPopup(text);
	    }
	    ,60000 * reminders[i].frequency
	    ,reminders[i].text);
	intervalIds.push(intervalId);
    }
    intervalOn = true;
    chrome.browserAction.setIcon({path:"icon48on.png"});
}

function clearPopups() {
    while(intervalIds.length > 0) {
	clearInterval(intervalIds.pop());
    }
    intervalOn = false;
    chrome.browserAction.setIcon({path:"icon48off.png"});
}

function togglePopups() {
    if(!window.webkitNotifications && !Notification) {
	alert("Notifications are not supported!");
	clearPopups();
    } else {
	if(intervalOn) {
	    clearPopups();
	} else {
	    showPopups();
	}
    }
}

//Set up the options
if(!localStorage.reminders) {
    var reminders = Array();
    reminders[0] = {frequency: 5, text: 'get off Chrome and back to work!'};
    localStorage.reminders = JSON.stringify(reminders);
}

//Clean up old keys
if(localStorage.reminder) {
    localStorage.removeItem("reminder");
}
if(localStorage.frequency) {
    localStorage.removeItem("frequency");
}

//Add handlers
var intervalOn = false;
var intervalIds = Array();
chrome.browserAction.onClicked.addListener(togglePopups);
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if(intervalOn) {
	    clearPopups();
	    showPopups();
	}
    }
);
