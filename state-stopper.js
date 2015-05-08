angular.module('state-stopper', ['ui.router'])
.run(['$rootScope', '$state', function($rootScope, $state) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		toState.$stoppables = [];

		angular.forEach($state.$current.locals.resolve.$$values, function(resolvedValue) {
			if(resolvedValue && resolvedValue.stop) {
				toState.$stoppables.push(resolvedValue);
			}
		});

		if(!fromState.$stoppables) {
			return;
		}

		var stoppable;
		while(stoppable = fromState.$stoppables.shift()) {
			stoppable.stop();
		}
	});
}])
.service('$meteorPromise', ['$meteor', '$q', function($meteor, $q) {
	this.object = function() {
		var args = Array.prototype.slice.call(arguments),
			checker = args.pop(),
			obj = $meteor.object.apply(this, args);

		if(checker(obj)) {
			var deferred = $q.defer();
			deferred.reject('NOT_FOUND');

			return deferred.promise;
		}

		return obj;
	};

	this.collection = function() {
		var args = Array.prototype.slice.call(arguments),
			checker = args.pop(),
			obj = $meteor.collection.apply(this, args);

		if(checker(obj)) {
			var deferred = $q.defer();
			deferred.reject('NOT_FOUND');

			return deferred.promise;
		}

		return obj;
	};
}]);
