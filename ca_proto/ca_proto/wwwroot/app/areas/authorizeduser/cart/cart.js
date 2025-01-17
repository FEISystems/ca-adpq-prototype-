﻿(function () {
    "use strict";
    var module = angular.module("caWebApp");

    var controller = function ($scope, $location, messageService, shoppingCartService, loginService, inventoryService, $timeout) {
        var model = this;
        model.provider = {};
        model.title = "Cart";
        model.products = [];
        model.qtyOptions = [0, 1, 2, 3, 4, 5, 6];
        model.cartTotal = 0;
        model.cart = {};
        model.cartItemCount = 0;

        model.listeners = [];

        var activate = function () {

            model.getActiveCart = function () {
                shoppingCartService.getActiveCart();
            };

            model.getActiveCart();

            $scope.updateCart = function () {
                for (var idx = 0; idx < model.cart.Items.length; ++idx) {
                    var item = model.cart.Items[idx];
                    shoppingCartService.updateCart({ "ShoppingCartItemId": item.Id, "Quantity": item.Quantity });
                }

                if (model.cart.Items.length == 0) {
                    model.cartTotal = 0;
                }


                model.getActiveCart();

            }

            $scope.removeFromCart = function (itemId) {
                //model.removeCartItem(itemId);
            }

            model.removeCartItem = function (itemId) {
                shoppingCartService.removeCartItem(itemId);
                model.getActiveCart();
            };


            model.getProduct = function (productId) {
                inventoryService.getProduct(productId);
            };


            $scope.removeThisItem = function (itemId) {
                model.removeCartItem(itemId)
            }

            $scope.proceedToCheckOut = function () {
                $location.path("user/checkout");
            }


            model.listeners.push(messageService.subscribe('getActiveCartSuccess', function (response) {
                model.cart = response;
                model.cartItems = [];
                model.products = [];
                model.cartItems = model.cart.Items;
                model.cartItemCount = 0;
                model.cartTotal = 0;

                if (model.cartItems) {

                    for (var idx = 0; idx < model.cart.Items.length; ++idx) {
                        var product = model.cart.Items[idx];
                        model.getProduct(product.ProductId);
                    }

                    for (var idx = 0; idx < model.cartItems.length; ++idx) {
                        var item = model.cartItems[idx];
                        model.cartTotal += item.Price * item.Quantity;
                    }
                }

                model.cart = response;
                model.cartItemCount = 0;
                for (var i = 0; i < model.cartItems.length; ++i) {
                    model.cartItemCount += model.cartItems[i].Quantity;
                }

                $timeout(function () {
                    $scope.$apply();
                });

            }));

            model.listeners.push(messageService.subscribe('getActiveCartFailure', function (response) {
                model.cart = [];
            }));


            model.listeners.push(messageService.subscribe('getProductSuccess', function (response) {
                model.products.push(response);
            }));

            model.listeners.push(messageService.subscribe('getProductFailure', function (response) {
                model.product = [];
            }));

            model.listeners.push(messageService.subscribe('updateCartSuccess', function (response) {
                model.cart = response;
                model.cartItems = [];
                model.products = [];
                model.cartItems = model.cart.Items;
                model.cartItemCount = 0;
                model.cartTotal = 0;

                for (var idx = 0; idx < model.cart.Items.length; ++idx) {
                    var product = model.cart.Items[idx];
                    model.getProduct(product.ProductId);
                }

                for (var idx = 0; idx < model.cartItems.length; ++idx) {
                    var item = model.cartItems[idx];
                    model.cartTotal += item.Price * item.Quantity;
                }

                for (var i = 0; i < model.cartItems.length; ++i) {
                    model.cartItemCount += model.cartItems[i].Quantity;
                }

                $timeout(function () {
                    $scope.$apply();
                });

            }));

            model.listeners.push(messageService.subscribe('updateCartFailure', function (response) {
                model.product = [];
            }));


            model.listeners.push(messageService.subscribe('removeCartItemSuccess', function (response) {
                model.cart = response;
                model.cartItems = [];
                model.products = [];
                model.cartItems = model.cart.Items;
                model.cartItemCount = 0;
                model.cartTotal = 0;

                for (var idx = 0; idx < model.cart.Items.length; ++idx) {
                    var product = model.cart.Items[idx];
                    model.getProduct(product.ProductId);
                }

                for (var idx = 0; idx < model.cartItems.length; ++idx) {
                    var item = model.cartItems[idx];
                    model.cartTotal += item.Price * item.Quantity;
                }
            }));

            model.listeners.push(messageService.subscribe('removeCartItemFailure', function (response) {
                model.product = {};
            }));

            $timeout(function () {
                $scope.$apply();
            });

        }

        // this.$routerOnActivate = function () {
        //     activate();
        // }

        this.$onInit = function () {
            activate();
        }


        this.$routerOnDeactivate = function (next, previous) {
            for (var i = 0; i < model.listeners.length; i++) {
                model.listeners[i]();
            };
            model.listeners = [];
        };

        $scope.$on('$destroy', function () {
            angular.forEach(model.listeners, function (l) {
                l();
            });
        });

        
    };

    module.component("cart", {
        templateUrl: "app/areas/authorizeduser/cart/cart.html",
        controllerAs: "model",
        controller: ["$scope", "$location", "messageService", "shoppingCartService", "loginService", "inventoryService", "$timeout", controller],
        bindings: {
            item: "="
        }

    });
}())