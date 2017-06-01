const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
import db from './mongodb/db.js';
import config from 'config-lite';
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import session from 'express-session';
import connectMongo from 'connect-mongo';

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
io.on('connection', function (socket) {
 	socket.on("a",function(msg){
		io.emit("a",msg);
	});
	socket.on('disconnect', function(a){
		console.log(a)
	});
});
    
router(app)
server.listen(config.port);