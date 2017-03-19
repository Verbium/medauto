import TVDB from 'node-tvdb';
import fetch from 'isomorphic-fetch';
const promisePipe = require("promisepipe");

const tvdb = new TVDB(process.env.TVDBAPIKEY);
const fs = require('fs');
const https = require('https');

export default search => {

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
        let promises = await ctx.tvshow.map((show) => new Promise((resolve, reject) => {
            console.log('show id:'+show.id);
            if (show.banner) {
                https.get("https://www.thetvdb.com/banners/" + show.banner, function (response) {
                    let file = fs.createWriteStream('images/' + show.banner);
                    response.pipe(file);
                    response.on('end', resolve);
                    response.on('error',resolve);
                });
            } else {
                resolve();
            }
        }));
        await Promise.all(promises).then(function(){
            "use strict";
                console.log('about to send body');
                ctx.body = (ctx.tvshow) ? ctx.tvshow : "No Show Found";
        }).catch(()=>{
            "use strict";
            console.log('well this sucks');
        });
    });

    return search;
}