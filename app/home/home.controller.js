'use strict';

angular.module('myApp').controller('HomeController', ['$scope', '$rootScope', '$uibModal', '$ruleRemoteStoreFactory', '$filter', '$timeout', '$location', HomeController]);

function HomeController($scope, $rootScope, $uibModal, $ruleRemoteStoreFactory, $filter, $timeout, $location) {

    $scope.menuItems = ["Our story", "Team", "Media", "Blog",
    "Careers", "User", "The vihicle"];
    
    $scope.completeFilterValue = "NotComplete";


}