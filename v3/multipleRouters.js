let data = require("../data.json");
const Router = require("./routerV3");
const Packet = require("./packet");
const prompt = require('prompt'); 
const jsgraphs = require('js-graph-algorithms');

let routers = [];

const multipleRouters = () => {
    /**
     * 1. Iterate through the data and create the routers from it 
     * as well as add it to our array.
     */
   
    // your code here

    /**
     * 2. build a weighted directional graph and adds the edges 
     * between the nodes through the data.json file
     */
    
    // your code here

    /**
     * 3. create a new packet. 
     * create a packet with a name, a source, a destination and a ttl.
     * the source should be 0, destination 3 and ttl > 3. 
     * the name can be whatever you'd like.
     */

    let demoPacket = new Packet(/*Do something here */);
    // Add the shortest path to the packet.
    demoPacket.shortestPath = getShortestPath(graph, demoPacket.source, demoPacket.destination);

    /**
     * Prompt is a package to prompt the user though the terminal.
     * Can be found here: https://github.com/flatiron/prompt#readme
     */
    prompt.start();
    console.log("demo packet initialized. Send packet? (y/n)")
    prompt.get(["sendPacket"], function(err, res) {
        if(res.sendPacket == "y") {
            demoPacket.forwardPacket(demoPacket.source);
        }
        else {
            console.log("Bye!")
            process.exit(1);
        }
    })
}

/**
 * This methods gets the router names / indexes on the shortest path.
 */
const getShortestPath = (graph, from, to)  => {
    // 4. implement this.
}

multipleRouters();
