const fs = require('fs');
const test = require('tape');
const path = require('path');
const load = require('load-json-file');
const write = require('write-json-file');
const circle = require('@turf/circle');
const truncate = require('@turf/truncate');
const {geometryCollection, featureCollection, point, lineString, round} = require('@turf/helpers');
const nearestPointToLine = require('./');

const directories = {
    in: path.join(__dirname, 'test', 'in') + path.sep,
    out: path.join(__dirname, 'test', 'out') + path.sep
};

const fixtures = fs.readdirSync(directories.in).map(filename => {
    return {
        filename,
        name: path.parse(filename).name,
        geojson: load.sync(directories.in + filename)
    };
});

test('turf-nearest-point-to-line', t => {
    for (const {filename, name, geojson}  of fixtures) {
        const [points, line] = geojson.features;
        let {units} = geojson.properties || {};
        const nearest = nearestPointToLine(points, line, units);
        const distance = round(nearest.properties.dist, 13);
        nearest.properties.dist = distance;
        nearest.properties = Object.assign(nearest.properties, {
            'marker-color': '#F00',
            'marker-size': 'large',
            'marker-symbol': 'star'
        });
        const distanceCircle = truncate(circle(nearest, distance || 1, null, units, {fill: '#F00'}));
        const results = featureCollection([points, nearest, line, distanceCircle]);

        if (process.env.REGEN) write.sync(directories.out + filename, results);
        t.deepEqual(results, load.sync(directories.out + filename), name);
    }
    t.end();
});


test('turf-nearest-point-to-line -- throws', t => {
    const points = featureCollection([point([0, 0]), point([0, 1])]);
    const line = lineString([[1, 1], [-1, 1]]);

    t.throws(() => nearestPointToLine(null, line), /points is required/, 'missing points');
    t.throws(() => nearestPointToLine(points, null), /line is required/, 'missing line');

    t.throws(() => nearestPointToLine(points, line, 'invalid'), /units is invalid/, 'invalid units');
    t.throws(() => nearestPointToLine(points, points), /line must be a LineString/, 'invalid line');
    t.throws(() => nearestPointToLine(line, line), /points must be a Point Collection/, 'invalid points');

    t.end();
});

test('turf-nearest-point-to-line -- Geometry', t => {
    const points = featureCollection([point([0, 0]), point([0, 1])]);
    const geomPoints = geometryCollection([point([0, 0]).geometry, point([0, 1]).geometry]);
    const line = lineString([[1, 1], [-1, 1]]);

    t.assert(nearestPointToLine(points, line.geometry));
    t.assert(nearestPointToLine(geomPoints, line.geometry));
    t.end();
});

test('turf-nearest-point-to-line -- Empty FeatureCollection', t => {
    const points = featureCollection([]);
    const line = lineString([[1, 1], [-1, 1]]);

    t.throws(() => nearestPointToLine(points, line), /points must contain features/, 'points must contain features');
    t.end();
});