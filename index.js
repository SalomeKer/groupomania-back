require ("dotenv").config()
const port = process.env.PORT || 3000
const express = require ("express")
const app = express()
const bodyParser = require ("body-parser")
const { logUser, signupUser } = require ("./controllers/users")
const cors = require("cors")
const { postRouter } = require("./routes/posts")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const { prisma } = require ("./db/db")

prisma.post.findMany().then(console.log).catch(console.error)


app.use("/posts", postRouter)
app.use("/uploads", express.static("uploads"))


app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)


app.listen (port,() => console.log(`Listening on port ${port}`))

