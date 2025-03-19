const express = require("express");
const app=express();
const http = require('http');
const productRoute= require("./routes/route");

app.use(require("./routes/productRoutes"));
app.use(require("./routes/wishlistAndFavRoutes"));
const languageRoute = require('./routes/languageRoute');
const loginRoute = require('./routes/loginRoute');
const otpRoute = require('./routes/otpRoute');
const userRoute = require('./routes/userRoute');
const homeRoute = require('./routes/homeRoute');
const { setupSocket } = require('./utils/socketio');
const messageRoutes = require('./routes/message');
const cors = require('cors')
const server = http.createServer(app);
const io = setupSocket(server);
const bodyparser = require('body-parser')
require('dotenv').config();

const port=process.env.PORT || 7000;
require("./config/dbconnection")


app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
    req.io = io;
    next();
  });
  app.use('/api', require('./routes/user'));
  app.use('/api', require('./routes/order'));
  app.use('/api', require('./routes/review'));
  app.use('/api/messages', messageRoutes);  
app.use("/v1",productRoute)
app.use('/lang', languageRoute); 
app.use('/login', loginRoute);
app.use('/otp', otpRoute);
app.use('/user', userRoute);
app.use('/home', homeRoute);
app.listen(port, ()=>{
    console.log("app run on:  "+port)
})
