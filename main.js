//this works
const express = require('express')
const app = express()
const fs = require("fs");
const Parser = require("rss-parser");

(async function main(){

    const parser = new Parser();
    const feed = await parser.parseURL("https://rutgers.campuslabs.com/engage/events.rss");


    let items = [];

    await Promise.all(feed.items.map(async (currentItem) => {

        items.push(currentItem);

    }));

    var json = JSON.stringify(items, null, 2);
    fs.writeFileSync("events.json", json);
    
})();
