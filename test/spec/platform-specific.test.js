var compare = require('semver-compare');

const HAS_CLASS = compare(process.versions.node, '6.0.0') >= 0;

!HAS_CLASS || require('./es6');
