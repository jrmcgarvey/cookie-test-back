const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
cors = require('cors')
const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGIN,
    methods: ["GET"],
    credentials: true,
    preFlightContinue: false
}

const app = express()
app.set('trust proxy', 1)
app.use(cookieParser("notverysecret"))
app.use(cors(corsOptions))
app.get("/set", (req, res) => {
  res.cookie("sameSiteLax","value", {sameSite: "Lax", httpOnly: true, secure: true})
  res.cookie("sameSiteNone", "value", {sameSite: "None", httpOnly: true, secure: true})
  res.cookie("domainTwo", "value", {sameSite: "None", httpOnly: true, secure: true})
  res.cookie("domainDefault", "value", {sameSite: "None", httpOnly: true, secure: true})
  res.send("4 cookies set")
})
app.get("/get",(req,res)=> {
    res.send(JSON.stringify({returnedCookies: req.cookies}))
})


app.use(express.json())
app.use(cookieParser())  



app.listen(3000)