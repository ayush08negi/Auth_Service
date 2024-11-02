const express = require('express');
const bodyParser = require('body-parser'); // corrected typo
const { PORT } = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./router/index');
const multer = require('multer')
const upload = multer()

const db = require('./models/index')

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({  extended: true }));

    app.use('/api' , upload.none(),apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at Port: ${PORT}`);

        if(process.env.DB_SYNC){
           db.sequelize.sync({alter:true})
        }

    });
};

prepareAndStartServer();
