const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRouters = require('./routes/auth');
const userRouters = require('./routes/user');
const categoryRouters = require('./routes/category');
const productRouters = require('./routes/product');


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
 app.use('/api',userRouters);
 app.use('/api',categoryRouters);
 app.use('/api',productRouters);

app.listen(process.env.PORT || 8000,()=> {
    console.log(`App is running on port ${process.env.PORT}`);
})
