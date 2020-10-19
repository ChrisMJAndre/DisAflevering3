const { Graph } = require("js-graph-algorithms");
var jsgraphs = require("js-graph-algorithms");

// to include the json data, we "require" it
var data = require("./data.json");

// investigate the data.

// 1. console.log(data);

// Try to log the connections of the router object below.

// 2. console.log(data.routers[0].connections[0]);

// write a loop that prints the connections one by one.

//console.log(data.routers.length);
console.log("\n" + "Connections printed one by one: ");
for (let i = 0; i < data.routers.length; i++) {
  let r = data.routers[i];
  console.log("\n" + "Router: " + r.router);
  for (let x = 0; x < r.connections.length; x++) {
    console.log(r.connections[x]);
  }
}

// If you haven't done so already, finish your JSON-data file such that
// it represents the pictured graph.
// And now that you know how to access the routers and the connections,
// create the graph by iterating over the data.

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

//pseudo code:
/**
 * forEach router (r) {
 *      forEach router.connection (c) {
 *          graph.addEdge(fromNodeIndex, toNodeIndex, cost)
 *      }
 * }
 */

// now that you have your graph, make sure it looks the previous graph,
// and again implement the shortest path function.

const shortestPath = (graph, from, to) => {
  // write the functionality here. Remember to look at the documentation!
  var dijkstra = new jsgraphs.Dijkstra(graph, from);
  if (dijkstra.hasPathTo(to)) {
    return dijkstra.pathTo(to).map((edge) => edge.to());
  } else return console.log("path does not exist!");
  // return the shortest path as an array
};
console.log("\n" + "Shortest path is: ");
console.log(shortestPath(g, 0, 3));
console.log("\n");

/*
 // Method for printing the Graph
 const printGraph = (g) => {
    console.log("\nNodes: ", g.V);
    g.adjList.forEach((edges,i) => {
        console.log("Node: ", i)
        edges.forEach(e => {
            console.log("\tconnected to " + e.w + " with a weight of " + e.weight)
        })
    })
}
printGraph(g);
*/
