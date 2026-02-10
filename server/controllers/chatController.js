const Conversation = require('../models/ConversationModel');
const Message = require('../models/MessageModel');
const User = require('../models/UserModel');

// @desc    Get user conversations
// @route   GET /api/chat/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: { $in: [req.user._id] }
        })
            .populate('participants', 'name avatar email')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

        res.json(conversations);
    } catch (error) {
        res.status(500).json(error);
    }
};

// @desc    Get messages of a conversation
// @route   GET /api/chat/messages/:conversationId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
};

// @desc    Create or get conversation with a user
// @route   POST /api/chat/conversation
// @access  Private
const accessConversation = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.sendStatus(400);
    }

    let isConversation = await Conversation.find({
        $and: [
            { participants: { $elemMatch: { $eq: req.user._id } } },
            { participants: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate('participants', '-password')
        .populate('lastMessage');

    if (isConversation.length > 0) {
        res.send(isConversation[0]);
    } else {
        var conversationData = {
            participants: [req.user._id, userId],
        };

        try {
            constcreatedConversation = await Conversation.create(conversationData);
            const fullConversation = await Conversation.findOne({ _id: createdConversation._id }).populate('participants', '-password');
            res.status(200).json(fullConversation);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
};

module.exports = {
    getConversations,
    getMessages,
    accessConversation
};
