const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const mongoose = require("mongoose");
const logger = require("morgan");
const router = express.Router()

const PORT = process.env.PORT || 8080;

const db = require("./models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.use("/api", apiRoutes); 
app.use("/", htmlRoutes); 

app.listen(PORT, () => console.log(`Listening on http://localhost: ${PORT}`));
