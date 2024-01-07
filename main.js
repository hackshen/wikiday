const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
// const URL = 'https://en.wikipedia.org/wiki/Wikipedia:Picture_of_the_day';
const URL = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
https.get(URL, function (res) {
    let chunks = [],
        size = 0;
    res.on('data', function (chunk) {
        chunks.push(chunk);
        size += chunk.length;
    });
    res.on('end', function () {
        const data = Buffer.concat(chunks, size);
        const html = data.toString();
        const $ = cheerio.load(html);
        // const imgUrl = $('.mw-file-description').find('img')[0].src;
        const { images } = JSON.parse(html || null);
        const [{ url }={}] = images;
        const imgUrl = `https://www.bing.com${url}`;
        console.log(imgUrl);
        fs.writeFile('./README.md', `![Le Juif polonais](https:${imgUrl})`, e => {

        });
    });
})
