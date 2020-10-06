const http = require('http');
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);
const fetch = require('node-fetch');
const Packet = require('./packet');

class Router{
    constructor(name, connections) {
        this.name = name;
        this.connections = connections;
        var self = this; // trick to access router from inner functions
        this.server = http.createServer(function(req, res) {
            let data = []
            // If the request contains any data, this listener is activated.
            req.on('data', chunk => {
                data.push(chunk)
            })

            // listener when reading data stream is done. 
            req.on('end', () => {
                if(data.length > 0) {
                    //1. decipher data. hint: JSON.parse()

                    //2. reconstructing packet from data
                    let packet = new Packet(/* something here */)
                    
                    // console.log("Packet " + packet.id + " received at router " + self.name);
                    if(packet.destination == self.name) {
                        // 3. What to do if packet has reached destination? 
                        // We should end.
                    }

                    // 4. Get which router to forwardTo. 
                    // Hint: there's a method in packet, that gets the next router.
                    // Hint: should be an int.
                    let forwardTo /* = packet.somemethod() */
                    // get the connection object (routeTo). 
                    // consists of a "to" and a "cost".
                    let routeTo = self.getRouteTo(forwardTo);
                    // 5. decrement the packets ttl.

                    // 6. Add an extra field to routeTo named ttl with same value as the packet's ttl.
                    // remember the object notation of objects in javascript.

                    // 7. Finish the if statement.
                    if(/* packet ran out of ttl*/n) {
                        
                        res.end(JSON.stringify({msg:"packed dropped due to ttl"}))
                        return;
                    }
                    // console.log("Forwarding to router "+forwardTo+" and inccuring a cost of " + routeTo.cost + ". Total cost: " + packet.getTotalCost());
                    
                    // 8. Add the routeTo to the packet's history.
                    // hint: Look at the packet methods.


                    // 9. forward the packet to the forwardTo variable.
                    // again look at the packet's methods.

                }
                else {
                    res.end("No data received");
                }
            })
            
        })
        this.port = ports.register("router"+this.name);
        this.server.listen(this.port, function() {
            // console.log("Router " + name + " is listening on port " + this.address().port);
        });
    }

    getRouteTo = (destination) => {
        let found;
        this.connections.forEach((c) => {
            if(c.to === destination) {
                found = c;
            }
        })
        return found;
    }

    updateConnections(connections) {
        this.connections = this.connections;
    }
}

module.exports = Router;