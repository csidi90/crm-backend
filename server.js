const dotenv = require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const connectDB = require('./config/db');

//routes
const userRouter = require('./api/routes/user/user.routes');
const contactRouter = require('./api/routes/contact/contact.routes');
//middleware
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('combined'));

connectDB()
	.then((connected) => {
		server.listen(PORT, () => {
			//connect DB
			console.log(`server started successfully on port: ${PORT}`);
		});
	})
	.catch((error) => console.log(error));

server.use('/users', userRouter);
server.use('/contacts', contactRouter);
