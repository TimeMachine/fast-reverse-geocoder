const countryIso = require('country-iso');
var crg = require('country-reverse-geocoding').country_reverse_geocoding();
var wc = require('which-country');
var rg = require('./index');
const NS_PER_SEC = 1e9
const exp_times = 100000;

var data = [];
var answer = [[],[],[],[]];
for (var i = 0; i < exp_times; i++) {
  data.push([Math.random()*360-180, Math.random()*360-180]);
}
data[0] = [ -29.293458100978654, 28.11287848534127 ];

var startTime, diff;

startTime = process.hrtime();
for (var i = 0; i < exp_times; i++) {
  var country = countryIso.get(data[i][0], data[i][1]);
}

diff = process.hrtime(startTime);
console.log(`country-iso  \t\t\t Benchmark took ${(diff[0] * NS_PER_SEC + diff[1]) / 1e6 } milliseconds`);

startTime = process.hrtime();

for (var i = 0; i < exp_times; i++) {
  var country = crg.get_country(data[i][0], data[i][1]);
}

var diff = process.hrtime(startTime);
console.log(`country-reverse-geocoding \t Benchmark took ${(diff[0] * NS_PER_SEC + diff[1]) / 1e6 } milliseconds`);

startTime = process.hrtime();
for (var i = 0; i < exp_times; i++) {
  var country = wc([data[i][1], data[i][0]]);
}

diff = process.hrtime(startTime);
console.log(`which-country  \t\t\t Benchmark took ${(diff[0] * NS_PER_SEC + diff[1]) / 1e6 } milliseconds`);

startTime = process.hrtime();
for (var i = 0; i < exp_times; i++) {
  var country = rg.search(data[i][1], data[i][0]);
}
diff = process.hrtime(startTime);
console.log(`fast-reverse-geocoder \t\t Benchmark took ${(diff[0] * NS_PER_SEC + diff[1]) / 1e6 } milliseconds`);
