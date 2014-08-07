if ( typeof module !== 'undefined' ) {
    module.exports = daylight;
}

function daylight(format, date) {
    if ( !(date instanceof Date) ) {
        try {
            if ( typeof date === 'string' ) {
                date = new Date(Date.parse(date));
            } else {
                date = new Date(date)
            }
        } catch(e) {
            throw Error(e);
        }
    }

    var output = ''
      , escape = false
        ;

    format.split('').forEach(function(letter) {
        if ( letter === '\\' && !escape ) {
            escape = true;
            return;
        }

        if ( escape ) {
            output += letter;
            escape = false;
            return;
        }

        output += _translate(letter, date);
    });

    return output;
}

function _translate(letter, date) {
    if ( !(date instanceof Date) ) {
        date = new Date(date);
    }

    var day = function(d, short) {
        if ( typeof short === 'undefined' ) { short = false; }
        switch (d.getDay()) {
            case 0: 
                return short ? 'Sun' : 'Sunday';
            case 1: 
                return short ? 'Mon' : 'Monday';
            case 2: 
                return short ? 'Tue' : 'Tuesday';
            case 3: 
                return short ? 'Wed' : 'Wednesday';
            case 4: 
                return short ? 'Thu' : 'Thursday';
            case 5: 
                return short ? 'Fri' : 'Friday';
            case 6: 
                return short ? 'Sat' : 'Saturday';
            default: 
                return null;
        }
    };

    var month = function(d, short) {
        if ( typeof short === 'undefined' ) { short = false; }
        switch( d.getMonth() ) {
            case 0: 
                return short ? 'Jan' : 'January';
            case 1: 
                return short ? 'Feb' : 'February';
            case 2: 
                return short ? 'Mar' : 'March';
            case 3: 
                return short ? 'Apr' : 'April';
            case 4: 
                return 'May';
            case 5: 
                return short ? 'Jun' : 'June';
            case 6: 
                return short ? 'Jul' : 'July';
            case 7: 
                return short ? 'Aug' : 'August';
            case 8: 
                return short ? 'Sept' : 'September';
            case 9: 
                return short ? 'Oct' : 'October';
            case 10: 
                return short ? 'Nov' : 'November';
            case 11: 
                return short ? 'Dec' : 'December';
            default: 
                return null;
        }
    };

    switch ( letter ) {
        // two digit day
        case 'd': 
            var d = date.getDate(); 
            return d < 10 ? '0' + d : d;

        // three-letter day
        case 'D': 
            return day(date, true);

        // day of month, no leading zeros
        case 'j': 
            return date.getDate();

        // full word day
        case 'l': 
            return day(date, false);

        // numeric day of week, one-based
        case 'N':
            return date.getDay() + 1;

        // suffix
        case 'S':
            var d = date.getDate();
            if ( d === 1 ) { 
                return 'st';
            } else if ( d === 2 || ( /\d2$/.test(d.toString()) && !/1\d$/.test(d.toString()) ) ) {
                return 'nd';
            } else if ( d === 3 || ( /\d3$/.test(d.toString()) && !/1\d$/.test(d.toString()) ) ) {
                return 'rd';
            } else if ( /1\d|[4567890]/.test(d.toString()) ) {
                return 'th';
            } else {
                return null;
            }

        // zero-based numeric day of week
        case 'w':
            return date.getDay();

        // numeric day of the year
        case 'z':
            // stolen from http://stackoverflow.com/a/8619946
            var janfirst = new Date(date.getFullYear(), 0, 0)
              , diff = date - janfirst;
            return Math.ceil(diff / (1000 * 60 * 60 * 24));

        // month, full word        
        case 'F':
            return month(date, false);

        // numeric month with leading zero            
        case 'm':
            var mo = date.getMonth() + 1;
            return mo < 10 ? '0' + mo : mo;

        // month, abbreviated to three-letters
        case 'M':
            return month(date, true);

        // numeric month without leading zero
        case 'n':
            return date.getMonth() + 1;

        // four-digit year
        case 'Y':
            return date.getFullYear();

        // two-digit year
        case 'y':
            return date.getFullYear().toString().substr(2);

        // am or pm, lowercase
        case 'a':
            return date.getHours() > 11 ? 'pm' : 'am';

        // AM or PM, uppercase
        case 'A':
            return date.getHours() > 11 ? 'PM' : 'AM';

        // 12-hour format, no leading zero
        case 'g':
            return date.getHours() % 12;

        // 24-hour format, no leading zero
        case 'G':
            return date.getHours();

        // 12-hour format, leading zero
        case 'h':
            var h = date.getHours() % 12;
            return h < 10 ? '0' + h : h;

        // 24-hour format, leading zero
        case 'H':
            var h = date.getHours();
            return h < 10 ? '0' + h : h;

        // minutes, with leading zero
        case 'i':
            var m = date.getMinutes();
            return m < 10 ? '0' + m : m;

        // seconds, with leading zero
        case 's':
            var s = date.getSeconds();
            return s < 10 ? '0' + s : s;
        
        default:
            return letter;
    }
}
