'use strict';

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	id: Number,
	avatar: {type: String, default: 'default.jpg'},
})

userSchema.index({id: 1})

const User = mongoose.model('User', userSchema);

export default User