const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getConversations, getMessages, accessConversation } = require('../controllers/chatController');

router.get('/conversations', protect, getConversations);
router.get('/messages/:conversationId', protect, getMessages);
router.post('/conversation', protect, accessConversation);

module.exports = router;
