﻿(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location) {
        var model = this;
        model.provider = {};
        model.title = "Contact Us";

    };

    module.component("contactUs", {
        templateUrl: "app/areas/public/contactus/contactus.html",
        controllerAs: "model",
        controller: ["$scope", "$location", controller]

    });
}())