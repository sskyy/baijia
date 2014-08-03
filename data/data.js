/**
 * Created by jiamiu on 14-8-2.
 */

var _  = require('lodash')

var traderNames = ['新新超市','小白量贩','全聚龙','京客隆','易初莲花','联华','华联超市','飞来客'],
    assetsNames = ['娃哈哈矿泉水','鲜橙多','杜蕾斯','香蕉片','鲜奶片','星巴克咖啡外卖版'],
    phone = 18000000000,
    lng = 121.5809783,
    lat = 31.2019986

var data = []

_.each( traderNames,function( traderName,i ){
    var trader = {
        name : traderName,
        userId : phone + i,
        password : '123123',
        type : 'trader',
        assets : [],
        avatar : '/images/avatar_'+ Math.floor( 10*Math.random()) +'.png',
        points : {
            lng : lng + 0.1*Math.random(),
            lat : lat + 0.1*Math.random()
        }
    }

    _.each( assetsNames, function( assetName ){
        trader.assets.push({
            name : assetName,
            store : parseInt( 50 * Math.random() ),
            price : parseInt( 10 * Math.random() )
        })
    })
    data.push( trader )
})

var userNames = ['小新','白白','加缪','达尔文','诺贝尔','济滇','青栀','桐杰','夜末','子溯','宫煌'],
    userPhone = 13600000000

_.each( userNames,function( userName,i ){
    var user = {
        name :userName,
        userId : userPhone + i,
        password : 123123,
        assets : [],
        type : 'user',
        avatar :'/images/avatar_'+ Math.floor( 10*Math.random()) +'.png'
    }
    data.push(user)
})

module.exports = data
