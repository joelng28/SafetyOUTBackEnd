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
        
        Chat.findById(data.chatRoom)
        .then(chatRoom => {
            User.findById(data.author)
            .then(user => {
                chatRoom.messages.push({user_id: data.author, username: user.modelName, message: data.message});
                chatRoom.save()
                .then(function(){
                    io.in(data.chatRoom).emit('message', data.chatRoom, data.author, data.message);
                })
            })               
        })
    })
}

exports.getMessages = (req, res, next) => {
    var chat_id = req.params.id;
    Chat.findById(chat_id)
    .then(chat => {
        if(!chat){
            res.status(404).json({message:"A chat with this id could not be found"});
            const error = new Error("A chat with this id could not be found");
            error.statusCode = 404;
            throw error;               
        }

        res.status(200).json({messages: chat.messages});
    })
    .catch(err => {
        if(!err.statusCode)err.statusCode=500;
        next(err);
    }); 
}

exports.deleteChat = (req, res, next) => {
    var chat_id = req.params.id;
    Chat.findOneAndDelete(chat_id)
    .then(chat => {
        if(!chat){
            res.status(404).json({message:"A chat with this id could not be found"});
            const error = new Error("A chat with this id could not be found");
            error.statusCode = 404;
            throw error;               
        }

        res.status(200).json({message: "The chat has been deleted"});
    })
    .catch(err => {
        if(!err.statusCode)err.statusCode=500;
        next(err);
    }); 
}

exports.createChat = (req, res, next) => {

    Chat.findOne({
        $or:[
            {$and:[
                {user1_id: req.body.user1_id},
                {user2_id: req.body.user2_id}
            ]},
            {$and:[
                {user1_id: req.body.user2_id},
                {user2_id: req.body.user1_id}
            ]}
        ]
    })
    .then(chatRoom => {
        if(!chatRoom){
            var room = new Chat({
                user1_id: req.body.user1_id,
                user2_id: req.body.user2_id
            })
            room.save()
            .then(function(){
                res.status(201).json({message:"Chat created successfully", chat_id: room._id.toString()});
            })
        }
        else{
            res.status(409).json({message:"Chat already exists", chat_id: chatRoom._id.toString()});
        }
    })
}
