'use strict';

angular.module('myApp').service('$ruleRemoteStoreFactory', ['$http', '$q', '$timeout', RuleRemoteStoreFactory]);

function RuleRemoteStoreFactory($http, $q, $timeout)
{
    this.getRemoteStore = function($scope)
    {
        return new RuleRemoteStore($http, $q, $timeout, $scope);
    }
}

//Объект для работы с серверными запросами
function RuleRemoteStore($http, $q, $timeout, $scope) {

    function _getAllSavedRules()
    {
        var rulesNodeString = window.localStorage.getItem("rules");

        if(!rulesNodeString || rulesNodeString == 'undefined') {
            window.localStorage.setItem("rules", JSON.stringify([]));
            rulesNodeString = window.localStorage.getItem("rules");
        }

        var rawRules = JSON.parse(rulesNodeString);

        angular.forEach(rawRules, function(value, index){
            rawRules[index] = Rule.createFromJSONRawObj(value);
        })

        return rawRules;
    }

    this.getRules = function()
    {
        //заглушка $http.get('http://httpbin.org/delay/3');
        $scope.loadingPromise = $q.defer();
        $timeout(function(){ 
            $scope.loadingPromise.resolve(_getAllSavedRules()); }, 300);
        return $scope.loadingPromise.promise;
    }


    this.updateAllRules = function(rules)
    {
        //заглушка $http.get('http://httpbin.org/delay/3');
        $scope.loadingPromise = $q.defer();

        window.localStorage.setItem("rules", JSON.stringify(rules));

        $timeout(function(){ $scope.loadingPromise.resolve(); }, 300);
        return $scope.loadingPromise.promise;
    };

    function _getRuleByID(rules, ID)
    {
        var result;

        angular.forEach(rules, function(value, index) {
            if(value.ID == ID)
                result = value;
        })

        return result;

    }

    this.updateRule = function(rule)
    {
        //заглушка $http.get('http://httpbin.org/delay/3');
        var rules = _getAllSavedRules();

        var savedRule = _getRuleByID(rules, rule.ID);

        angular.copy(rule, savedRule);

        this.updateAllRules(rules);

        $scope.loadingPromise = $q.defer();
        $timeout(function(){ $scope.loadingPromise.resolve(); }, 300);
        return $scope.loadingPromise.promise;
    };

    this.addRule = function(rule)
    {
        //заглушка
        var savedRules = _getAllSavedRules();
        savedRules.push(rule);
        this.updateAllRules(savedRules);

        $scope.loadingPromise = $q.defer();
        $timeout(function(){ $scope.loadingPromise.resolve(); }, 300);
        return $scope.loadingPromise.promise;


    };

    this.removeRule = function(rule)
    {
        //заглушка
        var rules = _getAllSavedRules();;

        var savedRule = _getRuleByID(rules, rule.ID);

        rules.splice(rules.indexOf(savedRule), 1)

        //rules.remove(savedRule);
        this.updateAllRules(rules);


        $scope.loadingPromise = $q.defer();
        $timeout(function(){ $scope.loadingPromise.resolve(); }, 300);
        return $scope.loadingPromise.promise;
    };
}
