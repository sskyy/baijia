/**
 * Created by jiamiu on 14-7-5.
 */

var fs=require('fs'),
    Q = require('q'),
    _ = require('lodash')

function randomInt( min,max){
    if( max === undefined ){
        max = min
        min = 0
    }

    return min + Math.ceil( Math.random() * (max-min) )
}

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


exports.generateData = function(){
    console.log("begin to generate data")

    var prefix = 'test', index = 0,length = 50,users = []
    var userDefer = Q.defer()

    User.find({name:'test1'}).limit(1).then(function(user){
        if( user.length ){
            console.log("data already generated",user)
            return userDefer.reject()
        }else{
            for( index =0;index<length;index++){

                User.create({
                    name : prefix+index,
                    password : prefix+index,
                    email : prefix+index +"@bianchengxia.com",
                    avatar : '/public/img/avatar'+randomInt(9)+'.jpg'
                }).then( function( user){
                    users.push(user)
                    if( users.length == 50 ){
                        userDefer.resolve()
                    }
                }).catch(function(err){
                    console.log("create user fail",err)
                })
            }
        }
    })


    return userDefer.promise

}