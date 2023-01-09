const mongoose =  require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});
const app = require('./app.js');
mongoose.set('strictQuery',false)
mongoose.connect(process.env.DBURL).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server is up and running on port,${process.env.PORT}`)
        });
})

