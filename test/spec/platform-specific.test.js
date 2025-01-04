const compare = require('semver-compare');

const HAS_CLASS = compare(process.version, '6.0.0') >= 0;

!HAS_CLASS || require('./es6');
