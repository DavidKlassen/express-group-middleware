/**
 * Add middleware to the group of paths.
 */

'use strict';

module.exports = function (app) {
  return {
    before: function (middleware, group) {
      if (!(middleware instanceof Array)) {
        middleware = [middleware];
      }

      var oldRoutes = {};

      for (var method in app.routes) {
        if (Object.prototype.hasOwnProperty.call(app.routes, method)) {
          oldRoutes[method] = [];

          app.routes[method].forEach(function (route) {
            oldRoutes[method].push(route);
          });
        }
      }

      group();

      for (var method in app.routes) {
        if (Object.prototype.hasOwnProperty.call(app.routes, method)) {
          app.routes[method].forEach(function (route) {
            oldRoutes[method] = oldRoutes[method] || [];

            if (!~oldRoutes[method].indexOf(route)) {
              route.callbacks = middleware.concat(route.callbacks);
            }
          });
        }
      }
    }
  };
};
