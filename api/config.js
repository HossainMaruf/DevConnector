const dotenv = require('dotenv');
dotenv.config();
		
module.exports = {
	NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT,
	SERVER_PORT: process.env.SERVER_PORT,
	MONGO_URL: process.env.MONGO_URL,
	SECRET_KEY: process.env.SECRET_KEY
};
