import Koa from 'koa';
import middleware from 'koa-router';
import search from './routes/search';
import retrieveImages from './routes/retrieveImages';
const app = new Koa();
const tvsearch = search(middleware());
const images = retrieveImages(middleware());
const serve = require('koa-static');
const path = require('path');

app
    .use(tvsearch.routes())
    .use(tvsearch.allowedMethods())
    .use(images.routes())
    .use(images.allowedMethods());
console.log('dirname:'+__dirname);
app.use(serve(path.join(__dirname, '/images')));

app.listen(4000, () => console.log('server started 4000'));

export default app

