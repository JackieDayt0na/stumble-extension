// ==============================================
// BACKGROUND SERVICE WORKER
// Runs in the background. For now, just handles
// installation and will be expanded later for
// history tracking, keyboard shortcuts, etc.
// ==============================================

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Stumble installed! Welcome to the indie web.');
  }
});
