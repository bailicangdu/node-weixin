import express from 'express'
import fetch from 'node-fetch'
const router = express.Router();

router.get('/question', async (req, res, next) => {
	const question = req.query.question;
	let requestConfig = {
		method: 'GET',
		headers: {
			'Authorization': 'APPCODE ee87f98d712a42128421c78d72e985a0',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	}
	try {
		const response = await fetch('http://jisuznwd.market.alicloudapi.com/iqa/query?question=' + encodeURIComponent(question), requestConfig);
		const resJson = await response.json();
		res.send({
			status: 200,
			content: resJson.result.content,
		})
	} catch (err) {
		console.log('获取http数据失败', err);
		res.send({
			status: 0,
			message: '获取聊天数据失败',
		})
	}
})

export default router