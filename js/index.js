let search = document.querySelector(".shm");
let ipa = document.querySelector(".ipa h2");
let locat = document.querySelector(".location h2");
let timezone = document.querySelector(".timezone h2");
let isp = document.querySelector(".isp h2");
let ip = document.querySelector(".ip");
const api =
  "https://geo.ipify.org/api/v2/country?apiKey=YOUR_API_KEY&ipAddress=8.8.8.8";
const key = "at_9aY64tksccBrCKmFP3L3bqimQpKUv";
var map = L.map("map");

let lat = null;
let lng = null;
let isvalid =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const loadapi = async (ip = "") => {
  try {
    let res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ip}`
    );
    let data = await res.json();
    lat = data.location.lat;
    lng = data.location.lng;
    displaymap();
    displayinfo(data);
  } catch (err) {
    console.log(err);
  }
};
loadapi();

const displayinfo = (data) => {
  ipa.innerHTML = data.ip;
  isp.innerHTML = data.isp;
  timezone.innerHTML = `UTC ${data.location.timezone}`;
  locat.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  ip.setAttribute("placeholder", "Search for any IP address or domain");
};

search.addEventListener("click", () => {
  if (ip.value == "") {
    ip.setAttribute("placeholder", "Please Enter IP Adress...");
  } else if (!ip.value.match(isvalid)) {
    ip.value = "";
    ip.setAttribute("placeholder", "Invalid IP Address...");
  } else {
    ipa.innerHTML = "-";
    isp.innerHTML = "-";
    timezone.innerHTML = "-";
    locat.innerHTML = "-";
    loadapi(ip.value);
    ip.value = "";
    ip.setAttribute("placeholder", "Loading...");
  }
});

const displaymap = () => {
  map.setView([lat, lng], 13);
  var marker = L.marker([lat, lng]).addTo(map);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);
};
