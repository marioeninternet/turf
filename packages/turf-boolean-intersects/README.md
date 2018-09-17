# @turf/boolean-intersects

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## booleanIntersects

Boolean-intersects returns (TRUE) two geometries intersect.

**Parameters**

-   `feature1` **([Geometry][1] \| [Feature][2]&lt;any>)** GeoJSON Feature or Geometry
-   `feature2` **([Geometry][1] \| [Feature][2]&lt;any>)** GeoJSON Feature or Geometry

**Examples**

```javascript
var point = turf.point([2, 2]);
var line = turf.lineString([[1, 1], [1, 2], [1, 3], [1, 4]]);

turf.booleanIntersects(line, point);
//=true
```

Returns **[boolean][3]** true/false

[1]: https://tools.ietf.org/html/rfc7946#section-3.1

[2]: https://tools.ietf.org/html/rfc7946#section-3.2

[3]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

<!-- This file is automatically generated. Please don't edit it directly:
if you find an error, edit the source file (likely index.js), and re-run
./scripts/generate-readmes in the turf project. -->

---

This module is part of the [Turfjs project](http://turfjs.org/), an open source
module collection dedicated to geographic algorithms. It is maintained in the
[Turfjs/turf](https://github.com/Turfjs/turf) repository, where you can create
PRs and issues.

### Installation

Install this module individually:

```sh
$ npm install @turf/boolean-intersects
```

Or install the Turf module that includes it as a function:

```sh
$ npm install @turf/turf
```