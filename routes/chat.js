'use strict';

import express from 'express'
import ChatModel from '../models/chat.js'
const router = express.Router()

router.get('/history', async (req, res, next) => {
	const {limit = 20, offset = 0} = req.query;
	try{
		const history = await ChatModel.find({}, '-_id').sort({id: -1}).skip(Number(offset)).limit(Number(limit));
		res.send({
			status: 200,
			history: history.reverse(),
		})
	}catch(err){
		console.log('获取聊天记录失败', err);
		res.send({
			status: 0,
			message: '获取聊天记录失败'
		})
	}
})

export default router