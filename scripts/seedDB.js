const mongoose = require("mongoose");
const db = require("../models");
var cheerio = require("cheerio");
var request = require("request");
const puppeteer = require('puppeteer');
mongoose.Promise = global.Promise;

// This file empties the articles collection and inserts the articles below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/musicplaylist",
  {
    useMongoClient: true
  }
);

const songSeed = [
  
];

(async function main() {
  try {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
    await page.goto('https://bandcamp.com/');
    await page.waitForSelector('.discover-item');

    const discoverItems = await page.$$('.discover-item');
    console.log(discoverItems.length)

    for (const discoverItem of discoverItems) {
      const item = await discoverItem.$('a.item-title')
      // const artist = await discoverItem.$('a.item-artist')
      const itemTitle = await page.evaluate(item => item.innerText, item);
      // const itemArtist = await page.evaluate(item => item.)
      console.log("item-title", itemTitle);
      songSeed.push({
        title: title
      });
    }
  } catch (e){
    console.log("out error", e);
  }
})();

// request("https://www.nytimes.com/", function(error, response, html) {

//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(html);

//   // An empty array to save the data that we'll scrape
//   var results = [];

//   // With cheerio, find each p-tag with the "title" class
//   // (i: iterator. element: the current element)
//   $("h2.story-heading").each(function(i, element) {

//     // Save the text of the element in a "title" variable
//     var title = $(element).text();

//     // In the currently selected element, look at its child elements (i.e., its a-tags),
//     // then save the values for any "href" attributes that the child elements may have
//     var link = $(element).children().attr("href");

    

//     // Save these results in an object that we'll push into the results array we defined earlier
//     articleSeed.push({
//       title: title,
//       url: link
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(articleSeed);
// });



db.Song
  .remove({})
  .then(() => db.Song.collection.insertMany(songSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


   
