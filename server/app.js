const express = require('express')
const helmet = require("helmet")
const rateLimit = require('express-rate-limit')
const userRoutes = require('./src/routes/user.routes')
const postRoutes = require('./src/routes/post.routes')
require("dotenv").config({ path: ".env" })
require("./src/db/mongodb")
const cookieParser = require("cookie-parser")
const path = require("path")
const { checkUser, requireAuth } = require("./src/utils/auth")

const app = express();

app.use(cookieParser())
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use("/login", apiLimiter) // prevent brute force attack

// allow cross origin request only in dev stage
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
)

app.use("/posts", express.static(path.join(__dirname, "uploads/posts")))
app.use("/profile", express.static(path.join(__dirname, "uploads/profile")))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", true)
    next();
})

//jwt

app.get("*", checkUser)
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})


app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


module.exports = app;
