/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://links.sailsjs.org/docs/config/bootstrap
 */

var Q = require('q'),
    _ = require('lodash')

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var fakeData = require("../data/data"),
      promises = [],
      fakeOrder = require("../data/orders")



  Asset.find().then(function(data){
      console.log("begin to generate data",fakeData)
      if( data.length == 0 ){
          //初始化十个商家和他们的商品
          _.each(fakeData,function( trader){
            var deferred = Q.defer()

              var assets = trader.assets
              delete trader.assets

            User.create(trader).then(function(savedTrader){

                var assetsPromises = []
                _.each( assets, function( asset ){
                    asset.owner = savedTrader
                    assetsPromises.push( Asset.create( asset))
                })

                Q.all(assetsPromises).then(function(){
                    deferred.resolve()
                }).fail(function(){
                    deferred.reject()
                })

            }).fail(function(){
                console.log("create trader failed")
                deferred.reject()
            })

            promises.push(deferred)
          })




          //begin to generate order
          _.each( fakeOrder,function(order){
              promises.push( Order.create(order) )
          })


          Q.all( promises).then(function(){
              cb()
          }).fail(function(err){
              console.log("create fake data error",err)
              cb()
          })

      }else{
          cb();
      }
  })
};
