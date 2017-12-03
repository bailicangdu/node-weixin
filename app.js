import express from 'express'
const app = express()
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
import history from 'connect-history-api-fallback';

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
io.on('connection', socket => {
 	socket.on("chat", async (msg) => {
 		let {user_id, content} = msg;
 		content = content.trim();
 		try{
 			if(!user_id){
 				throw new Error('用户ID参数错误')
 			}else if(!content){
 				throw new Error('发表对话信息错误')
 			}
 		}catch(err){
 			console.log(err.message, err);
 		}
		content = content.substring(0,100);
 		let chatObj;
 		try{
 			const user = await UserModel.findOne({id: user_id});
 			const ID = await IDModel.findOne()
			ID.chat_id ++ ;
			await ID.save()
			chatObj = {
				id: ID.chat_id,
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
app.use(history());
app.use(express.static('./public'));
server.listen(config.port);