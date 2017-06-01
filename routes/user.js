import express from 'express'
import UserModel from '../models/user.js'
import IDModel from '../models/id.js'
const router = express.Router();

router.get('/login', async (req, res, next) => {
	const username = req.query.username;
	// const userData = await UserModel.findOne({name: username});
	// if (userData) {
	// 	res.send({
	// 		status: 0,
	// 		message: '改用户名已被注册'
	// 	})
	// }else{
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
	//}
})

router.get('/info', async (req, res, next) => {
	const user_id = req.session.user_id;
	const userData = await UserModel.findOne({id: user_id}, 'name id -_id');
	if (userData) {
		res.send({
			status: 200,
			user_info:  userData
		})
	}else{
		res.send({
			status: 0,
			message: '获取用户信息失败'
		})
	}
})

export default router