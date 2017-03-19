import TVDB from 'node-tvdb';
import fetch from 'isomorphic-fetch';
const promisePipe = require("promisepipe");

const tvdb = new TVDB(process.env.TVDBAPIKEY);
const fs = require('fs');
const https = require('https');

export default search => {
    let tvshows = [
        /*    { name:"The Big Bang Theory", value:"this", other: "that" },
         { name:"Colony", value:"this", other: "that" }*/
    ];

    /**
     * Base get to handle call to add :name tv show
     */

    search.get('/tv/search/:name', async(ctx, next) => {
        "use strict";
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        await next();
    });

    /**
     * It doesn't! Let's see if it exists on some tv indexer sites
     */
    search.use(async(ctx, next) => {
         await tvdb.getSeriesByName(ctx.params.name)
            .then(response => {
                console.log(response);
                ctx.tvshow = response;
            })
            .catch(error => { /* handle error */
            });
         await next();
    });

    search.use(async(ctx, next) => {
        await ctx.tvshow.map(show => {
            if (show.banner) {
                https.get("https://www.thetvdb.com/banners/" + show.banner, function (response) {
                    promisePipe(
                        response.pipe(fs.createWriteStream('images/' + show.banner)),
                    ).then(function(streams){
                        console.log("Yay, all streams are now closed/ended/finished!");
                    }, function(err) {
                        console.log("This stream failed:", err.source);
                        console.log("Original error was:", err.originalError);
                    });
                });
            }
        });
        console.log('about to send body');
        ctx.body = (ctx.tvshow) ? ctx.tvshow : "No Show Found";
    });

    return search;
}