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

test('suffix generation', function(t) {
    t.equal(formatDate('jS', date), '28th');
    t.equal(formatDate('jS', 'May 1 2014 00:00:00'), '1st');
    t.equal(formatDate('jS', '05-02-2014 00:00:00'), '2nd');
    t.equal(formatDate('jS', '2014-05-03 00:00:00'), '3rd');
    t.equal(formatDate('jS', '2014-05-04 00:00:00'), '4th');
    t.equal(formatDate('jS', '2014-05-10 00:00:00'), '10th');
    t.equal(formatDate('jS', '2014-05-11 00:00:00'), '11th');
    t.equal(formatDate('jS', '2014-05-12 00:00:00'), '12th');
    t.equal(formatDate('jS', '2014-05-13 00:00:00'), '13th');

    t.end();
})

test('numeric day of the week', function(t) {
    t.equal(formatDate('N', '2014-05-24 00:00:00'), '7');
    t.equal(formatDate('N', '2014-05-25 00:00:00'), '1');

    t.end();
});

test('zero-based day of the week', function(t) {
    t.equal(formatDate('w', '2014-05-24 00:00:00'), '6');
    t.equal(formatDate('w', '2014-05-25 00:00:00'), '0');

    t.end();
});

test('numeric day of the year', function(t) {
    t.equal(formatDate('z', '2014-01-01 00:00:00'), '1');
    t.equal(formatDate('z', '2014-02-03 00:00:00'), '34');

    t.end();
});