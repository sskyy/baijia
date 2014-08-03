/**
 * Created by jiamiu on 14-8-3.
 */

var _  = require('lodash')
var userNames = ['小新','白白','加缪','达尔文','诺贝尔','济滇','青栀','桐杰','夜末','子溯','宫煌'],
    assetsNames = ['娃哈哈矿泉水','鲜橙多','杜蕾斯','香蕉片','鲜奶片','星巴克咖啡外卖版'],
    lng = 121.5809783,
    lat = 31.2019986

var data = []


_.each( assetsNames, function(assetName ){
    var require = {
        name : assetName,
        user : {
            name : userNames[Math.floor( userNames.length * Math.random())],
            avatar : "/images/avatar_" + Math.floor( 10 * Math.random()) + ".png"
        },
        points : {
            lng : lng + 0.1*Math.random(),
            lat : lat + 0.1*Math.random()
        }
    }
    data.push(require)
})

module.exports = data