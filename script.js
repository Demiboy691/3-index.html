/** @format */

document.addEventListener("DOMContentLoaded", () => {
  // Map
  const map = L.map("map").setView([6.5244, 3.3792], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Markers
  const pickupMarker = L.marker([6.5244, 3.3792], { draggable: true }).addTo(
    map
  );
  const dropoffMarker = L.marker([6.4656, 3.4064], { draggable: true }).addTo(
    map
  );

  let routeLine;
  const ORS_API_KEY = "YOUR_API_KEY_HERE"; // replace

  const rideInfo = document.getElementById("rideInfo");
  const distanceEl = document.getElementById("distance");
  const durationEl = document.getElementById("duration");
  const priceEl = document.getElementById("price");

  const baseFare = 500,
    perKm = 150,
    nightMultiplier = 1.5;

  function getTimeMultiplier() {
    const h = new Date().getHours();
    return h >= 18 || h < 6 ? nightMultiplier : 1;
  }

  async function updateRoute() {
    const pickupPos = pickupMarker.getLatLng();
    const dropoffPos = dropoffMarker.getLatLng();

    document.getElementById("pickup").value = `Lat:${pickupPos.lat.toFixed(
      5
    )},Lng:${pickupPos.lng.toFixed(5)}`;
    document.getElementById("dropoff").value = `Lat:${dropoffPos.lat.toFixed(
      5
    )},Lng:${dropoffPos.lng.toFixed(5)}`;

    try {
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${pickupPos.lng},${pickupPos.lat}&end=${dropoffPos.lng},${dropoffPos.lat}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.routes) return;

      const coords = data.routes[0].geometry.coordinates.map((c) => [
        c[1],
        c[0],
      ]);
      if (routeLine) map.removeLayer(routeLine);
      routeLine = L.polyline(coords, {
        color: "blue",
        weight: 4,
        opacity: 0.8,
      }).addTo(map);
      map.fitBounds(routeLine.getBounds());

      const distanceKm = data.routes[0].summary.distance / 1000;
      const durationMin = Math.round(data.routes[0].summary.duration / 60);
      distanceEl.textContent = distanceKm.toFixed(2);
      durationEl.textContent = durationMin;

      const offerVal =
        parseFloat(document.getElementById("offerPrice").value) || 0;
      const calculatedPrice = Math.max(
        baseFare + perKm * distanceKm,
        getTimeMultiplier() * offerVal || baseFare + perKm * distanceKm
      );
      priceEl.textContent = calculatedPrice.toFixed(0);

      rideInfo.classList.remove("hidden");
    } catch (e) {
      console.error("Route error", e);
    }
  }

  pickupMarker.on("dragend", updateRoute);
  dropoffMarker.on("dragend", updateRoute);
  updateRoute();

  // Driver marker
  const driverMarker = L.marker([6.5, 3.39], {
    icon: L.icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      iconSize: [32, 32],
    }),
  }).addTo(map);
  driverMarker.setOpacity(0);

  function animateDriverToPickup(pickupLatLng) {
    driverMarker.setLatLng([6.5, 3.39]);
    driverMarker.setOpacity(1);
    const steps = 50,
      delay = 100;
    const startLat = driverMarker.getLatLng().lat,
      startLng = driverMarker.getLatLng().lng;
    const deltaLat = (pickupLatLng.lat - startLat) / steps,
      deltaLng = (pickupLatLng.lng - startLng) / steps;
    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps) {
        clearInterval(interval);
        return;
      }
      driverMarker.setLatLng([
        startLat + deltaLat * step,
        startLng + deltaLng * step,
      ]);
      step++;
    }, delay);
  }

  // Ride form
  const drivers = [
    { name: "John Doe", car: "Toyota Corolla" },
    { name: "Ada Smith", car: "Honda Civic" },
    { name: "Mike Johnson", car: "Hyundai Accent" },
  ];

  document.getElementById("rideForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const pickup = document.getElementById("pickup").value.trim();
    const dropoff = document.getElementById("dropoff").value.trim();
    const time = document.getElementById("time").value;
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const offerPrice = document.getElementById("offerPrice").value.trim();
    const successMessage = document.getElementById("successMessage");

    if (!pickup || !dropoff || !time || !name || !phone) {
      alert("⚠️ Fill all fields");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      alert("⚠️ Invalid phone");
      return;
    }

    // Assign driver
    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
    document.getElementById("driverName").textContent = randomDriver.name;
    document.getElementById("driverCar").textContent = randomDriver.car;
    let eta = Math.floor(Math.random() * 11) + 5;
    document.getElementById("driverETA").textContent = eta;
    document.getElementById("driverInfo").classList.remove("hidden");

    // Animate driver
    const pickupPos = pickupMarker.getLatLng();
    animateDriverToPickup(pickupPos);

    successMessage.classList.remove("hidden");
    document.getElementById("rideForm").reset();
    updateRoute();
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  });

  // Login modal
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const loginForm = document.getElementById("loginForm");
  const loginError = document.getElementById("loginError");

  loginBtn.addEventListener("click", () =>
    loginModal.classList.remove("hidden")
  );
  closeModal.addEventListener("click", () =>
    loginModal.classList.add("hidden")
  );
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.classList.add("hidden");
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (email === "user@example.com" && password === "123456") {
      loginError.classList.add("hidden");
      loginModal.classList.add("hidden");
      alert("✅ Login successful!");
    } else loginError.classList.remove("hidden");
  });

  setTimeout(() => map.invalidateSize(), 300);
});
