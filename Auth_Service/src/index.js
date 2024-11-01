const express = require('express');
const bodyParser = require('body-parser'); // corrected typo
const { PORT } = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./router/index');
const multer = require('multer')
const upload = multer()

// const UserService = require('./service/user-service')

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({  extended: true }));

    app.use('/api' , upload.none(),apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at Port: ${PORT}`);
        
        const service = new UserService();
        // const newToken = service.createToken({email:'ayush@admin.com',id:1});
        // console.log("new token is ",newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE3MzA0Njk1NDksImV4cCI6MTczMDQ2OTU3OX0.cWDhRYTxmxe2CECmdOUOPiVuA0Y71KGW-v1MlvLEG9E'
        // const response = service.verifyToken(token);
        // console.log(response);
    });
};

prepareAndStartServer();
