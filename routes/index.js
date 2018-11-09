const path = require("path");
const router = require("express").Router();
const db = require("../models");
const axios = require("axios");
const puppeteer = require('puppeteer');

router.get("/api/bandcamp", function(req, res){
 
  (async function bandcamp() {
     let results = [];
    try {
      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();
      page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
      await page.goto('https://bandcamp.com/');
      await page.waitForSelector('.discover-item');
  
      const discoverItems = await page.$$('.discover-item');
      console.log(discoverItems.length)
  
      for (const discoverItem of discoverItems) {
        const item = await discoverItem.$('a.item-title');
        const artist = await discoverItem.$('a.item-artist');
        const image = await discoverItem.$('img.art');
        const itemTitle = await page.evaluate(item => item.innerText, item);
        const itemArtist = await page.evaluate(item => item.innerText, artist);
        const itemUrl = await page.evaluate(item => item.href, item);
        const art = await page.evaluate(item => item.src, image);
        // const itemArtist = await page.evaluate(item => item.);
        console.log("item-title: ", itemTitle);
        console.log("item-artist: ", itemArtist);
        console.log("itemUrl: ", itemUrl);
        console.log("image: ", art);
        results.push({
          title: itemTitle,
          artist: itemArtist,
          url: itemUrl,
          image: art
        })
      }
  
      

      return results;
  
    } catch (e){
      console.log("out error", e);
    }
  })()

  
  // .then ((results) => {console.log("your results: ", results)})
  .then(results => res.json(results))
  .catch(err => res.status(422).json(err));
})

router.get("/api/soundcloud", function(req, res){
  (async function soundcloud() {
    let results = [];
   try {
     const browser = await puppeteer.launch({headless: true});
     const page = await browser.newPage();
     page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36');
     await page.goto('https://soundcloud.com/');
     await page.waitForSelector('.badgeList__item');
 
     const badgeList = await page.$$('.badgeList__item');
     console.log(badgeList.length)
 
     for (const badgeListItem of badgeList) {
       const item = await badgeListItem.$('a.playableTile__mainHeading');
       const artist = await badgeListItem.$('a.playableTile__usernameHeading');
       const image = await badgeListItem.$('span.sc-artwork');
       const itemTitle = await page.evaluate(item => item.innerText, item);
       const itemArtist = await page.evaluate(item => item.innerText, artist);
       const itemUrl = await page.evaluate(item => item.href, item);
       const art = await page.evaluate(item => item.style.attr, image);
       // const itemArtist = await page.evaluate(item => item.);
       console.log("item-title: ", itemTitle);
       console.log("item-artist: ", itemArtist);
       console.log("itemUrl: ", itemUrl);
       console.log("image: ", art);
       results.push({
         title: itemTitle,
         artist: itemArtist,
         url: itemUrl,
         image: art
       })
     }
 
     

     return results;
 
   } catch (e){
     console.log("out error", e);
   }
 })()
  .then(results => res.json(results))
  .catch(err => res.status(422).json(err));
})

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
});

// API Routes
// router.use("/api", apiRoutes);

// // If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
