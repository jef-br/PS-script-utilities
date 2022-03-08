/**
 * General Utility class containing often used general functions.
 *
 * Contains:
 * 		- basic debugger -> log message to file
 *   	- A/B performance testing
 *   	
 * 	To be expanded ONLY with utility functions
 * 	So nothing that directly has to do with
 * 	script execution, images, business data, metadata, configuration or the scriptfarm
 * 	@author: Jef Bracke 2019
 */
var VPUtils = (function() {

	constructor.prototype.init = function() {
    	AB_Performance_ExecutionTimes = 30;
    };
   	function constructor() {
		this.isDebug = false;
		this.init();
	};

//LOGGING
	/**
	 * writes a message to a target file
	 * @param  {string} message the message to log to a file
	 * @param  {boolean} If true, prefixes a timestamp to the message
	 * @param  {path} logFile the location of the file
	 */
	constructor.prototype.logLn = function(message,timestamp, logFile) {
			var lf = File(logFile);
			lf.open("a",undefined,undefined);
			lf.encoding = "UTF-8";
			if(timestamp){
				lf.writeln(File.decode(now = new Date()+" : " + message));
			} else {
				lf.writeln(File.decode(message));
			}
			lf.close();
	};
//DEBUGGING
	/**
	 * Displays a message with the object's property names and their associated values
	 * @param  {object} objectOfInterest The object you want to learn more about
	 * @return {string}                  Returns the content of an object
	 */
	constructor.prototype.getObjectContent = function(objectOfInterest) {
		var obj = objectOfInterest;
		var props = obj.reflect.properties;
		var msg = "";
		for (var i = 0; i < props.length; i++) {
			msg += ('this property ' + props[i].name + ' is ' + obj[props[i].name])+"\n";
		}
		return "all about that selection:\n\n" + msg;
	};

//PERFORMANCE TESTING
	/**
	 * Executes a function a set number of times and tracks average execution time
	 * @param  {int}		n Amount of times to execute the function (found in AB_Performance_ExecutionTimes)
	 * @param  {function}	f The function to track
	 * @param  {[parameters]} Optional parameters for the tracked function
	 * @return {number} Returns the execution time of the parameter function in milliseconds
	 */
	constructor.prototype.perf = function(n,f /*optional arguments*/) {
		var args =  Array.prototype.slice.call(arguments, 2);
		var i = (n=n||1), t, r = 0;
			
		while(i--) {
			$.hiresTimer;
			f.apply(null, args);
			t = $.hiresTimer;
			r += t;
		}
		// Clean up
		args.length = 0;
		args = null;
		
		// Average time
		return ~~(r/n);
	};
	/**
	 * Compares the execution time of 2 functions and reports back in Microseconds.
 	 *
	 * SAMPLE CODE:
	 * 		function arrayPush() { ... }
	 * 		function arrayKey() { ... }
	 * 		function arg1(blabla){ ... }
	 * 		function arg2(blabla){ ... }
	 * 		comparePerf(arrayPush, arrayKey);
	 * 		comparePerf(arg1,arg2,"Roger the blablastring");
	 * 		
	 * @param  {function} f1 First function to performance test
	 * @param  {function} f2 Second function to performance test
	 * @return {string} Returns a performance report for the compared functions
	 */
	constructor.prototype.comparePerfInMicroSeconds = function(f1, f2 /*optional arguments*/) {
		var args =  Array.prototype.slice.call(arguments, 2);
		var n = AB_Performance_ExecutionTimes;	
		var t1 = this.perf.apply(null, [n, f1].concat(args));
		var t2 = this.perf.apply(null, [n, f2].concat(args));
		var	r = .1 * ~~(10*(t1/t2));
		
		// Clean up
		args.length = 0;
		args = null;
		
		//prepare return message
		var m = f1.name + "  vs.  " + f2.name + "  -  "+n+" executions\n\n" +
				f1.name + "  executed in on avg :  " + t1 + " \xB5s\n" +
				f2.name + "  executed in on avg :  " + t2 + " \xB5s\n\n";
		if (t1 < t2) {
			m += f1.name + " was faster by a factor of " + r + "\n"; 
		} else if (t1 > t2) {
			m += f2.name + " was faster by a factor of " + r + "\n";
		}
		return (m);
	}
	/**
	 * Compares the execution time of 2 functions and reports back in Seconds.
 	 *
	 * SAMPLE CODE:
	 * 		function arrayPush() { ... }
	 * 		function arrayKey() { ... }
	 * 		function arg1(blabla){ ... }
	 * 		function arg2(blabla){ ... }
	 * 		comparePerf(arrayPush, arrayKey);
	 * 		comparePerf(arg1,arg2,"Roger the blablastring");
	 * 		
	 * @param  {function} f1 First function to performance test
	 * @param  {function} f2 Second function to performance test
	 * @return {string} Returns a performance report for the compared functions
	 */
	constructor.prototype.comparePerfInSeconds = function(f1, f2 /*optional arguments*/) {
		var args =  Array.prototype.slice.call(arguments, 2);
		var n = AB_Performance_ExecutionTimes;	
		var t1 = this.perf.apply(null, [n, f1].concat(args));
		var t2 = this.perf.apply(null, [n, f2].concat(args));
		var	r = .1 * ~~(10*(t1/t2));
		
		// Clean up
		args.length = 0;
		args = null;
		
		//prepare return message
		var m = f1.name + "  vs.  " + f2.name + "  -  "+n+" executions\n\n" +
				f1.name + "  executed in on avg :  " + t1/1000000 + " s\n" +
				f2.name + "  executed in on avg :  " + t2/1000000 + " s\n\n";
		if (t1 < t2) {
			m += f1.name + " was faster by a factor of " + r + "\n"; 
		} else if (t1 > t2) {
			m += f2.name + " was faster by a factor of " + r + "\n";
		}
		return (m);
	}
	/**
	 * Returns the average execution time of a function.
	 * @param  {number} n	Amount of times to run the function 
	 * @param  {function} f	Function to performance test
	 * @return {string} Returns a performance report on the function in microseconds.
	 */
	constructor.prototype.timeFunction = function(n,f /*optional arguments*/) {
		// The sign for micro is expressed as "\xB5"
		return "Function executes in on average "+this.perf(n,f) +" \xB5s";
	};

	//Sets the amount of executions for the 2 comparePerf functions
	var AB_Performance_ExecutionTimes;

	return constructor;
})();