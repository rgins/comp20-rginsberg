var map;

var south = {lat: 42.352271, lng:-71.05524200000001};
var andrew = {lat: 42.330154, lng: -71.057655};
var porter_square  = {lat: 42.3884, lng: -71.11914899999999};
var harvard_square = {lat: 42.373362, lng: -71.118956};
var jfk_umass = {lat: 42.320685, lng: -71.052391};
var savin_hill = {lat: 42.31129, lng: -71.053331};

var park_street = {lat: 42.35639457, lng: -71.0624242};
var broadway  = {lat: 42.342622, lng: -71.056967};
var north_quincy = {lat: 42.275275, lng: -71.029583};
var shawmut = {lat: 42.29312583, lng: -71.06573796000001};
var davis = {lat: 42.39674, lng: -71.121815};
var alewife = {lat: 42.395428, lng: -71.142483};
var  kendall_mit = {lat: 42.36249079, lng: -71.08617653};
var  charles_mgh = {lat: 42.361166, lng: -71.070628};
var downtown_crossing = {lat: 42.355518, lng: -71.060225};
var quincy_center = {lat:  42.251809, lng: -71.005409 };
var quincy_adams = {lat: 42.233391, lng: -71.007153};
var ashmont = {lat: 42.284652, lng: -71.06448899999999};
var wollaston = {lat: 42.2665139, lng: -71.0203369};
var fields_corner = {lat: 42.300093, lng: -71.061667};
var central_square = {lat: 42.365486, lng: -71.103802};
var braintree = {lat: 42.2078543, lng: -71.0011385};

var stations = [
{position: alewife, stop_name: "Alewife", stop_id: "place_alcfcl"},
{position: davis, stop_name: "Davis", stop_id: "place_davis"},
{position: porter_square, stop_name: "Porter Square", stop_id: "place_pptr"}, 
{position: harvard_square, stop_name: "Harvard Square", stop_id: "place_hrsq"}, 
{position: central_square, stop_name: "Central Square", stop_id: "place_cntsq"},
{position: kendall_mit, stop_name: "Kenall/MIT", stop_id: "place_knncl"},
{position: charles_mgh, stop_name: "Charles/MGH", stop_id: "place_chnml"},
{position: park_street, stop_name: "Park Street", stop_id: "place_pktrm"},
{position: downtown_crossing, stop_name: "Downtown Crossing", stop_id: "place_dwnxg"},
{position: south, stop_name: "South Station", stop_id: "place_sstat"},
{position: broadway, stop_name: "Broadway", stop_id: "place_brdwy"},
 {position: andrew, stop_name: "Andrew", stop_id: "place_andrw"}, 
 {position: jfk_umass, stop_name: "JFK/UMASS", stop_id: "place_jfk"},
//  {position: savin_hill, stop_name: "Savin Hill", stop_id: "place_shmnl"},
 
 
// {position: north_quincy, stop_name: "North Quincy", stop_id: "place_nqncy"},
// {position: shawmut, stop_name: "Shawmut", stop_id: "place_smmnl"},



// {position: quincy_center, stop_name: "Quincy Center", stop_id: "place_qnctr"},
// {position: quincy_adams, stop_name: "Quincy Adams", stop_id: "place_qamnl"},
// {position: ashmont, stop_name: "Ashmont", stop_id: "place_asmnl"},
// {position: wollaston, stop_name: "Wollaston", stop_id: "place_wlsta"},
// {position: fields_corner, stop_name: "Fields Corner", stop_id: "place_fldcr"},

// {position: braintree, stop_name: "Braintree", stop_id: "place_brntn"}
];




function initMap() {
   // The map, centered at south station
    map = new google.maps.Map(document.getElementById('map'), {
         center: south,
          zoom: 12
        });
      // The marker, positioned at Uluru
      // var south_marker = new google.maps.Marker({position: south, 
      //  title: "South Station", map: map});

      var pos_list = [];
      for (i = 0; i < stations.length; i++) {
      	var pos = stations[i].position;
      	pos_list[i] = pos;
      }

      var line = new google.maps.Polyline({
      	path: pos_list, 
      	map: map, 
      	strokeColor: "red",
      	strokeWeight: 2,
      	storkeOpacity: 1.0});


        stations.forEach(function(station) {
          var marker = new google.maps.Marker({
            position: station.position,
            map: map

            // label: station.stop_name
            // use MarkerLabel to make pop up square that holds 
            // time information
          });
        });


}


