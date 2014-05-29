function daylight(format, date) {
    if ( !(date instanceof Date) ) {
        date = new Date(date);
    }

    var output = ''
      , escape = false
        ;

    format.split('').forEach(function(let) {
        if ( let === '\\' && !escape ) {
            escape = true;
            return;
        }

        if ( escape ) {
            output += let;
            escape = false;
            return;
        }

        output += _translate(date, let);
    });

    return output;
}

function _translate(date, letter) {
    if ( !(date instanceof Date) ) {
        date = new Date(date);
    }

    var day = function(d, short) {
        if ( typeof short === 'undefined' ) { short = false; }
        switch (d.getDay()) {
            case 0: 
                return short ? 'Sun' : 'Sunday';
                break; 
            case 1: 
                return short ? 'Mon' : 'Monday';
                break;
            case 2: 
                return short ? 'Tue' : 'Tuesday';
                break;
            case 3: 
                return short ? 'Wed' : 'Wednesday';
                break;
            case 4: 
                return short ? 'Thu' : 'Thursday';
                break;
            case 5: 
                return short ? 'Fri' : 'Friday';
                break;
            case 6: 
                return short ? 'Sat' : 'Saturday';
                break;
            default: 
                return null;
                break;
        }
    };

    var month = function(d, short) {
        if ( typeof short === 'undefined' ) { short = false; }
        switch( d.getMonth() ) {
            case 0: 
                return short ? 'Jan' : 'January';
                break;
            case 1: 
                return short ? 'Feb' : 'February';
                break;
            case 2: 
                return short ? 'Mar' : 'March';
                break;
            case 3: 
                return short ? 'Apr' : 'April';
                break;
            case 4: 
                return 'May';
                break;
            case 5: 
                return short ? 'Jun' : 'June';
                break;
            case 6: 
                return short ? 'Jul' : 'July';
                break;
            case 7: 
                return short ? 'Aug' : 'August';
                break;
            case 8: 
                return short ? 'Sept' : 'September';
                break;
            case 9: 
                return short ? 'Oct' : 'October';
                break;
            case 10: 
                return short ? 'Nov' : 'November';
                break;
            case 11: 
                return short ? 'Dec' : 'December';
                break;
            default: 
                return null;
                break;
        }
    };

    switch ( letter ) {
        // two digit day
        case 'd': 
            var d = date.getDate(); 
            return d.length === 1 ? "0" + d : d;
            break;

        // three-letter day
        case 'D': 
            return day(date, true);
            break;

        // day of month, no leading zeros
        case 'j': 
            return date.getDate();
            break;

        // full word day
        case 'l': 
            return day(date, false);
            break;

        // correct numeric day of week
        case 'N':
            return date.getDay() + 1;
            break;

        // suffix
        case 'S':
            var d = date.getDate();
            if ( d === 1 ) { 
                return 'st';
                break;
            } else if ( d === 2 || ( d.toString().match(/\d2$/) && !d.toString().match(/1\d$/) ) ) {
                return 'nd';
                break;                
            } else if ( d === 3 || ( d.toString().match(/\d3$/) && !d.toString().match(/1\d$/) ) ) {
                return 'rd';
                break;
            } else if ( d.toString().match(/1\d|[4567890]/) ) {
                return 'th';
                break;
            } else {
                return null;
                break;
            }
        case 'w':
            return date.getDay();
            break;
        case 'z':
            // stolen from http://stackoverflow.com/a/8619946
            var janfirst = new Date(date.getFullYear(), 0, 0)
              , diff = date - janfirst;
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
            break;
        case 'F':
            return month(date, false);
            break;
        case 'm':
            var mo = date.getMonth() + 1;
            return mo.toString().length === 1 ? "0" + mo : mo;
            break;
        case 'M':
            return month(date, true);
            break;
        case 'n':
            return date.getMonth() + 1;
            break;
        case 'Y':
            return date.getFullYear();
            break;
        case 'y':
            return date.getFullYear().toString().substr(2);
            break;
        case 'a':
            return date.getHours() > 11 ? 'pm' : 'am';
            break;
        case 'A':
            return date.getHours() > 11 ? 'PM' : 'AM';
            break;
        case 'g':
            return date.getHours() % 12;
            break;
        case 'G':
            return date.getHours();
            break;
        case 'h':
            var h = date.getHours() % 12;
            return h.toString().length === 1 ? '0' + h : h;
        case 'H':
            var h = date.getHours();
            return h.toString().length === 1 ? '0' + h : h;
            break;
        case 'i':
            var m = date.getMinutes(); console.log(m);
            return m.toString().length === 1 ? '0' + m : m;
            break;
        case 's':
            var s = date.getSeconds();
            return s.toString().length === 1 ? '0' + s : s;
        default:
            return letter;
            break;
    }
}

if ( typeof module !== 'undefined' ) {
    module.exports = daylight;
}