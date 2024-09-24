map.on("locationfound", (e) => {
    map.setView(e.latlng, 16);
    setLocation(e.latlng);
    setPosition([e.latlng.lat, e.latlng.lng])
  });

  map.on("locationerror", (e) => {
    alert("Location access denied.");
  });