fast-reverse-geocoder
======
>A high-performance, offline reverse geocoder in JavaScript. The source of the data is [Natural Earth 50m countries dataset](http://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/).
The key idea of algorithm is two-layers R-tree.

## Installation
---
```bash
npm install fast-reverse-geocoder
```
## Usage
---
```javascript
var rg = require('fast-reverse-geocoder');

console.log(rg.search(-122.08385, 37.38605));
//{ code: 'USA', name: 'United States of America' }
```

## API
---
##### rg.search(Longitude, Latitude)
Output:

| Attribute	  |  type |  Detail |
|---|---|---|
| code  | string  | ISO 3166-1 alpha-2 country code  |
| name  | string  | country name  |

## Performance
---

Random 100k point
```
country-iso                      Benchmark took 11926.951654 milliseconds
country-reverse-geocoding        Benchmark took 5683.125483 milliseconds
which-country                    Benchmark took 140.823448 milliseconds
fast-reverse-geocoder            Benchmark took 120.940622 milliseconds
```

## Development
Run performance tests:

```bash
npm test
```

Generate R-tree:

```bash
npm run build
```

