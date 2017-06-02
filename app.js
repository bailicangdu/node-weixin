const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
import db from './mongodb/db.js';
import config from 'config-lite';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';
import dtime from 'time-formater'
import IDModel from './models/id.js'
import ChatModel from './models/chat.js'
import UserModel from './models/user.js'

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});


const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
  	name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		store: new MongoStore({
	  	url: config.url
	})
}))

const users = {};
io.on('connection', (socket) => {
 	socket.on("chat", async (msg) => {
 		const {user_id, content} = msg;
 		try{
 			if(!user_id){
 				throw new Error('用户ID参数错误')
 			}else if(!content){
 				throw new Error('发表对话信息错误')
 			}
 		}catch(err){
 			console.log(err.message, err);
 		}
 		let chatObj;
 		try{
 			const user = await UserModel.findOne({id: user_id});
 			const ID = await IDModel.findOne()
			ID.user_id ++ ;
			await ID.save()
			chatObj = {
				id: ID.user_id,
				username: user.name,
				avatar: user.avatar,
				user_id,
				time: dtime().format('YYYY-MM-DD HH:mm:ss'),
				content,
			}
			await ChatModel.create(chatObj)
 		}catch(err){
 			console.log('保存聊天数据失败', err);
 		}
		io.emit("chat",chatObj);
	});
});
    
router(app)
server.listen(config.port);