'use strict';

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const idSchema = new Schema({
	user_id: Number,
	chat_id: Number,
})

idSchema.index({id: 1})

const ID = mongoose.model('ID', idSchema);

ID.findOne((err, data) => {
	if (!data) {
		ID.create({
			user_id: 0,
			chat_id: 0,
		})
	}
})

export default ID