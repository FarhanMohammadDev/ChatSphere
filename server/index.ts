import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db';
import User from './models/user.model';
import Message from './models/message.model';

const app = express();
const PRORT = process.env.PORT || 8080;
const server = http.createServer(app);
connectDB()

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

    socket.on('join_room', async(data) => {
        const newUser =new User({
            username:  data.userName ,
            socketid : socket.id,
            room:data.roomName
        })
        await newUser.save()
       socket.join(data.roomName)
       console.log(`user :${data.userName} with Id : ${socket.id} joined room : ${data.roomName}`);
       
    });

    socket.on('sendMessage',async (dataMsg) => {

        console.log(`user with Id : ${socket.id} send Message : ${JSON.stringify(dataMsg)}`);
        const newMessage =new Message({
            senderId: socket.id ,
            // receiverId : ,
            room: dataMsg.room, //roomname
            author: dataMsg.author, //username
            time:dataMsg.time,
            message: dataMsg.message,
        })
        await newMessage.save()

        // socket.to(dataMsg.room).emit("receive_message",dataMsg)
        io.to(dataMsg.room).emit("receive_message",newMessage)
        
     });


    // socket.on('chat message', (msg) => {
    //     console.log(msg)
    //     io.emit('chat message', msg);
    // });
});

server.listen(PRORT, () => {
    console.log(`Server is listening at http://localhost:${PRORT}`);
});
