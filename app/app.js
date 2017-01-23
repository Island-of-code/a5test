'use strict';

angular.module('myApp',
        [
            'ngRoute', 'ui.router', 'ngMessages', 'ui.validate',
            'myApp.version', 'ui.bootstrap', 'ngAnimate', 'cgBusy', 'dndLists'
        ])
        .config([
            '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                //$routeProvider.wdhen('/login', { templateUrl: 'login/login.view.html', controller: LoginController });
                //$routeProvider.when('/register',
                //{ templateUrl: 'register/register.view.html' /*, controller: RegisterModalController*/ });
                //$routeProvider.when('/home', { templateUrl: 'home/mainView.html', controller: MainCtrl });
                //$routeProvider.otherwise({ redirectTo: '/home' });
                var homeState = {
                    name: 'home',
                    url: '/home',
                    //templateUrl: 'rule/ruleList.View.html',
                   // controller: 'RuleListCtrl',
                      views: {
                        "viewName": {
                        templateUrl: 'home/home.html',
                        controller: 'HomeController',
                        }
                    }
                }

                $stateProvider.state(homeState);
                $urlRouterProvider.when('', '/home');
            }
        ])
        .run(function ($rootScope, $uibModal, $location) {


            $rootScope.$on('$locationChangeStart',
                    function (event, data) {

                    });

        });

