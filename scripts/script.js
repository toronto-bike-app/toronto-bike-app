// Create namespace object Y
// Document Ready Y
// Init Function Y
// Create variable DOM selectors Y
// Begin button needs id to scroll to main section Y


// Landmark Submit button -> Create Event Listener
//  Create parks and schools arrays -> five different options Y
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


// Arrays for locations

//Arrays for schools

app.schoolsArray = [
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

//Arrays for parks

app.parksArray = [
    {
        name: "High Park",
        value: "high-park",
        lat: 43.6465,
        long: 79.4637
    },

    {
        name: "Riverdale Park East",
        value: "riverdale-park-east",
        lat: 43.6708,
        long: 79.3561
    },

    {
        name: "Christie Pits Park",
        value: "christie-pits-park",
        lat: 43.6646,
        long: 79.4207
    },

    {
        name: "Toronto Music Garden",
        value: "toronto-music-garden",
        lat: 43.636927,
        long: 79.394655
    },

    {
        name: "Underpass Park",
        value: "underpass-park",
        lat: 43.6560117,
        long: 79.355092
    }
]

app.chooseLocation = function() {
    const locationValue = $(this).attr('class');
    // $("option:contains('park')");
    console.log(locationValue);

    //Ajax call
    app.chooseLocation = function () {
        $.ajax({
            headers: { 'Accept': 'application/ json' },
            url: 'https://api.citybik.es/v2/networks/bixi-toronto',
            dataType: 'json',
            method: 'GET'
        }).then((response) => {
            // console.log(response);
        })
    }


}

app.chooseLandmark = function () {
    const landmarkValue = $(this).attr('class');
    app.$selectLocation.html(`<option value=""> Select </option>`);

    if (landmarkValue === 'parks-radio') {

        app.parksArray.forEach((park) => {
            const parkName = park.name;
            const parkValue = park.value;
            app.$selectLocation.append(
                `<option value=${parkValue} class="park"> ${parkName} </option>`
            )

        })

    } else if (landmarkValue === 'schools-radio') {
        app.schoolsArray.forEach((school) => {
            const schoolName = school.name;
            const schoolValue = school.value;
            app.$selectLocation.append(
                `<option value=${schoolValue} class="school"> ${schoolName} </option>`
            )
        })
    }

    

}


// INIT FUNCTION
app.init = function () {

    app.$formLocation = $('.form-location');
    app.$parksRadio = $('.parks-radio');
    app.$schoolsRadio = $('.schools-radio');
    app.$selectLocation = $('.select-location');

    app.$bikeInfo = $('.bike-info');
    app.$infoLocationName = $('.info-location-name');
    app.$infoLocationImage = $('.info-location-image');
    app.$infoStationList = $('.info-station-list');

    app.$buttonReset = $('.button-reset');

    app.$formLocation.on('click', 'input[type="radio"]', app.chooseLandmark);
    app.$selectLocation.on('change', app.chooseLocation);

}

// DOCUMENT READY
$(document).ready(function () {
    app.init();
});