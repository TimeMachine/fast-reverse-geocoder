const fs = require('fs');
const RBush = require('rbush');
const data = require('./data.geo.json');
var allCountryTree = new RBush(7);

data.features.forEach(country => {
  var countryTree = new RBush(7);
  var multiPolygon = country.geometry.coordinates;
  if (country.geometry.type == "Polygon") {
    multiPolygon = [country.geometry.coordinates];
  }
  var allTreeBulk = [];
  multiPolygon.forEach(ploygon => {
    var ploygon = [].concat(...ploygon);
    var minLng = ploygon[0][0];
    var maxLng = ploygon[0][0];
    var minLat = ploygon[0][1];
    var maxLat = ploygon[0][1];
    
    var treeBulk = [];
    for (var i = 0; i < ploygon.length; i++) {
      var point = ploygon[i];

      if (point[0] < minLng)
        minLng = point[0];
      else if (point[0] > maxLng)
        maxLng = point[0];

      if (point[1] < minLat)
        minLat = point[1];
      else if (point[1] > maxLat)
        maxLat = point[1];
      
     
      var minLineLng;
      var maxLineLng;
      var minLineLat;
      var maxLineLat;
      var next = (i+1) % ploygon.length;
      if (ploygon[i][0] > ploygon[next][0]) {
        minLineLng = ploygon[next][0];
        maxLineLng = ploygon[i][0];
      } else {
        minLineLng = ploygon[i][0];
        maxLineLng = ploygon[next][0];
      }
      if (ploygon[i][1] > ploygon[next][1]) {
        minLineLat = ploygon[next][1];
        maxLineLat = ploygon[i][1];
      } else {
        minLineLat = ploygon[i][1];
        maxLineLat = ploygon[next][1];
      }
      treeBulk.push({
        minX: minLineLng,
        minY: minLineLat,
        maxX: maxLineLng,
        maxY: maxLineLat,
        x0: ploygon[i][0],
        x1: ploygon[next][0],
        y0: ploygon[i][1],
        y1: ploygon[next][1],
        countryCode: country.id,
        countryName: country.properties.name,
      });
    }
    countryTree.load(treeBulk);
    allTreeBulk.push({
      minX: minLng,
      minY: minLat,
      maxX: maxLng,
      maxY: maxLat,
      countryTree: countryTree,
    });
  });
  allCountryTree.load(allTreeBulk);
});

fs.writeFile("data.json", JSON.stringify(allCountryTree.toJSON()), function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved!");
}); 
