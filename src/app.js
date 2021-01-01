const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routing/authRoutes');
const postRoute = require('./routing/postRoutes');
const userRoute = require('./routing/userRoutes');
const myErrorLogger = require('./utils/errorlogger')
const { MONGOURI } = require('./utils/keys');
const PORT = 5000;

const app = express();

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use(bodyParser.json());
app.use(cors());
// API and routes definations
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);

app.all('*', (req, res) => {
    res.status(404).json({ routeError: 'Not a valid route' });
});

app.use(myErrorLogger);

app.listen(PORT, () => {
    console.log("server running at 5000");
});

module.exports = app;