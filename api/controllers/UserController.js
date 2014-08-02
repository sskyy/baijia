/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

'use strict';

var _ = require('lodash');

module.exports = {
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},
  login: function(req, res) {
    if (req.session.user && req.session.user.id) {
      return res.send(200, req.session.user);
    }

    var userId = req.param('userId');
    var password = req.param('password');

    if (!userId || !password) {
      return res.send(406);
    } else {
      var where = {
        where: {
          userId: userId,
          password: password
        },
        field: {
          userId: 1,
          password: 1,
          username: 1
        }
      };

      //Notice! User record may contains large data,
      // It's very necessary to specify field to retrieve
      User.findOne(where).then(function(user) {
        if (!user) {
          throw [404, {
            msg: 'user not found'
          }];
        }

        req.session.user = user;
        user.lastLogin = new Date();

        User.update({
          userId: user.userId
        }, {
          lastLogin: new Date()
        }).then(function() {
          return res.send(200, _.extend(user, { status: 'success' }));
        });

      }).fail(_.partialRight(ErrorRespondService.handle, res));
    }
  },
  register: function(req, res) {
    var userParam = {};
    var validated = ParamService.pick(['userId', 'username'], userParam, req);

    if (!validated) {
      return res.send(406, {
        msg: 'information not enough'
      });
    }

    User.find({
      or: [{
        userId: userParam.userId
      }, {
        username: userParam.username
      }]
    }).then(function(users) {
      if (users.length == 0) {
        User.create(userParam).then(function(user) {
          req.session.user = user;
          res.send(200, _.extend(user, { status: 'success' }));
        });
      } else {
        throw [409, {
          msg: 'userId or username already exist'
        }];
      }
    }).fail(_.partialRight(ErrorRespondService.handle, res));
  },

    upload : function( req, res){
        var dir = __dirname + "/../../assets/upload/",
            defers  =[],
            result = []

        req.file('file').upload( StreamReceiverService({dirname:dir}),function (err, files) {//可配置

            if( err ){
                res.json(500,{msg:'upload failed'})
            }

            files.forEach(function( file,i ){
                var defer = Q.defer()
                defers.push(defer.promise)
                result[i] = {name:file.filename,size:file.size}
                Attachment.create({
                    uid: req.session.user ? req.session.user.id : 0,
                    name: file.filename,
                    type: file.type,
                    addr: dir,
                    size: file.size,
                    caption: ''
                }).then(function(attach) {
                    fs.rename(dir+file.filename, dir+attach.id+'.' + getExtention(file.filename), function(err){
                        if( err ){
                            console.log("rename failed",err)
                            result[i].state = 'failed'
                            return defer.reject(result[i])
                        }
                        result[i].addr = attach.addr
                        result[i].state='succeed'
                        result[i].id = attach.id
                        return defer.resolve(result[i])
                    })
                }).catch(function (err) {
                    console.log("ERR: add image record failed", err)
                    result[i].state = 'failed'
                    defer.reject(result[i])
                })
            })


            Q.allSettled(defers).then(function(){
                var attach = result.pop()
                User.find( req.session.user.id).then(function(user){
                    user.avatar = attach.addr + attach.id
                    user.save(function( err ){
                        if( err ){
                            console.log("save avatar failed")
                            return res.send(500)
                        }
                        
                        return res.json(200,result)
                    })
                })


            }).catch(function(){
                return res.json(500,{msg:'Server Error'})
            })
        })
    }
};
