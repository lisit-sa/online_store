require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models.js')
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js');

//local port 
const PORT = process.env.PORT || 5000;
 
const app = express();

// cors for sending requests from browser
app.use(cors());
app.use(express.json());
app.use('/api', router);
//error processing
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING'});
})

//start our DB and server
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log('Server started'));
    } catch (e) {
        console.log(e);
    }
}

start();
