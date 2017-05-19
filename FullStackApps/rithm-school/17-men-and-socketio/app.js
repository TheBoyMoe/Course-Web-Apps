/*
    WebSockets and Socket.io
    
    * With HTTP client and server communicate via the request-response cycle. The client initiates a request, the server issues a response and the cycle is complete - though the connection can be kept alive via HTTP headers.
    * With websockets communication is kept open and is bidirectional. Both client and server can push data, the server does not have to wait for the request to arrive. Gives the appearance of interactions happening in real time, e.g multiplayer games and chat apps.
    * Socket.io handles websocket connections and communications between multiple clients and servers - websockets is built into node - socket.io abstracts the complexity making setup easier.
    * Socket.io performs two functions, emits events using the emit() method and listening for events using on() method. When a client connects, a websocket connection is created and the server emits a 'from server' event. It then listens for events emitted by the client, 'from client', and then takes some action.
    * When a client connects, a websocket is established, and the server receives a 'connection' event. This causes the server to respond with a 'from server' event.
    * When the client recieves the 'from server' event, it will emit it's own 'from client' event. When the server receives the event, it processes the request, and the process continues.
    * When a client initially connects, the 'from server' event is emitted to ALL websocket connections, all connected clients - events are emitted on io.sockets, not socket.
    * In socket.io each socket has it's own id, allowing private messages. It also has the idea of a 'room' - allowing a client to broadcast to everyone in the room.
  
    io.emit('name of event) or io.sockets.emit('name of event)
        - sends to everyone in EVERY room, including the sender.
        
    io.to('name of room').emit('name of event')
        - sends to everyone in the room, INCLUDING the sender.
        
    socket.broadcast.to('name of room').emit('name of event')
        - sends to everyone in the room, except the sender.
        
    socket.emit('name of event')
        - sends to the sender and no one else
    
    socket.broadcast.to(someOtherSocketId).emit()
        - send to a specific socket only, used for private chat
        
    References:
    [1] https://socket.io/


 */
"use strict";
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket)=>{
    console.log('connection!');
    io.sockets.emit('from server', 'Hello from socket.io'); // emit - io.sockets
    socket.on('from client', (data)=>{                      // receive - socket
        console.log(data);
    })
});

http.listen(port, () => console.log(`Express is listening on port ${port}`));