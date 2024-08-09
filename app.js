require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { newUserController, getUserController, loginController } = require('./contollers/users');
const { newTweetController, getTweetsController, getSingleTweetController, deleteTweetController } = require('./contollers/tweets');
const authUser = require('./middleware/auth');




const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());
app.use("/uploads", express.static("./uploads"));

app.post("/user", newUserController);
app.get("/user/:id", getUserController);
app.post("/login", loginController);

app.post("/", authUser, newTweetController);
app.get("/", getTweetsController);
app.get("/tweet/:id", getSingleTweetController);
app.delete("/tweet/:id", authUser, deleteTweetController);

app.use((req, res) => {
    res.status(404);
    res.send({
        status: "error",
        message: "Not Found",
    });
});

app.use((error, req, res, next) => {
    res.status(error.httpStatus || 500);
    res.send({
        status: "error",
        message: error.message,
    });
});

app.listen(7000, () => {
    console.log("app listening on port 7000 🌍");
});
