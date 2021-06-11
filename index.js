const express = require("express");
const app = express();

const { config } = require("./config/index");
const aeromaxApi = require("./routes/products.js");

const { logErrors , errorHandler , wrapErrors }  = require("./utils/middleware/errorHandlers.js");

const notFoundHandler = require("./utils/middleware/notFoundHandler");

const cors = require("cors");

app.use(express.json());

//routes
aeromaxApi(app);

//catch 404
app.use(notFoundHandler);

//errores
app.use(cors());
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, ()=>{
    console.log(`Listening http://localhost:${config.port}/api/products`)
})