﻿(function() {
    var messageService = function($rootScope, $log) {
        var publish = function(event, data) {
            $log.info("published " + event);
            $rootScope.$broadcast(event, data);
        }

        //This will return the unsubscribe method        
        var subscribe = function(event, fn) {
            return $rootScope.$on(event, function(scopeData, args) {
                fn(args);
            });
        }

        return {
            publish: publish,
            subscribe: subscribe
        };
    };

    var module = angular.module("caWebApp");
    module.factory("messageService", messageService);
}());