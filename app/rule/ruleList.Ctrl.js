'use strict';

angular.module('myApp').controller('RuleListCtrl', ['$scope', '$rootScope', '$uibModal', '$ruleRemoteStoreFactory', '$filter', '$timeout', '$location', RuleListCtrl]);

function RuleListCtrl($scope, $rootScope, $uibModal, $ruleRemoteStoreFactory, $filter, $timeout, $location) {

    $scope.completeFilterValue = "NotComplete";
    var remoteStore = $ruleRemoteStoreFactory.getRemoteStore($scope);
    var allRules = [];
    var rulesHash = {};

    remoteStore.getRules().then(function (rules) {
        allRules = rules;
        allRules.forEach(function(value, index) {
             rulesHash[value.ID] = value;
        })
        _refreshScopeRules();}
        );

    $scope.updateOrderIndex = function()
    {
        new RuleOrderIndexController().updateOrderIndex($scope.Rules);
        allRules = $scope.Rules.slice();
        remoteStore.updateAllRules($scope.Rules);
    }


    $scope.removeRule = function (index) {
        var rule = $scope.Rules[index];
        var store_index = allRules.indexOf(rule);
        allRules.splice(store_index, 1);
        remoteStore.removeRule(rule).then(function () { _refreshScopeRules(); });

    };

    $scope.onDnDListInserted = function (event, index, item, external) {
        $scope.Rules[index] = rulesHash[item.ID];
        var changedRules = new RuleOrderIndexController().updateOrderIndex($scope.Rules, index);
        remoteStore.updateAllRules(allRules);
        return true;
    }


    $scope.createRule = function () {
        var rule = new Rule();
        rule.orderIndex = new RuleOrderIndexController().getMaxFreeOrderIndex(allRules);
        _editRule(rule, true);
    }



    function _editRule(rule, isNew) {

        var modalInstance = $uibModal.open({
         templateUrl: './rule/editRule.modal.view.html',
         resolve: {
             state: {
                 isNew: isNew,
                 rule: rule
             }
         },
         controller: EditRuleCtrl
      });
              
                modalInstance.result.then( function (rule) {

            if (isNew) {
                allRules.push(rule);
                remoteStore.addRule(rule).then(function () { });
                rulesHash[rule.ID] = rule;

                //$scope.completeFilterValue = rule.Complete ? "Complete": "NotComplete";

                _refreshScopeRules();

                $timeout(function(){
                    //document.getElementById(rule.ID).scrollIntoView(true);
                }, 100);
            }
            else remoteStore.updateRule(rule);

        }, function () {
        });

    }

    $scope.ruleDBClick = function (rule) {

        _editRule(rule, false);
    };

    
    
    function _refreshScopeRules() {

        var tempRules = null;

        //switch ($scope.completeFilterValue) {
        //    case 'Complete' :
        //        tempRules = _getRulesByCompleteState(true);
        //        break;
        //    case 'NotComplete' :
        //        tempRules = _getRulesByCompleteState(false);
        //        break;
        //    default :
        //        tempRules = allRules;
        //}
        tempRules = allRules;

        $scope.Rules = $filter('orderBy')(tempRules, 'orderIndex', false);
    }

}