const User = require('../models/user');
const Chat = require('../models/chat');
const  Mongoose  = require('mongoose');


exports.handleConnection = (socket) => {
  
    console.log("A user has connected");

    io.sockets.on('connect', function(){
        console.log("A socket with id " + socket.id + " has connected");
    })

    socket.on('join', (data) => {
        console.log("This is user1_id: " + data.user1_id);
        console.log("This is user2_id: " + data.user2_id);

        Chat.findOne({
            $or:[
                {$and:[
                    {user1_id: data.user1_id},
                    {user2_id: data.user2_id}
                ]},
                {$and:[
                    {user1_id: data.user2_id},
                    {user2_id: data.user1_id}
                ]}
            ]
        })
        .then(chatRoom => {
            if(!chatRoom){
                var room = new Chat({
                    user1_id: data.user1_id,
                    user2_id: data.user2_id
                })
                room.save()
                .then(res => {
                    socket.activeRoom = room._id.toString();
                    socket.join(room._id.toString());
                    socket.emit('joined', room._id.toString());
                })
            }
            else{
                socket.activeRoom = chatRoom._id.toString();
                socket.join(chatRoom._id.toString())
                socket.emit('joined',chatRoom._id.toString());
            }
        })
    })
    
    socket.on('message', (data) => {
        console.log("Un usuario ha enviado un mensaje")
        console.log(data.chatRoom)
        console.log(socket.rooms)    
        io.in(data.chatRoom).emit('message', data.chatRoom, data.author, data.message);
    })

}
