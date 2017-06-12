'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const chatSchema = new Schema({
	id: Number,
	username: String,
	user_id: Number,
	time: String,
	avatar: String,
	content: String,
})

chatSchema.index({id: 1});

const Chat = mongoose.model('Chat', chatSchema)


export default Chat