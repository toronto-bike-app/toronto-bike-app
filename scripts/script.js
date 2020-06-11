// Create namespace object Y
// Document Ready Y
// Init Function Y
// Create variable DOM selectors Y
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

const schoolsArray = [
    {
        name: "Juno",
        lat: 43.6483,
        long: 79.3979
    },
    {
        name: "University of Toronto - St. George",
        lat: 43.6629,
        long: 79.3957
    },
    {
        name: "George Brown - St. James",
        lat: 43.6513,
        long: 79.3702
    },
    {
        name: "Ryerson",
        lat: 43.6577,
        long: 79.3788
    },
    {
        name: "OCAD",
        lat: 43.6530,
        long: 79.3912
    }
]

const parksArray = [
    {
        name: "High Park",
        lat: 43.6465,
        long: 79.4637
    },

    {
        name: "Riverdale Park East",
        lat: 43.6708,
        long: 79.3561
    },

    {
        name: "Christie Pits Park",
        lat: 43.6646,
        long: 79.4207
    },

    {
        name: "Toronto Music Garden",
        lat: 43.636927,
        long: 79.394655
    },

    {
        name: "Underpass Park",
        lat: 43.6560117,
        long: 79.355092
    }
]







// INIT FUNCTION
app.init = function () {

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