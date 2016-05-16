//Global funcitons go here
// trunc will truncate a string, backup to a space and add ellips
String.prototype.trunc = String.prototype.trunc ||
    function(n, isHtml) {
        // if (isHtml) {
        //     return (this.length > n) ? backupToSpace(this.substr(0, n), n-1) + '\&hellip;' : this;
        //     // return (this.length > n) ? this.substr(0, n - 1) + '&hellip;' : this;
        // } else {
            return (this.length > n) ? backupToSpace(this.substr(0, n), n-1) + '...' : this;
        // }
    };

    function backupToSpace(s, n) {
        var ndx = 0;
        for (var i=n; i>0; i--) {
            if (s[i] === ' ') {
                ndx = i;
                break;
            }
        }
        return s.substr(0, ndx);
    }

