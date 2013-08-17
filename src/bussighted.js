
var directionsDisplay;
var map;
var directionService = new google.maps.DirectionsService();

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      center: new google.maps.LatLng(51.461971, -0.355779),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    directionsDisplay.setMap(map);

    createNewDirectionRequest();
}

google.maps.event.addDomListener(window, 'load', initialize);


function createNewDirectionRequest(){

    var originLatLng = new google.maps.LatLng(51.461971,-0.355779);
    var destinationLatLng = new google.maps.LatLng(51.463724,-0.356787);

    var directionRequest = {
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: google.maps.TravelMode.WALKING,
//        transitOptions: TransitOptions,
        unitSystem: google.maps.UnitSystem.METRIC,
//        durationInTraffic: Boolean,
//        waypoints[]: DirectionsWaypoint,
//        optimizeWaypoints: Boolean,
//        provideRouteAlternatives: Boolean,
//        avoidHighways: Boolean,
//        avoidTolls: Boolean
        region: 'uk'
    };

    //Direction Route, contains the direction Leg,
    //the Direction Leg Contains the Direction Step
    //The direction Leg contains the start_address and end_address which are human readable.
    //this goes down into the direction step

    directionService.route(directionRequest, function(route, status) {
        console.log('status' + status);
        console.log('response' + route);

        //directionResult contains a set of routes[] contains an array of DirectionsRoute objects
        var directionResult = route;

        //A DirectionsRoute contains a single result from the specified origin
        // and destination. This route may consist of one or more legs
        // (of type DirectionsLeg) depending on whether any waypoints were
        // specified. As well, the route also
        // copyright and warning information which must be displayed to
        // the user in addition to the routing information.
        var directionRoutes = directionResult.routes[0];


        //A DirectionsLeg defines a single leg of a journey from the origin to the
        // destination in the calculated route. For routes that contain no waypoints,
        // the route will consist of a single "leg," but for routes that define one or
        // more waypoints, the route will consist of one or more legs,
        // corresponding to the specific legs of the journey.
        var directionLeg = directionRoutes.legs[0];

        //route is the DirectionsResult object


        //IMPORTANT : CAn use Lat_lngs in here there will be a lot of them,
        //documenting curves, can used these to keep a user on track.    USE path
        //path contains an array of LatLngs describing the course of this step.
        //within direction steps.

        //A User can walk to the location and it can
        //make a 'dunnnn ' noise when they reach a way point.

        //and can make a beeepppy nice noise when walking towards
        //the waypoint.

        //you need the end_point
        //and start_point here to make the beepy noises???


        directionsDisplay.setDirections(route);

        console.log(directionRoutes);




        //LEG INFO
        log('-----------------DIRECTION LEG INFOMATION ---------------------');
        console.log(directionLeg);
        log('LEG START ADDRESS : ' + directionLeg.start_address);
        log('LEG END ADDRESS : ' + directionLeg.end_address);
        log('LEG DURATION : ' + directionLeg.duration.text);   //but what speed is this in relation too???
        log('LEG DISTANCE : ' + directionLeg.distance.text);


        //we need to run through the steps
        //RUN THROUGH STEPS
        for(var i = 0;i<directionLeg.steps.length;i++){

            var directionStep = directionLeg.steps[i];

            //STEPS INFO
            log('-----------------DIRECTION STEP INFOMATION ---------------------');
            console.log(directionStep);
            log(directionStep.instructions);
            log(directionStep.distance.text + ' can say the distance to your location is, user can choose this' );
            log(directionStep.duration.text + ' can say : two minutes to your next way point, user can choose this.');
            log(directionStep.start_location + ' start location, can be used for beeps');
            log(directionStep.end_location + ' end location, can be used for beeps');
            log('REMEMBER PATH WITHIN THIS CAN BE USER TO KEEP A USER ON TRACK');
        }
    });
}

function log(object){
    console.log('[Log] : ' + object);
    $('.output').append('<p>'+object+'</p>');
}