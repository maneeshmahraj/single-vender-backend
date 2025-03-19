const express = require('express');
const {
  getUnreadMessages,
  adminToUser,
  userToAdmin,
  sendBroadcast
} = require('../controllers/message');

const router = express.Router();

router.get('/unreadMessages/:userId', getUnreadMessages);
router.post('/admin-to-user', adminToUser);
router.post('/user-to-admin', userToAdmin);
router.post('/sendBroadcast', sendBroadcast);

module.exports = router;
