import TVDB from 'node-tvdb';

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
        ctx.body = (ctx.tvshow) ? ctx.tvshow : "No Show Found";
    });

    /**
     * Lets check if the tv show exists
     */
    search.use(async(ctx, next) => {
        let value = tvshows.filter(function (obj) {
            return obj.name === ctx.params.name;
        })[0];
        if (!value) {
            await next();
        } else {
            //we need to tell the user this show has already been added
            //TODO - this just returns the show for now
            /*        ctx.tvshow = value;*/
        }
    });

    /**
     * It doesn't! Let's see if it exists on some tv indexer sites
     */
    search.use(async(ctx, next) => {
        await tvdb.getSeriesByName(ctx.params.name)
            .then(response => {
                console.log(response);
                ctx.tvshow = response;
                next();
            })
            .catch(error => { /* handle error */
            });
    });

    function get(show){
        return new Promise((resolve, reject) => {
            https.get("https://www.thetvdb.com/banners/" + show.banner, function (response) {
                resolve(response);
            });
        });
    }

    function saveImage(show,response){
        "use strict";
        return new Promise((resolve, reject) => {
            let file = fs.createWriteStream('images/' + show.banner);
            response.pipe(file);
            response.on('finish', function () {
                resolve();
            });
            https.get("https://www.thetvdb.com/banners/" + show.banner, function (response) {
                resolve(response);
            });
        });
    }

    search.use(async(ctx, next) => {
        await ctx.tvshow.map(show => {
            if (show.banner) {
                let file = fs.createWriteStream('images/' + show.banner);
                get(show).then(response => {
                    saveImage(show,response);
                })
            }
        });
    });
    return search;
}