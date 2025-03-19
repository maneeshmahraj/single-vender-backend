const { Server } = require('socket.io');
const Message = require('../models/message');

const users = {}; // Store connected users

const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('registerUser', async (userId) => {
      users[userId] = socket.id;
      console.log(`User Registered: ${userId}`);

      const unreadMessages = await Message.find({ receiver: userId, read: false });
      unreadMessages.forEach((msg) => {
        io.to(socket.id).emit('receiveMessage', msg);
      });

      await Message.updateMany({ receiver: userId }, { read: true });
    });

    socket.on('sendMessage', async ({ sender, receiver, message }) => {
      const msg = new Message({ sender, receiver, message, read: false });
      await msg.save();

      const receiverSocketId = users[receiver];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', msg);
        await Message.updateOne({ _id: msg._id }, { read: true });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) delete users[userId];
    });
  });

  return io;
};

module.exports = { setupSocket, users };
