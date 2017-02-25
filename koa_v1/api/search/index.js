
/**
 * This file illustrates how you may map
 * single routes using config.json instead
 * of resource-based routing.
 */


/**
 * GET all stats.
 */

const request = require('koa-request');
exports.tv = function *(){
    let options = {
        url: 'http://www.nzbs.org/api?o=json&t=tvsearch&apikey=93998b0194d1406f79e995d7fc8e0d51&cat=5040&extended=1&q='+this.params.name
    };
    let response = yield request(options); //Yay, HTTP requests with no callbacks!
    console.log(response);
    this.body = JSON.parse(response.body);
};

/**
 * GET a single stat.
 */

exports.movie = function *(){
  this.body = stats[this.params.name];
};
