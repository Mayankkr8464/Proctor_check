// Log container
const logContainer = document.getElementById('log');
let fullScreenExitCount = 0;

// Log the message to the screen
function logAction(message) {
  const logItem = document.createElement('li');
  logItem.textContent = message;
  logContainer.appendChild(logItem);
}

// Detect right-click
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();  // Prevent the default right-click menu
  logAction('Right-click detected');
});

// Detect tab switch (visibility change)
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    logAction('Tab switched (Page hidden)');
  } else {
    logAction('Tab switched (Page visible)');
  }
});

// Disable text copying (Ctrl+C)
document.addEventListener('copy', function(event) {
  event.preventDefault();
  logAction('Text copying disabled (Ctrl+C)');
});

// Detect text selection and log it
document.addEventListener('selectstart', function(event) {
  event.preventDefault();
  logAction('Attempt to select text detected');
});

// Detect exit from full-screen mode across browsers
document.addEventListener('fullscreenchange', handleFullScreenChange);
document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
document.addEventListener('mozfullscreenchange', handleFullScreenChange);
document.addEventListener('msfullscreenchange', handleFullScreenChange);

function handleFullScreenChange() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && 
      !document.mozFullScreenElement && !document.msFullscreenElement) {
    fullScreenExitCount++;
    logAction('Exited full-screen mode (Total exits: ' + fullScreenExitCount + ')');
  }
}

// Fullscreen button toggle
const fullscreenButton = document.getElementById('fullscreenButton');
fullscreenButton.addEventListener('click', function() {
  enterFullScreen();
});

// Enter full-screen mode function
function enterFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

// Log the number of full-screen exits on exit from full-screen mode
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && (document.fullscreenElement || 
    document.webkitFullscreenElement || 
    document.mozFullScreenElement || 
    document.msFullscreenElement)) {
    document.exitFullscreen();
  }
});
