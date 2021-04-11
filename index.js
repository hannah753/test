const express = require("express");
const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const storage = require("./libs/handyStorage");
const sequelizeConnection = require("./models/index");

const app = express();

sequelizeConnection.sync(
    // {
    //     force:true
    // }
);

app.set("view engine","pug");
app.use(cors());
app.use(express.json());

//const sequelizeConnection = require("./models/index");

//static folders
app.use(express.static(__dirname + '/public'));
app.use(express.static("./covers"));
app.use(express.static("./users"));
app.use('/auth',express.static('public'));
//app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    //res.locals.token = storage.state.token;
   //res.locals.user = storage.state.user.email;
    next();
});

//main routes
app.use("/", routes);
//main auth
app.use("/auth", authRoutes);

app.listen(4000, () => {
    console.log("server on port 4000");
});