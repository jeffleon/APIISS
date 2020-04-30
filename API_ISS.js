async function get_API_ISS()
{
    API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
    response = await fetch(API_URL); // i get the response of the promise of fetch
    data = await response.json(); // i parse de response
    console.log(data);
    const {longitude, latitude} = data;
    console.log(latitude, longitude);
    //document.getElementById("longitud").textContent = longitude;
    //document.getElementById("latitud").textContent = latitude;
    return {'Longitude': longitude,
            'Latitude': latitude};    
}
document.getElementById("pause").addEventListener("click", function() {
    pause = true;
    audioElement.pause();
});
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'Spanish Flea.mp3');
var mymap = L.map('mapid').setView([0, 0], 1);
var myIcon = L.icon({
    iconUrl: 'astronaut.png',
    iconSize: [38, 50],
    iconAnchor: [22, 94]
});
const marcador = L.marker([0,0], {icon: myIcon}).addTo(mymap);
const attributionm = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,attributionm);
tiles.addTo(mymap);
var pause = false;
setInterval(()=> get_API_ISS().then(data => {
    document.getElementById("longitud").textContent = data.Longitude;
    document.getElementById("latitud").textContent = data.Latitude;
    marcador.setLatLng([data.Latitude,data.Longitude]);
    //document.getElementById("myImage").style.display = "none";
    //audioElement.pause();
}).catch(err=>{
    document.getElementById("mapid").style.display = "none";
    document.getElementById("tecnical").style.visibility = "visible";
    document.getElementById("pause").style.visibility = "visible";
    if (pause == false)
    {

    
        var promise = audioElement.play();
        if (promise !== undefined) {
            promise.then(_ => {
            // Autoplay started!
            }).catch(error => {
           console.log("no se pudo reproducir la cancion");
           console.log(error);
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
            });
      }
    }
    console.log(err)

}),5000);



document.getElementById("Error").addEventListener("click", function() {
    document.getElementById("mapid").style.display = "none";
    document.getElementById("tecnical").style.visibility = "visible";
    document.getElementById("pause").style.visibility = "visible";
    if (pause == false)
    {
        var promise = audioElement.play();
        if (promise !== undefined) {
            promise.then(_ => {
            // Autoplay started!
            }).catch(error => {
           console.log("no se pudo reproducir la cancion");
           console.log(error);
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
            });
      }
    }
    console.log(err)
});
