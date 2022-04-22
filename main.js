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

    let events = [];
    for(var i=0; i<items.length; i++){
        let clubInfo = (String)(items[i].author);
        let parIndex = clubInfo.indexOf('(');
        let event = {
            "eventName": items[i].title,
            "clubEmail": clubInfo.substring(0, parIndex),
            "clubName": clubInfo.substring(parIndex+1, clubInfo.length-1),
            "categories": items[i].categories,
            "date": items[i].content.time
        } 
        events.push(event);
        if(!(items[i].author === undefined)){
            console.log("#" + i + " "+ events[i].eventName + " " + events[i].clubName);
            for(var k = 0; k <event.categories.length; k++)
                console.log(event.categories[k]);
           // console.log(events[i].date)
        }

    }
    
})();
