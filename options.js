function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {
    // Initialize the option controls.
    options.frequency.value = localStorage.frequency;
    options.reminder.value = localStorage.reminder;

    options.remindme.onclick = function() {
	localStorage.frequency = options.frequency.value;
	localStorage.reminder = options.reminder.value;
    };
});

