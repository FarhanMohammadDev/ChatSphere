import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import "dotenv/config";

const app = express();
const PRORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(cors({
    origin: "http://localhost:3000"
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: false,
    } 
});

io.on('connection', (socket) => {
    console.log('a user connected' ,socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected' , socket.id);
    });

    socket.on('join_room', (roomName) => {
       socket.join(roomName)
       console.log(`user with Id : ${socket.id} joined room : ${roomName}`);
       
    });

    socket.on('sendMessage',async (dataMsg) => {
        // socket.join(dataMsg)
        console.log(`user with Id : ${socket.id} send Message : ${JSON.stringify(dataMsg)}`);
        io.to(dataMsg.room).emit("receive_message",dataMsg)
        
     });


    // socket.on('chat message', (msg) => {
    //     console.log(msg)
    //     io.emit('chat message', msg);
    // });
});

server.listen(PRORT, () => {
    console.log(`Server is listening at http://localhost:${PRORT}`);
});
