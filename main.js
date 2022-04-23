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
    //let clubs = [];

    for(var i=0; i<items.length; i++){
        let clubInfo = (String)(items[i].author);
        let parIndex = clubInfo.indexOf('(');
        let event = {
            "eventName": items[i].title,
            "clubEmail": clubInfo.substring(0, parIndex),
            "clubName": clubInfo.substring(parIndex+1, clubInfo.length-1),
            "categories": items[i].categories,
            "date": items[i].content.time,
            "RSVP": items[i].guid
        } 
        events.push(event);

        // when we make a clubs array
        // let club = {
        //     "clubEmail": clubInfo.substring(0, parIndex),
        //     "clubName": clubInfo.substring(parIndex+1, clubInfo.length-1),
        //     "categories": items[i].categories,
        // }


        // if(!(items[i].author === undefined)){
        //     console.log("#" + i + " "+ events[i].eventName + " " + events[i].clubName);
        //     for(var k = 0; k <event.categories.length; k++)
        //         console.log(event.categories[k]);
        //    // console.log(events[i].date)
        // }
    }
   // filterCategory(events, "Social");
    //searchEvent(events, "First ")
    searchClub(events, "Association of Latino Professionals for America");
    
})();

function filterCategory(events, category){
   
    const filteredEvents = events.filter((event) => event.categories.includes(category));
          
    for(var i=0; i<filteredEvents.length; i++)
        console.log(i + " " + filteredEvents[i].eventName + " " + filteredEvents[i].clubName);
        
}

function searchEvent(events, eventName){
    
    const searchedEvents = events.filter((event) => event.eventName.includes(eventName));
          
    for(var i=0; i<searchedEvents.length; i++)
        console.log(i + " " + searchedEvents[i].eventName + " " + searchedEvents[i].clubName);

}

/**
 * change param to clubs array so to iterate through clubs and list all of its events
 * @param {*} events 
 * @param {*} clubName 
 */
function searchClub(events, clubName){

    const searchedClubs = events.filter((event) => event.clubName === clubName);
          
    for(var i=0; i<searchedClubs.length; i++)
        console.log(i + " " + searchedClubs[i].eventName + " " + searchedClubs[i].clubName);
    
}
