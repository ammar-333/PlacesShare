const express = require("express");
const mongoose = require("mongoose");

const PORT = 5000;
const placesRouter = require("./routes/places-route");
const usersRouter = require("./routes/users-routes");
const app = express();


//middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

//home page
app.get('/', (req, res, next) => {
    res.json({"message": "Hello to place share"});
})

//Routes
app.use('/api/places', placesRouter);
app.use('/api/users', usersRouter);

//notfound (only executed if nn route has executed and send a respone)
app.use((req, res, next) => {
    const error = new Error("Could not find this Route")
    error.code = 404;
    next(error);
});

//error handler
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(500).json({"message": error.message} || "An unknown error happend!");
});


mongoose
    .connect("mongodb://localhost:27017/placesShare")
    .then(() => {
        console.log("connected to the Database");
        app.listen(PORT, () => {
        console.log(`the server started at http://localhost:5000`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
