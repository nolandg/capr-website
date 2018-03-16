export const distanceBetweenLocationsInKm = (a, b) => {
  return distanceBetweenLatlngInKm(a.lat, a.lng, b.lat, b.lng);
}

export const distanceBetweenLatlngInKm = (lat1,lng1,lat2,lng2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dlng = deg2rad(lng2-lng1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dlng/2) * Math.sin(dlng/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return Math.ceil(d);
}

export const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}
