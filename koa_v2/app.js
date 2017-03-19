import Koa from 'koa';
import middleware from 'koa-router';
import search from './routes/search';
const app = new Koa();
const tvsearch = search(middleware());
const serve = require('koa-static');
const path = require('path');

app
    .use(tvsearch.routes())
    .use(tvsearch.allowedMethods());
console.log('dirname:'+__dirname);
app.use(serve(path.join(__dirname, '/images')));

app.listen(4000, () => console.log('server started 4000'));

export default app

