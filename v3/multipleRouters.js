let data = require("../data.json");
const Router = require("./routerV3");
const Packet = require("./packet");
const prompt = require("prompt");
const jsgraphs = require("js-graph-algorithms");

let routers = [];

const multipleRouters = () => {
  /**
   * 1. Iterate through the data and create the routers from it
   * as well as add it to our array.
   */

  // your code here
  data.routers.forEach((router) => {
    // initialize router
    let r = new Router(router.router, router.connections);
    // add to array
    routers.push(r);
  });

  /**
   * 2. build a weighted directional graph and adds the edges
   * between the nodes through the data.json file
   */

  // your code here
  // initliaze graph below
  var g = new jsgraphs.WeightedDiGraph(4);
  // add edges dynamically.
  // Hint: You need a nested loop.
  // The outer loop must iterate the routers, and the inner loop the connections.

  for (let i = 0; i < data.routers.length; i++) {
    let r = data.routers[i];
    for (let x = 0; x < r.connections.length; x++) {
      let c = r.connections[x];
      g.addEdge(new jsgraphs.Edge(r.router, c.to, c.cost));
    }
  }

  /**
   * 3. create a new packet.
   * create a packet with a name, a source, a destination and a ttl.
   * the source should be 0, destination 3 and ttl > 3.
   * the name can be whatever you'd like.
   */

  let demoPacket = new Packet("Chris", 0, 3, 10);
  // Add the shortest path to the packet.
  demoPacket.shortestPath = getShortestPath(
    g,
    demoPacket.source,
    demoPacket.destination
  );

  /**
   * Prompt is a package to prompt the user though the terminal.
   * Can be found here: https://github.com/flatiron/prompt#readme
   */
  prompt.start();
  console.log("demo packet initialized. Send packet? (y/n)");
  prompt.get(["sendPacket"], function (err, res) {
    if (res.sendPacket == "y") {
      demoPacket.forwardPacket(demoPacket.source);
    } else {
      console.log("Bye!");
      process.exit(1);
    }
  });
};

/**
 * This methods gets the router names / indexes on the shortest path.
 */
const getShortestPath = (graph, from, to) => {
  var dijkstra = new jsgraphs.Dijkstra(graph, from);
  if (dijkstra.hasPathTo(to)) {
    return dijkstra.pathTo(to).map((edge) => edge.to());
  } else return console.log("path does not exist!");
  // return the shortest path as an array
};

multipleRouters();
