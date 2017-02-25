import Koa from 'koa';
import Router from 'koa-router';
import TVDB from 'node-tvdb';
const app = new Koa();
const router = new Router();
const tvdb = new TVDB('1805276D5EACE9CD');


// response
/*app.use(async (ctx) => {
  ctx.body = 'Hello World'
});*/

let tvshows = [
/*    { name:"The Big Bang Theory", value:"this", other: "that" },
    { name:"Colony", value:"this", other: "that" }*/
];

/*
router.get('/', async (ctx, next) =>{
  "use strict";
    ctx.body = 'Hello World4'
});
*/

/**
 * Base get to handle call to add :name tv show
 */

/*router.use(async (ctx, next) => {
    ctx.header("Access-Control-Allow-Origin", "*");
    ctx.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    await next();
});*/

router.get('/tv/search/:name', async (ctx, next) =>{
    "use strict";
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    await next();
    ctx.body = (ctx.tvshow) ? ctx.tvshow : "No Show Found";
});

/**
 * Lets check if the tv show exists
 */
router.use(async(ctx, next) => {
    "use strict";
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
router.use(async (ctx,next) =>{
  ctx.test2 = 'this worked also';
    await tvdb.getSeriesByName(ctx.params.name)
        .then(response => {
            console.log(response);
            ctx.tvshow = response;
        })
        .catch(error => { /* handle error */ });
});

/**
 * Lets search tvrage for info
 */
router.use(async (ctx,next) =>{
    ctx.test2 = 'this worked also';
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(4000, () => console.log('server started 4000'));

export default app

