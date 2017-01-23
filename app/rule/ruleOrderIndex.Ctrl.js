'use strict'

function RuleOrderIndexController() {

    this.getMaxFreeOrderIndex = function(rules)
    {
        var max = -1;
        angular.forEach(rules, function(rule, key) {
            if(max < rule.orderIndex)
            {
                max = rule.orderIndex;
            }
        });

        return max + 1;
    }


    this.updateOrderIndex = function (rules) {
        
        rules.forEach(function(item, index)
        {
            item.orderIndex = index;
        });
        
//        var changedRules = [];
//        var nextOrder = null;
//        var shiftIndex = index + 1;
//
//        if (index == rules.length - 1) {
//            nextOrder = rules[index - 1].orderIndex + 1;
//            shiftIndex = index;
//        }
//        else nextOrder = rules[index + 1].orderIndex;
//
//        _shiftFromIndex(rules, shiftIndex, changedRules);
//        rules[index].orderIndex = nextOrder;
//        changedRules.push(rules[index]);
//        return changedRules;
    }

    function _shiftFromIndex(rules, index, changedRules) {
        for (var i = index; i < rules.length; i++) {
            rules[i].orderIndex++;
            changedRules.push(rules[i]);
        }
    }
}