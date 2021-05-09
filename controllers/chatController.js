const User = require('../models/user');
const Chat = require('../models/chat');
const  Mongoose  = require('mongoose');


exports.handleConnection = (socket) => {
  
    console.log("A user has connected");
    socket.on('join', (user1_id, user2_id) => {
        Chat.findOne({
            $or:[
                {$and:[
                    {user1_id: user1_id},
                    {user2_id: user2_id}
                ]},
                {$and:[
                    {user1_id: user2_id},
                    {user2_id: user1_id}
                ]}
            ]
        })
        .then(chatRoom => {
            if(!chatRoom){
                var room = new Chat({
                    user1_id: user1_id,
                    user2_id: user2_id
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
    
    socket.on('message', (chatRoom, author, message) => {
       io.in(chatRoom).emit('message', chatRoom,author, message);
    })
}
