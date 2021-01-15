const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const authRouters = require('./routes/auth');

//DB CONNECTION
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then(() => {
        console.log("DB CONNECTED");
    }).catch((err) => console.log(err))

 //Middleware
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(cors());


 app.get('/',(req,res) => {
     res.json({
         message:"This is Home Page!"
     });
 });

 app.use('/api',authRouters);

 const PORT=process.env.PORT || 8000;

app.listen(PORT,()=> {
    console.log(`App is running on port ${PORT}`);
})
