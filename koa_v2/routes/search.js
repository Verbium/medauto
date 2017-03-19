import TVDB from 'node-tvdb';
import fs from 'fs';
import https from 'https';

const tvdb = new TVDB(process.env.TVDBAPIKEY);

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
     * Let's see if it exists on some tv indexer sites
     */
    search.use(async(ctx, next) => {
         await tvdb.getSeriesByName(ctx.params.name)
            .then(response => {
                console.log(response);
                ctx.tvshow = response;
            })
            .catch(error => {
                //TODO - need to add some handling in if the tvdb api is down.
                /* handle error */
            });
         await next();
    });

    /**
     * We've got some tv shows, tvdb doesn't like hotlinking so we need to cache the banners so the user can request them from us
     * ctx.body will provide back an object passed through from the tvdb api.
     */
    search.use(async(ctx, next) => {
        let promises = await ctx.tvshow.map((show) => new Promise((resolve, reject) => {
            if (show && show.banner) {
                let banner = show.banner;
                https.get("https://www.thetvdb.com/banners/" + banner, function (response) {
                    let file = fs.createWriteStream('images/' + banner);
                    response.pipe(file);
                    response.on('end', resolve);
                    response.on('error',reject);
                });
            } else {
                resolve();
            }
        }));
        await Promise.all(promises).then(function(){
            "use strict";
                ctx.body = (ctx.tvshow) ? ctx.tvshow : "No Show Found";
        }).catch(()=>{
            "use strict";
            console.log('well this sucks');
        });
    });

    return search;
}