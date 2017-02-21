(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, sampleInventoryService) {
        var model = this;
        model.provider = {};
        model.title = "Power Desktops";

        

        this.$routerOnActivate = function (next, previous) {
            var category = next.params.category.replace(/%20/g, " ");

            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }


            sampleInventoryService.getProduct().get({ category: category}).$promise.then(
                function (data) {
                    var filteredList = data.filter(function(items) { return items.category === category });
                    
                    model.products = createRows(filteredList, 4);
                },
                function (error) {
                    alert("Something went wrong!");

                }
            );

        }

    };

    module.component("powerDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/powerdesktops/powerdesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "sampleInventoryService", controller]

    });
}())