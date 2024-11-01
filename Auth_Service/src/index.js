const express = require('express');
const bodyParser = require('body-parser'); // corrected typo
const { PORT } = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./router/index');
const multer = require('multer')
const upload = multer()
const UserRepository = require('./repository/user-repository')

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api' , upload.none(),apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at Port: ${PORT}`);
        // const repo = new UserRepository();
        // const response = await repo.getById(1);
        // console.log(response);

    });
};

prepareAndStartServer();
