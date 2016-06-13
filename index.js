"use strict";

module.exports = function(promises, context, data) {
	if(!Array.isArray(promises)) {
		promises = !promises ? [] : [promises];
	}
	if(!Array.isArray(context)) {
		var obj = context;
		context = [];
		for(var i = 0; i < promises.length; i++) {
			context[i] = obj;
		}
	}

	var promise = Promise.resolve(data);
	for(var i = 0; i < promises.length; i++) {
		if(context[i]) {
			promise = promise.then((function(p, c) {
				return function() {
					return p.apply(c, arguments);
				};
			})(promises[i], context[i]));
		} else {
			promise = promise.then(promises[i]);
		}
	}
	return promise;
};
