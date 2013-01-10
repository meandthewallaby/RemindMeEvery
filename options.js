function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.frequency.value = localStorage.frequency;
 // The display frequency, in minutes.

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
});

