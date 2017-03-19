import TVDB from 'node-tvdb';

const fs = require('fs');
const https = require('https');
const tvdb = new TVDB(process.env.TVDBAPIKEY);
const PassThrough = require('stream').PassThrough;

/**
 * Created by verbi on 18/03/2017.
 */
export default retrieveImage => {

    retrieveImage.get('/tv/banner/:id', async(ctx, next) => {
        ctx.type = 'image/jpeg';
        let response2 = "Damn it";
        await tvdb.getSeriesBanner(ctx.params.id)
            .then(response => {
                console.log(response);
                let file = fs.createWriteStream('images/'+response);
                console.log('got here');
                https.get("https://www.thetvdb.com/banners/"+response, function(response) {
                    console.log('got here too');
                    response.pipe(file);
                    console.log('response: '+response);
/*                    ctx.length = response.length;*/
                    console.log('still here');
                    console.log('sttillll geer');
                    response2 = response.on('error', ctx.onerror).pipe(PassThrough());
                });
            })
            .catch(error => {
                console.log(error)
            });
        ctx.body = response2;
    });
    return retrieveImage;
}
