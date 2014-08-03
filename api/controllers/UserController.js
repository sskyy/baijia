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
      return res.send(200, _.extend(user, { status: 'success' }));
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
          name: 1
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
        res.cookie('userid', user.id);

        user.lastLogin = new Date();

        User.update({
          userId: user.id
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
    var validated = ParamService.pick(['userId', 'name'], userParam, req);

    if (!validated) {
      return res.send(406, {
        msg: 'information not enough'
      });
    }

    User.find({
      or: [{
        userId: userParam.userId
      }, {
        name: userParam.name
      }]
    }).then(function(users) {
      if (users.length == 0) {
        User.create(userParam).then(function(user) {
          req.session.user = user;
          res.send(200, _.extend(user, { status: 'success' }));
        });
      } else {
        throw [409, {
          msg: 'userId or name already exist'
        }];
      }
    }).fail(_.partialRight(ErrorRespondService.handle, res));
  }
};
