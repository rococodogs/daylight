var test = require('tape');
var formatDate = require('./daylight');
var date = '2014-05-28T09:00:00-04:00';

test('formatDate works', function(t) {
    t.equal(formatDate('l, F dS \'y', date), 'Wednesday, May 28th \'14');
    t.end();
});

test('escaping escapes', function(t) {
    t.equal(formatDate('\\M', date), 'M');
    t.equal(formatDate('\\d\\a\\y: l', date), 'day: Wednesday');
    
    t.end();
});

test('two-digit day: d', function(t) {
    t.equal(formatDate('d', date), '28');
    t.equal(formatDate('d', '2014-05-01'), '01');

    t.end();
});

test('three-letter day: D', function(t) {
    t.equal(formatDate('D', date), 'Wed');

    t.end();
});

test('day of month: j', function(t) {
    t.equal(formatDate('j', date), '28');

    t.end();
});

test('full word day: l', function(t) {
    t.equal(formatDate('l', date), 'Wednesday');

    t.end();
});

test('numeric day of the week, one-based: N', function(t) {
    t.equal(formatDate('N', date), '4');
    t.equal(formatDate('N', '2014-05-24'), '7');
    t.equal(formatDate('N', '2014-05-25'), '1');

    t.end();
});

test('suffix: S', function(t) {
    t.equal(formatDate('jS', date), '28th');
    t.equal(formatDate('jS', 'May 1 2014'), '1st');
    t.equal(formatDate('jS', '05-02-2014'), '2nd');
    t.equal(formatDate('jS', '2014-05-03'), '3rd');
    t.equal(formatDate('jS', '2014-05-04'), '4th');
    t.equal(formatDate('jS', '2014-05-10'), '10th');
    t.equal(formatDate('jS', '2014-05-11'), '11th');
    t.equal(formatDate('jS', '2014-05-12'), '12th');
    t.equal(formatDate('jS', '2014-05-13'), '13th');

    t.end();
});

test('zero-based day of the week: w', function(t) {
    t.equal(formatDate('w', date), '3');
    t.equal(formatDate('w', '2014-05-24'), '6');
    t.equal(formatDate('w', '2014-05-25'), '0');

    t.end();
});

test('numeric day of the year: z', function(t) {
    t.equal(formatDate('z', '2014-01-01'), '1');
    t.equal(formatDate('z', '2014-02-03'), '34');

    t.end();
});

test('month, full word: F', function(t) {
    t.equal(formatDate('F', date), 'May');

    t.end();
});

test('numeric month with leading zero: m', function(t) {
    t.equal(formatDate('m', date), '05');

    t.end();
});

test('month, abbreviated to three letters: M', function(t) {
    t.equal(formatDate('M', date), 'May');
    t.equal(formatDate('M', '2014-08-01'), 'Aug');

    t.end();
});

test('numeric month without leading zero: n', function(t) {
    t.equal(formatDate('n', date), '5');

    t.end();
});

test('four-digit year: Y', function(t) {
    t.equal(formatDate('Y', date), '2014');

    t.end();
});

test('two-digit year: y', function(t) {
    t.equal(formatDate('y', date), '14');

    t.end();
});

test('am or pm, lowercase: a', function(t) {
    t.equal(formatDate('a', date), 'am');
    t.equal(formatDate('a', '2014-05-28 23:00:00'), 'pm');

    t.end();
});

test('AM or PM, uppercase: A', function(t) {
    t.equal(formatDate('A', date), 'AM');
    t.equal(formatDate('A', '2014-05-28 23:00:00'), 'PM');

    t.end();
});

test('twelve-hour format, no leading zero: g', function(t) {
    t.equal(formatDate('g', date), '9');
    t.equal(formatDate('g', '2014-05-28 17:00:00'), '5');

    t.end();
});

test('twenty-four-hour format, no leading zero: G', function(t) {
    t.equal(formatDate('G', date), '9');
    t.equal(formatDate('G', '2014-05-28 17:00:00'), '17');

    t.end();
});

test('twelve-hour format, leading zero: h', function(t) {
    t.equal(formatDate('h', date), '09');
    t.equal(formatDate('g', '2014-05-28 17:00:00'), '5');

    t.end();
});

test('twenty-four-hour format, leading zero: H', function(t) {
    t.equal(formatDate('H', date), '09');
    t.equal(formatDate('H', '2014-05-28 17:00:00'), '17');

    t.end();
});

test('minutes, with leading zero: i', function(t) {
    t.equal(formatDate('i', '2014-05-28 17:01:00'), '01');
    t.equal(formatDate('i', '2014-05-28 17:30:00'), '30');

    t.end();
});

test('seconds, with leading zero: s', function(t) {
    t.equal(formatDate('s', '2014-05-28 17:00:01'), '01');
    t.equal(formatDate('s', '2014-05-28 17:00:30'), '30');

    t.end();
});