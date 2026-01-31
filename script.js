 mapboxgl.accessToken = '';

 
   navigator.geolocation.getCurrentPosition(successLocation,
    errorLocation, {
        enableHighAccuracy:true,
        maximumAge: 0,  // don’t use cached location
        timeout: 10000  // wait up to 10 seconds
    })

    function successLocation(position){
        console.log("Accuracy in meters:", position.coords.accuracy);
        console.log("Lat:", position.coords.latitude, "Lon:", position.coords.longitude);
        setupMap([position.coords.longitude, position.coords.latitude])
    }

    function errorLocation(){
        setupMap([76.9589, 10.9974])
    }

    function setupMap(center) {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: 15
        })

        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav)

        var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
        });

        map.addControl(directions, 'top-left');

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,  // follows user as they move
            showUserHeading: true,    // shows the direction the user is facing (if supported)
            showAccuracyCircle: false
        });
        map.addControl(geolocate, 'top-left');

        // Optional: trigger location when map is loaded
        map.on('load', () => {
            geolocate.trigger(); // automatically center on user's location

            // Add marker manually on first geolocate event
            map.on('geolocate', function(e) {
                const lon = e.coords.longitude;
                const lat = e.coords.latitude;

                // Add a custom marker
                new mapboxgl.Marker({ color: 'blue' })  // or customize icon
                    .setLngLat([lon, lat])
                    .setPopup(new mapboxgl.Popup().setText("You are here!"))
                    .addTo(map);
            });
        });
    }


