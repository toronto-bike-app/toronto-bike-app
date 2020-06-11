// Create namespace object Y
// Document Ready Y
// Init Function Y
// Create variable DOM selectors
// Begin button needs id to scroll to main section Y


// Landmark Submit button -> Create Event Listener
//  Create parks and schools arrays -> five different options
//  .each() through the array, and render to DOM

// Dropdown Event Listener
//  make ajax call -> then method takes results
//  Create variables for each piece of data needed
//  Lat/Long Function used
//  Populate html tags with data variables
//  For ul, we'll need <li> with <h3>, <p>, <ul> with <li><i></li>
//  Toggle class to make display section visible

// Reset Button -> Event Listener
//  Toggle Class of display section to make invisible
//  Reset Forms

// NAMESPACE OBJECT
const app = {};








// INIT FUNCTION
app.init = function() {

  const $formLandmark = $('.form-landmark');
  const $parksRadio = $('.parks-radio');
  const $schoolsRadio = $('.schools-radio');
  const $buttonLandmark = $('.button-landmark');

  const $formLocation = $('.form-location'); 
  const $selectLocation = $('.select-location');

  const $bikeInfo = $('.bike-info');
  const $infoLocationName = $('.info-location-name');
  const $infoLocationImage = $('.info-location-image');
  const $infoStationList = $('.info-station-list');

  const $buttonReset = $('.button-reset');

}

// DOCUMENT READY
$(document).ready(function () {
  app.init();
});