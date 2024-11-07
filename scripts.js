// Initialize the map with specified options
const map = L.map("map", {
    center: [31.9045, 35.2045],
    zoom: 17.5,
    zoomSnap: 0.5,
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20,
}).addTo(map);

const zonesLayer = L.layerGroup().addTo(map);
const wasteContainersLayer = L.layerGroup().addTo(map);

// Load the GeoJSON data and add it to the map
$.getJSON("RamallahZones.json", function (data) {
    L.geoJson(data, {
        style: {
            color: "yellow",
            weight: 1,
            fillColor: "yellow",
            fillOpacity: 0.3,
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function () {
                alert("Zone: " + feature.properties.NAME_ENGLI + "\nMAIL_CODE: " + feature.properties.MAIL_CODE);
            });
        },
    }).addTo(zonesLayer);
});

// Toggle dark mode for the page
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".navbar").classList.toggle("dark-mode");
    document.querySelector(".modal-content").classList.toggle("dark-mode");
});

// Show and hide the login modal
const loginModal = document.getElementById("loginModal");
const closeModal = document.querySelector(".close");

document.querySelector(".navbar button").addEventListener("click", () => {
    loginModal.style.display = "block";
});

closeModal.onclick = function () {
    loginModal.style.display = "none";
};

// Close modal if the user clicks outside it
window.onclick = function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
};
