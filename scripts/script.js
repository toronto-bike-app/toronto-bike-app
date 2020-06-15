// NAMESPACE OBJECT
const app = {};

// LOCATION ARRAYS

// SCHOOLS ARRAY

app.schoolsArray = [
    {
        name: "Juno",
        value: "juno",
        lat: 43.6483,
        long: -79.3979
    },
    {
        name: "University of Toronto - St. George",
        value: "university-of-toronto-st-george",
        lat: 43.6629,
        long: -79.3957
    },
    {
        name: "George Brown - St. James",
        value: "george-brown-st-james",
        lat: 43.6513,
        long: -79.3702
    },
    {
        name: "Ryerson",
        value: "ryerson",
        lat: 43.6577,
        long: -79.3788
    },
    {
        name: "OCAD",
        value: "ocad",
        lat: 43.6530,
        long: -79.3912
    }
]

// PARKS ARRAY
app.parksArray = [
    {
        name: "High Park",
        value: "high-park",
        lat: 43.6465,
        long: -79.4637
    },

    {
        name: "Riverdale Park East",
        value: "riverdale-park-east",
        lat: 43.6708,
        long: -79.3561
    },

    {
        name: "Christie Pits Park",
        value: "christie-pits-park",
        lat: 43.6646,
        long: -79.4207
    },

    {
        name: "Toronto Music Garden",
        value: "toronto-music-garden",
        lat: 43.636927,
        long: -79.394655
    },

    {
        name: "Underpass Park",
        value: "underpass-park",
        lat: 43.6560117,
        long: -79.355092
    }
]

// SEARCH AGAIN BUTTON FUNCTION
app.replacePage = function () {
    location.reload(true);
}

// DISTANCE FUNCTION
// Called within the Ajax Call function
// Function created by:
// GeoDataSource.com (C) All Rights Reserved 2018
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

// AJAX CALL FUNCTION 
// Called from within the Choose Location function
app.callAPI = function (lat, long) {
    $.ajax({
        // This headers parameter somehow allowed us to get past a CORS errors; we don't exactly know why
        // ¯\_(ツ)_/¯
        headers: { 'Accept': 'application/ json' },
        url: 'https://api.citybik.es/v2/networks/bixi-toronto',
        dataType: 'json',
        method: 'GET'
    }).then((response) => {

        const data = response.network.stations;

        // Clears out list before data is displayed
        app.$infoStationList.html('');

        // Filters the API data based on distance from location
        const proximateStations = data.filter((station) => {
            const stationLat = station.latitude;
            const stationLong = station.longitude;

            // Calls Distance function, which will determine the distance between two locations
            const stationDistance = distance(lat, long, stationLat, stationLong, "K");

            // If less than 0.5km, keep the station in an array
            if (stationDistance < 0.5) {

                return station;

            }
        
        // Uses filtered array to render to DOM
        }).forEach((station) => {
            const stationLat = station.latitude;
            const stationLong = station.longitude;

            stationDistance = distance(lat, long, stationLat, stationLong, "K");

            // Renders to unordered list
            // Station name, distance, and number of free bikes
            app.$infoStationList.append(`
                <li class="station">
                    <h3 class="station-name">${station.name}</h3>
                    <p class="station-distance">Distance: ${stationDistance.toFixed(2) * 1000}m away</p>
                    <p class="bikes-available">Free Bikes: ${station.free_bikes}</p>
                    <ul class="bikes-available-list bikes-available-list-${station.id}">
                    
                    </ul>

                    
                </li>
            `)
            // Renders to nested unordered list
            // List of bike icons for each one available
            for (let i = 1; i <= station.free_bikes; i++) {
                $(`.bikes-available-list-${station.id}`).append(
                    `<li><i class="fas fa-bicycle bike-icon" aria-label="1 bike of ${station.free_bikes} available"></i></li>`
                )
            }
        })

        // Makes the bike-active section visible to user
        app.$bikeInfo.addClass('active');

        // Scrolls to the top of the bike-info section
        app.$bikeInfo[0].scrollIntoView({ behavior: "smooth" });

    })
}

// CHOOSE LOCATION FUNCTION 
// Callback function when user selects location from dropdown menu
app.chooseLocation = function () {

    // Gather the selected landmark type (Park or School)
    const landmarkName = $(this).attr('name');

    // Gathers name of location
    const locationValue = $(this).val();
    let name;
    let lat;
    let long;

    // Conditional that renders image and gathers name, lat, and long from appropriate location array 
    // lat and long are used as arguments for Call API function below
    if (landmarkName === 'park-location') {
        app.$infoLocationImage.attr('src', './assets/man-m-ho-aXKD2O6RzNU-unsplash.jpg').attr('alt', 'park with lots of leafy trees with solitary teal bike in the distance')
        app.parksArray.forEach((park) => {
            if (park.value === locationValue) {
                name = park.name;
                lat = park.lat;
                long = park.long;

            }
        })
    } else if (landmarkName === 'schools-location') {
        app.$infoLocationImage.attr('src', './assets/ryan-jacobson-cXUOQWdRV4I-unsplash.jpg').attr('alt', 'school campus with lots of trees, near a bike stand with one red bike with yellow tires')
        app.schoolsArray.forEach((school) => {
            if (school.value === locationValue) {
                name = school.name;
                lat = school.lat;
                long = school.long;

            }
        })
    }

    // Renders location name to bike-info section
    app.$infoLocationName.text(name);

    // Calls Ajax function
    app.callAPI(lat, long);


}

// CHOOSE LANDMARK FUNCTION 
// Callback when user selects either "Park" or "School"
app.chooseLandmark = function () {

    // Class name will determine the landmark type
    const landmarkValue = $(this).attr('class');

    // Populates select dropdown with a default option
    app.$selectLocation.html(`<option value="">Select Location</option>`);

    // Conditional that loops through appropriate location array and renders options into select dropdown
    if (landmarkValue === 'parks-radio') {
        app.$selectLocation.attr('name', 'park-location')
        app.parksArray.forEach((park) => {
            const parkName = park.name;
            const parkValue = park.value;
            app.$selectLocation.append(
                `<option value=${parkValue} class="park"> ${parkName} </option>`
            )

        })

    } else if (landmarkValue === 'schools-radio') {
        app.$selectLocation.attr('name', 'schools-location')
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

    // SELECTOR VARIABLES

    app.$formLocation = $('.form-location');
    app.$parksRadio = $('.parks-radio');
    app.$schoolsRadio = $('.schools-radio');
    app.$selectLocation = $('.select-location');

    app.$bikeInfo = $('.bike-info');
    app.$infoLocationName = $('.info-location-name');
    app.$infoLocationImage = $('.info-location-image');
    app.$infoStationList = $('.info-station-list');

    app.$buttonReset = $('.button-reset');

    // EVENT LISTENERS

    app.$formLocation.on('click', 'input[type="radio"]', app.chooseLandmark);
    app.$selectLocation.on('change', app.chooseLocation);
    app.$buttonReset.on('click', app.replacePage);

}

// DOCUMENT READY
$(document).ready(function () { app.init() });