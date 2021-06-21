const express = require("express");
const app = express();

const { config } = require("./config/index");
const aeromaxApi = require("./routes/products.js");

const { logErrors , errorHandler , wrapErrors }  = require("./utils/middleware/errorHandlers.js");

const notFoundHandler = require("./utils/middleware/notFoundHandler");

const cors = require("cors");

var whiteList = ["https://martinfits.github.io", "http://localhost:3000"];

var corsOptions = {
    origin: function(origin,cb){
        if(whiteList.indexOf(origin) === -1){
            cb(null,true)
        }else{
            cb(new Error("Not allowed by CORS"))
        }
    }
}

app.use(express.json());

//routes
aeromaxApi(app);

//catch 404
app.use(notFoundHandler);
app.use(cors());
//errores

app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, ()=>{
    console.log(`Listening http://localhost:${config.port}/api/products`)
})

module.exports = {
    corsOptions,
}