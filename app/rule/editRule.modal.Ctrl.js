'use strict';

angular.module('myApp').controller('EditRuleCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'state', EditRuleCtrl]);

function EditRuleCtrl($scope, $rootScope, $uibModalInstance, state) {

    $scope.forms = {};

    var masterRule = state.rule;

    var copyRule = angular.copy(masterRule);

    $scope.Rule = copyRule;

    $scope.IsNew = state.isNew;

    $scope.userNameModel = {
        value: "",
        list: $scope.Rule.userNameList,
        isDuplicateError: false,
        isMaxCountError: false,
    };

    $scope.sourceIpModel = {
        value: "",
        list: $scope.Rule.sourceIpList,
        isDuplicateError: false,
        isMaxCountError: false,
    };

    $scope.destIpModel = {
        value: "",
        list: $scope.Rule.destIpList,
        isDuplicateError: false,
        isMaxCountError: false,
    };

    $scope.destPortModel = {
        value: "",
        list: $scope.Rule.destPortList,
        isDuplicateError: false,
        isMaxCountError: false,
    };


    $scope.deleteUser = function (user)
    {

        var index = copyRule.userNameList.indexOf(user);
        copyRule.userNameList.splice(index, 1);
        $scope.checkModel($scope.userNameModel, $scope.forms.userNameForm);
    }

    $scope.deleteSourceIp = function (sourceIp) {
        var index = copyRule.sourceIpList.indexOf(sourceIp);
        copyRule.sourceIpList.splice(index, 1);
        $scope.checkModel($scope.sourceIpModel, $scope.forms.sourceIpForm);
    }

    $scope.deleteDestIp = function (destIp) {
        var index = copyRule.destIpList.indexOf(destIp);
        copyRule.destIpList.splice(index, 1);
        $scope.checkModel($scope.destIpModel, $scope.forms.destIpForm);
    }

    $scope.deleteDestPort = function (destPort) {
        var index = copyRule.destPortList.indexOf(destPort);
        copyRule.destPortList.splice(index, 1);
        $scope.checkModel($scope.destPortModel, $scope.forms.destPortForm);
    }

    $scope.OK = function () {

        angular.copy(copyRule, masterRule);
        $uibModalInstance.close(masterRule);
    }

    $scope.newName = "";

    $scope.onCompleteChanged = function () {
        if (copyRule.Complete && !copyRule.Resolution) {
            AddResolutionCtrl.RequestResolutionAndClose(copyRule, $uibModal, $rootScope.User.LoginName, function () {
            });
            return;
        }
    }

    $scope.hide = function () {
        $uibModalInstance.dismiss('cancel');

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');

    };

    $scope.addUserName = function () {

        if ($scope.checkModel($scope.userNameModel, $scope.forms.userNameForm))
        {
            copyRule.userNameList.push($scope.userNameModel.value);
            $scope.userNameModel.value = "";
        }

    }

    $scope.addSourceIp = function () {

        if ($scope.checkModel($scope.sourceIpModel, $scope.forms.sourceIpForm))
        {
            copyRule.sourceIpList.push($scope.sourceIpModel.value);
            $scope.sourceIpModel.value = "";
        }

    }

    $scope.addDestIp = function () {

        if ($scope.checkModel($scope.destIpModel, $scope.forms.destIpForm))
        {
            copyRule.destIpList.push($scope.destIpModel.value);
            $scope.destIpModel.value = "";
        }

    }

    $scope.addDestPort = function () {

        if ($scope.checkModel($scope.destPortModel, $scope.forms.destPortForm))
        {
            copyRule.destPortList.push($scope.destPortModel.value);
            $scope.destPortModel.value = "";
        }
    }

    $scope.checkModel = function (model, form)
    {
        model.isMaxCountError = !$scope.checkMaxCountInArray(model);
        model.isDuplicateError = !$scope.checkDuplicateInArray(model.value, model);
        return !(model.isMaxCountError || model.isDuplicateError) && !form.$invalid;
    }

    $scope.checkDuplicateInArray = function (value, model)
    {
        if (!value)
            return true;
        return model.list.indexOf(value) > -1 ? false : true;
    }

    $scope.checkMaxCountInArray = function (model)
    {
        return model.list.length >= 10 ? false : true;
    }

    $scope.setAction = function (action)
    {
        $scope.Rule.action = action;
    }

    $scope.isValidIp = function (value)
    {
        var arr = value.split('.');
        var r = /^\d{1,3}$/;
        return arr.length === 4 && arr.map(function (e) {
            return (r.test(e) && ((e | 0) >= 0) && ((e | 0) <= 255))
        }).every(function (e) {
            return e
        })
    }
}
