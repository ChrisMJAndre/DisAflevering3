// Importing modules
let data = require("../data.json");
const Router = require("./routerV3");
const Packet = require("./packet");
const prompt = require("prompt");
const jsgraphs = require("js-graph-algorithms");

// Assigning an empty array to the varible "routers"
let routers = [];

const multipleRouters = () => {
  // This code iterates though the data and creates routers from it, and adds it to our array "routers"
  data.routers.forEach((router) => {
    // initialize router
    let r = new Router(router.router, router.connections);
    // add to array - push methode
    routers.push(r);
  });

  //build a weighted directional graph and adds the edges
  //between the nodes through the data.json file, seen below:

  // initliaze graph below - using jsgraphs
  var g = new jsgraphs.WeightedDiGraph(4);
  // This nested loop is creates the edges dynamically by itterating the routers and the connections for each router
  for (let i = 0; i < data.routers.length; i++) {
    let r = data.routers[i];
    for (let x = 0; x < r.connections.length; x++) {
      let c = r.connections[x];
      g.addEdge(new jsgraphs.Edge(r.router, c.to, c.cost));
    }
  }

  // A new packet is created with a given name, source (0), destination (3), and a time to live - longer than 3, since we know it has to rerouted atleast 3 times.
  let demoPacket = new Packet("Chris", 0, 3, 10);
  // Shortest path is added to the packet - methode can be seen below
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
