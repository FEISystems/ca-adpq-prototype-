﻿(function() {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, loginService, messageService, shoppingCartService) {
        var model = this;
        model.data = {};
        model.showNavMenu = true;
        model.cartItemCount = 0;


        model.$onInit = function(){
        }
        
        model.logout = function () {
            loginService.logout();
        }


        model.getActiveCart = function () {
            shoppingCartService.getActiveCart();
        };

        model.getActiveCart();

        
        messageService.subscribe('getActiveCartSuccess', function (response) {
            model.cart = response;
            model.cartItemCount = 0;
            for (var i = 0; i <  model.cart.Items.length; ++i){
                model.cartItemCount +=  model.cart.Items[i].Quantity;
            }
        })
        

    }

    module.component("mainNav", {
        templateUrl: "app/views/shared/components/main-nav/main-nav.component.html",
        controllerAs: "model",
        controller  : ["$scope", "$location", "loginService", "messageService", "shoppingCartService", controller]
    });

}())