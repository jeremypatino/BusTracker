/**
 * Fetches the latest bus data from the MBTA API.
 * 
 * @returns An object containing the latest MBTA bus data.
 */
async function getBuses() {
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;
}

/**
 * Fetches the bus data and updates map markers. Sets an interval to run again
 * in 15 seconds.
 */
async function run() {
    const buses = await getBuses();
    console.log(`${new Date()} - Updating bus location`);

    const bus = locations[0];
    const latitude = bus.attributes.latitude;
    const longitude = bus.attributes.longitude;

    const updatedLocation = new google.maps.LatLng(latitude, longitude);

    const marker = document.getElementById('marker');
    marker.position = updatedLocation;

    setTimeout(run, 15000);
}

run();
