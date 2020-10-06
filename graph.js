const { Edge } = require('js-graph-algorithms');
var jsgraphs = require('js-graph-algorithms');

// 1. Initialize your graph here.
var g = new jsgraphs.WeightedDiGraph(4); 
// 2. Add edges to your graph below
g.addEdge(new jsgraphs.Edge(0,1,1));
g.addEdge(new jsgraphs.Edge(0,2,3));
g.addEdge(new jsgraphs.Edge(0,3,7));
g.addEdge(new jsgraphs.Edge(1,2,1));
g.addEdge(new jsgraphs.Edge(2,3,2));
// 3. Create a function that takes a graph, a from node and a to node, 
//    and print the shortest path between the two nodes.
const shortestPath = (graph, to, from) => {
    let sp = [];
    // write the functionality here. Remember to look at the documentation!
var dijkstra = new jsgraphs.Dijkstra(graph,from); 
if(dijkstra.hasPathTo(to)){
    return dijkstra.pathTo(to).map(edge => edge.to());
    }
    else return console.log("path does not exist!")
    // return the shortest path as an array
    return console.log(sp); 
};
console.log(shortestPath(g,3,0));
// (4.) Modify above function to handle it, if a path doesn't exist. 
