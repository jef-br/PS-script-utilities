
/**
* Expansions to Array to calculate color sample differences
* @author Jef Bracke 2020
*/

/** Returns the array correctly sorted numerically in ascending order. Default sort in ExtendScript is buggy
    *  @return {number}
    */
Array.prototype.sort = function () {
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < this.length; i += 1) {
            if (this[i - 1] > this[i]) {
                done = false;
                var tmp = this[i - 1];
                this[i - 1] = this[i];
                this[i] = tmp;
            }
        }
    }

    return this;
};

/** Returns the lowest numerical value found in the array
    *  @return {number}
    */
Array.prototype.min = function () {
    var minA = Infinity;
    for (var i = 0; i < this.length; i++) {
        minA = (this[i] < minA) ? this[i] : minA;
        // $.writeln(i+"this[i]: "+this[i]+" < "+ minA)+" :minA)";
    }
    return minA;
};
/** Returns the highest numerical value found in the array
    *  @return {number}
    */
Array.prototype.max = function () {
    var maxA = -Infinity;
    for (var i = 0; i < this.length; i++) {
        maxA = (this[i] > maxA) ? this[i] : maxA;
        // $.writeln(i+"this[i]: "+this[i]+" > "+ maxA)+" :maxA)";
    }
    return maxA;
};
/** Returns the sum of all numerical values found in the array
*  @return {number}
*/
Array.prototype.sum = function () {
    var sum = 0;
    for (var i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
};
/** Returns the average numerical value found in the array
    *  @return {number}
    */
Array.prototype.average = function () {
    var avg = 0;
    for (var i = 0; i < this.length; i++) {
        avg += this[i];
    }

    return avg / this.length;
};
/** Returns the average numerical value found in the array, same as average
    *  @return {number}
    */
Array.prototype.mean = function () {
    /* sum of all histogram values (ie: the sum of the number of pixels for every color */
    var thePixels = 0;
    for (var i = 0; i < this.length; i++) {
        thePixels += this[i];
    };

    /* mean */
    var mean = 0, aTotal = 0;
    for (var j = 0; j < this.length; j++) {
        mean += (j * this[j] / thePixels);
        aTotal += this[j];
    };
    return mean;
};
/** Returns the median numerical value found in the array
    *  @return {number}
    */
Array.prototype.median = function () {
    var x = this.sort();
    var i = x.length / 2;
    return (x.length % 2 === 0) ? (x[i - 1] + x[i]) / 2 : x[Math.floor(x.length / 2)];
};
/** Returns the number of items found in the array (same as .length)
 *  @return {number}
 */
Array.prototype.count = function () {
    return this.length;
};

/** Returns the variance among the numbers in the array
    *  @return {number}
    */
Array.prototype.populationVariance = function () {
    /* sum of all histogram values (ie: the sum of the number of pixels for every color */
    var thePixels = 0;
    for (var i = 0; i < this.length; i++) {
        thePixels += this[i];
    };
    var mean = this.mean();

    /* variance */
    var variance = 0;
    for (var o = 0; o < this.length; o++) {
        variance += (Math.pow((o - mean), 2) * this[o]);
    };

    return variance;
};
Array.prototype.sampleVariance = function(){
    var avg = this.average();
    var sum = 0;
    for(var i = 0; i < this.length; i++){
        var x = this[i];
        sum += (x-avg)*(x-avg);
    }
    return sum/this.length;

};
/** Returns the standard deviation of the numbers in the array
    *  @return {number}
    */
Array.prototype.populationStandardDeviation = function () {
    return Math.sqrt(this.populationVariance());
};
Array.prototype.sampleStandardDeviation = function(){
    return Math.sqrt(this.sampleVariance());
}
/** Returns the mean absolute deviation of the numbers in the array
    *  @return {number}
    */
Array.prototype.maDev = function () {
    var mad = 0;
    var mean = this.mean();
    for (var i = 0; i < this.length; i++) {
        mad += Math.abs(this[i] - mean);
    }
    mad /= this.length;
    return mad;
}

/** Returns the difference between the min and the max value in an array
    *  @return {number}
    */
Array.prototype.range = function () {
    return this.max() - this.min();
};

/** Returns the rgb value based on the amount of pixels in the histogram counted
    *  @return {number}
    */
Array.prototype.rgbValue = function (pixels) {
    var sum = 0;

    for (var i = 0; i < this.length; i++) {
        if (sum + this[i] < pixels) {
            sum += this[i];
        } else {
            return i;
        }
    }
};
Array.prototype.removeItemAtIndex = function (index) {
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.indexOf = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == item) return i;
    }
    return -1;
};
Array.prototype.lastIndexOf = function (item) {
    for (var i = this.length-1; i > 0; i--) {
        if (this[i] == item) return i;
    }
    return -1;
};