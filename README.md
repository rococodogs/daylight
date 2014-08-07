# daylight

I absolutely love the [moment.js](http://momentjs.com) library, but at times it runs a bit heavier than I really need. I like the simplicity of PHP's built-in `date()` function and wrote this to be sort of similar.

## usage

note: **daylight** does a rather rudimentary job parsing dates (strings are just passed through [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)), so beware of local timezone vs utc time-string pitfalls.

### in the browser
**TODO**: requirejs, commonjs, etc. module support

```html
<script src="daylight.js"></script>
<script>
    var today = daylight('l, F jS', Date.now());
    var p = document.createElement('p');
    p.innerText = today;
    document.body.appendChild(p);

    //=> <p>Wednesday, May 28th</p>
</script>
```

### using node

install with `npm install daylight`, run tests with `npm test`, etc.

```javascript
var daylight = require('daylight');
console.log(daylight('l, F jS', Date.now()));

//=> Wednesday, May 28th
```

## format strings
these are copied from [php's `date()` function](http://php.net/manual/en/function.date.php)

characters not on this list are passed normally; to escape characters you'll have to use double backslashes:

```javascript
var today = daylight('\\d\\a\\y: l', Date.now());
console.log(today);
//=> day: Wednesday
```

<table>
<tr>
    <th>string</th>
    <th>format</th>
    <th>example</th>
</tr>
<tr>
    <td><em>d</em></td>
    <td>day of month, with leading zero</td>
    <td>01 to 31</td>
</tr>
<tr>
    <td><em>D</em></td>
    <td>day of week, three letter abbreviation</td>
    <td>Sun to Sat</td>
</tr>
<tr>
    <td><em>j</em></td>
    <td>day of month, without leading zero</td>
    <td>1 to 31</td>
</tr>
<tr>
    <td><em>l (lower-case L)</em></td>
    <td>day of week, full word</td>
    <td>Sunday to Saturday</td>
</tr>
<tr>
    <td><em>N</em></td>
    <td>numeric day of the week</td>
    <td>1 to 7</td>
</tr>
<tr>
    <td><em>S</em></td>
    <td>English suffix</td>
    <td>st, nd, rd, th</td>
</tr>
<tr>
    <td><em>w</em></td>
    <td>zero-based day of the week</td>
    <td>0 (Sunday) to 6</td>
</tr>
<tr>
    <td><em>z</em></td>
    <td>numeric day of the year</td>
    <td>1-366</td>
</tr>
<tr>
    <td><em>F</em></td>
    <td>month, full word</td>
    <td>January to December</td>
</tr>
<tr>
    <td><em>m</em></td>
    <td>month with leading zero</td>
    <td>1 to 12</td>
</tr>
<tr>
    <td><em>M</em></td>
    <td>month, three letter abbreviation</td>
    <td>Jan to Dec</td>
</tr>
<tr>
    <td><em>n</em></td>
    <td>month without leading zero</td>
    <td>1 to 12</td>
</tr>
<tr>
    <td><em>Y</em></td>
    <td>four-digit year</td>
    <td>1989 or 2014</td>
</tr>
<tr>
    <td><em>y</em></td>
    <td>two-digit year</td>
    <td>89 or 14</td>
</tr>
<tr>
    <td><em>a</em></td>
    <td>lowercase ante or post meridiem</td>
    <td>am or pm</td>
</tr>
<tr>
    <td><em>A</em></td>
    <td>uppercase ante or post meridiem</td>
    <td>AM or PM</td>
</tr>
<tr>
    <td><em>g</em></td>
    <td>12-hour format, no leading zero</td>
    <td>1 to 12</td>
</tr>
<tr>
    <td><em>G</em></td>
    <td>24-hour format, no leading zero</td>
    <td>0 to 23</td>
</tr>
<tr>
    <td><em>h</em></td>
    <td>12-hour format, leading zero</td>
    <td>01 to 12</td>
</tr>
<tr>
    <td><em>H</em></td>
    <td>24-hour format, leading zero</td>
    <td>00 to 23</td>
</tr>
<tr>
    <td><em>i</em></td>
    <td>minutes, with leading zero</td>
    <td>00 to 59</td>
</tr>
<tr>
    <td><em>s</em></td>
    <td>seconds, with leading zero</td>
    <td>00 to 59</td>
</tr>
</table>