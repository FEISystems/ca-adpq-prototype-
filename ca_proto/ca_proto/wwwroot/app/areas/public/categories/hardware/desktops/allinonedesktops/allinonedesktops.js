(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, inventoryService) {
        var model = this;
        model.provider = {};
        model.title = "All in One Desktops";        

        model.productTypes = [];
        model.categories = [];
        model.contracts = [];
        model.contractors = [];
        model.products = [];
        model.orderByColumn = "name";
        model.orderAscending = true;
        model.page = 0;
        model.pageCount = 16;
        model.filterBy = {"Category":"All in One Hardware"};

        this.$routerOnActivate = function (next, previous) {

            function createRows(arr, size) {
                var newRow = [];
                for (var i = 0; i < arr.length; i += size) {
                    newRow.push(arr.slice(i, i + size));
                }
                return newRow;
            }

            model.fetchProducts = function () {
                inventoryService.fetchProducts(model.page * model.pageCount, model.pageCount, model.orderByColumn, model.orderAscending, model.filterBy);
            };
            
            model.fetchProducts();


            messageService.subscribe('querySuccess', function (response) {
                model.products = createRows(response, 4);

            })

            messageService.subscribe('queryFailure', function (response) {
                model.products = [];
            })

        }
    };

    module.component("allInOneDesktops", {
        templateUrl: "app/areas/public/categories/hardware/desktops/allinonedesktops/allinonedesktops.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "inventoryService", controller]

    });
}())