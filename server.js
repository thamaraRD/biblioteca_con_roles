const express = require("express");
const cors = require("cors");
const app = express();

//Using dotenv
require("dotenv").config();

//Mongoose config
require("./server/config/mongoose.config");

//Using cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Access POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Calling all routes
require("./server/routes/user.routes")(app);

//Using the port
app.listen(process.env.PORT, () =>
  console.log(`CORS-enabled web server listening on port ${process.env.PORT}`)
);
