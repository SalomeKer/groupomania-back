require ("dotenv").config()
const port = process.env.PORT || 3000
const express = require ("express")
const app = express()
const bodyParser = require ("body-parser")
const { logUser, signupUser } = require ("./controllers/users")
const cors = require("cors")
const { getPosts } = require("./controllers/posts")
const { checkToken } = require("./middleware/token")

app.use(bodyParser.json())
app.use(cors())

app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)
app.get("/posts", checkToken, getPosts)


app.listen (port,() => console.log(`Listening on port ${port}`))

