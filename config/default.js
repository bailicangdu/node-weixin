'use strict';

module.exports = {
	port: 8003,
	url: 'mongodb://localhost:27017/weixin',
	session: {
		name: 'UID',
		secret: 'UID',
		cookie: {
			httpOnly: true,
		    secure: false,
		    maxAge: 365 * 24 * 60 * 60 * 1000,
		}
	}
}