'use strict';

function Rule() {

    this.name = "";
    this.action = "deny";
    this.userNameList = [];
    this.sourceIpList = [];
    this.destIpList = [];
    this.destPortList = [];
    
    this.orderIndex = 0;
    this.ID = Rule.generateGuid();
}

Rule.createFromJSONRawObj = function (rawObj) {
    var obj = new Rule();
    for (var prop in rawObj)
        obj[prop] = rawObj[prop];
    return obj;
}


Rule.generateGuid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
