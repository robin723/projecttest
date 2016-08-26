
 var config = {
    apiKey: "AIzaSyA8M_5lYpMyai148IIMJiKH9hAhZEzXSrA",
    authDomain: "my-first-firebase-cf941.firebaseapp.com",
    databaseURL: "https://my-first-firebase-cf941.firebaseio.com",
    storageBucket: "my-first-firebase-cf941.appspot.com",
  };

  console.log(2);
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function(){
	localStorage.clear();
	var nameInput = $("#nameInput").val().trim();
	var partynumberInput = $("#partynumberInput").val().trim();
	var businessnameInput = $("#businessnameInput").val().trim();
	var locationInput = $("#locationInput").val().trim();
	var destinationInput = $("#destinationInput").val().trim();

	var apiKey = 'AIzaSyAN0oSPw6LioE4Jdy-UjD2H0pWbvani_Wg';
	var queryURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ locationInput + '&key=' + apiKey ;
	
	console.log(locationInput);

	var res = encodeURI(locationInput);

	console.log("After Encoding", res);

	// First API Call
	// $.getJSON(queryURL, function(result){
	// 	console.log("result of getJSON call", result);
	// });

	// Second API Call
	$.ajax({url: queryURL, method: 'GET'}).done(function(result){
	// Creates local "temporary" object for holding employee data
		
		// Logs everything to console
		

		console.log(result);
		console.log(result.results[0].geometry.location.lat);
		console.log(result.results[0].geometry.location.lng);
		var startLat = result.results[0].geometry.location.lat;
		var startLng = result.results[0].geometry.location.lng;
		

			var destinationURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ destinationInput + '&key=' + apiKey ;

				console.log(destinationInput);

				var ret = encodeURI(destinationInput);

				console.log("After Encoding", ret);

				$.ajax({url: destinationURL, method: 'GET'}).done(function(result){
				
					
					// Logs everything to console
					

					console.log(result);
					console.log(result.results[0].geometry.location.lat);
					console.log(result.results[0].geometry.location.lng);
					var endLat = result.results[0].geometry.location.lat;
					var endLng = result.results[0].geometry.location.lng;

					//Google Places Map
					
				
				      var map;
				      var infowindow;
				      initMap();

				      function initMap() {
				        var dest = {lat: endLat, lng: endLng};

				        map = new google.maps.Map(document.getElementById('map'), {
				          center: dest,
				          zoom: 15
				        });

				        infowindow = new google.maps.InfoWindow();
				        var service = new google.maps.places.PlacesService(map);
				        service.nearbySearch({
				          location: dest,
				          radius: 5000,
				          keyword: [businessnameInput]
				        }, callback);
				      }

				      function callback(results, status) {
				        if (status === google.maps.places.PlacesServiceStatus.OK) {
				          for (var i = 0; i < results.length; i++) {
				            createMarker(results[i]);
				          }
				        }
				      }

				      function createMarker(place) {
				        var placeLoc = place.geometry.location;
				        var marker = new google.maps.Marker({
				          map: map,
				          position: place.geometry.location
				        });

				        google.maps.event.addListener(marker, 'mouseover', function() {
				          infowindow.setContent(place.name);

				          infowindow.open(map, this);
				        });
				        google.maps.event.addListener(marker, 'click', function() {
				          var locate = place.geometry.location.lat;
				          console.log(locate);

				        });
				      }
		
				});


	});




	// Third API Call
	// var lat = '34.1478';

	// var lng = '118.1445';

	// var ApiKey = "AIzaSyD48BakmgFW7xKLGhsfmv_ZsmtiG3bJTP4";

	// var locationURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&radius=2000&key=' + ApiKey;

	// // Try this: https://code.google.com/p/gmaps-api-issues/issues/detail?id=8210

	// $.ajax({url: locationURL, method: 'GET'}).done(function(response){

	// 	console.log("Third Call", response);

	// });

	// Alert
	//alert("Employee successfully added");

	// Clears all of the text-boxes
		



		var newInput = {
			name:  nameInput,
			party: partynumberInput,
			bname: businessnameInput,
			location: locationInput,
			destination: destinationInput
		}
		console.log(newInput.name);
		console.log(newInput.party);
		console.log(newInput.bname);
		console.log(newInput.location);

		// Uploads employee data to the database
		database.ref().push(newInput);

	return false;
});