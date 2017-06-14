import user from './user.js'
import robot from './robot.js'
import chat from './chat.js'

export default app => {
	app.use('/user', user)
	app.use('/robot', robot)
	app.use('/chat', chat)
}