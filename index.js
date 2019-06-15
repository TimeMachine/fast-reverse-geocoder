var RBush = require('rbush');
var allCountryTree = new RBush(7).fromJSON(require('./data.json'));
allCountryTree.all().forEach(country => {
  country.countryTree = new RBush(7).fromJSON(country.countryTree);
});

function search(lon, lat){
  var counrties = allCountryTree.search({
    minX: lon,
    minY: lat,
    maxX: lon,
    maxY: lat,
  })
  for (var i = 0; i < counrties.length; i++) {
    var country = counrties[i];
    var lines = country.countryTree.search({
      minX: lon,
      minY: lat,
      maxX: 200,
      maxY: lat,
    });
    var inside = false;
    for (var j = 0; j < lines.length; j++) {
      var intersect = ((lines[j].y0 > lat) != (lines[j].y1 > lat))
              && (lon < (lines[j].x1 - lines[j].x0) * (lat - lines[j].y0) / (lines[j].y1 - lines[j].y0) + lines[j].x0);
      if (intersect) inside = !inside;
    }
    if (inside) {
      return { code: lines[0].countryCode, name: lines[0].countryName};
    }
  };
  return null;
}

exports.search = search;
