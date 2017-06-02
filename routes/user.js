import express from 'express'
import UserModel from '../models/user.js'
import IDModel from '../models/id.js'
const router = express.Router();

router.get('/login', async (req, res, next) => {
	try{
		const username = req.query.username;
		const ID = await IDModel.findOne()
		ID.user_id ++ ;
		await ID.save()
		await UserModel.create({
			name: username,
			id: ID.user_id,
		})
		req.session.user_id = ID.user_id;
		res.send({
			status: 200,
			message: '注册成功',
			user_info: {
				name: username,
				id: ID.user_id,
			}
		})
	}catch(err){
		console.log('注册失败', err);
		res.send({
			status: 0,
			message: '注册失败',
		})
	}
})

router.get('/info', async (req, res, next) => {
	const session_user_id = req.session.user_id;
	const query_user_id = req.session.user_id;
	const user_id = session_user_id || query_user_id;
	if (!user_id) {
		console.log('user_id参数错误')
		res.send({
			status: 0,
			message: 'user_id参数错误'
		})
		return 
	}
	try{
		const userData = await UserModel.findOne({id: user_id}, '-_id');
		if (userData) {
			res.send({
				status: 200,
				user_info:  userData
			})
		}else{
			console.log('未找到当前用户')
			res.send({
				status: 0,
				message: '未找到当前用户'
			})
		}
	}catch(err){
		console.log('获取用户信息失败', err)
		res.send({
			status: 0,
			message: '获取用户信息失败'
		})
	}
})

export default router