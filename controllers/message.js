const Message = require('../models/message');
const User = require('../models/user');
const { users } = require('../utils/socketio');

exports.getUnreadMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const unreadMessages = await Message.find({ receiver: userId, read: false });
    res.json(unreadMessages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.adminToUser = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const admin = await User.findOne({ _id: sender, isAdmin: true });
    if (!admin) {
      return res.status(403).json({ message: "Only admin can send messages" });
    }

    const user = await User.findById(receiver);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const msg = new Message({ sender: admin._id.toString(), receiver, message, read: false });
    await msg.save();

    const receiverSocketId = users[receiver];
    if (receiverSocketId) {
      req.io.to(receiverSocketId).emit('receiveMessage', msg);
      await Message.updateOne({ _id: msg._id }, { read: true });
    }

    res.json({ message: "Message sent to user", data: msg });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.userToAdmin = async (req, res) => {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const msg = new Message({ sender, receiver: admin._id.toString(), message, read: false });
    await msg.save();

    const receiverSocketId = users[admin._id.toString()];
    if (receiverSocketId) {
      req.io.to(receiverSocketId).emit('receiveMessage', msg);
      await Message.updateOne({ _id: msg._id }, { read: true });
    }

    res.json({ message: "Message sent to admin", data: msg });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.sendBroadcast = async (req, res) => {
  try {
    const { sender, message } = req.body;

    if (!sender || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const allUsers = await User.find({ _id: { $ne: sender } }, '_id');

    allUsers.forEach(async (user) => {
      const receiverId = user._id.toString();
      const msg = new Message({ sender, receiver: receiverId, message, read: false });
      await msg.save();

      const receiverSocketId = users[receiverId];
      if (receiverSocketId) {
        req.io.to(receiverSocketId).emit('receiveMessage', msg);
        await Message.updateOne({ _id: msg._id }, { read: true });
      }
    });

    res.json({ message: "Broadcast Message Sent to All Users (except Admin)" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
