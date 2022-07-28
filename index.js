require ("dotenv").config()
const port = process.env.PORT || 3000
const express = require ("express")
const app = express()
const bodyParser = require ("body-parser")
const jwt = require("jsonwebtoken")

const user1 = {email: "sam.co@gmail.com", password: "123456"}
const user2 = {email: "sally.co@gmail.com", password: "123456"}
const user3 = {email: "saul.co@gmail.com", password: "123456"}
const users = [user1, user2, user3]


app.use(bodyParser.json())
function logUser(req,res){
  const { email, password } = req.body
  const user = getUser(email)
  if (user == null) return res.status(404).send("User not found")
  if (!isPasswordCorrect(user, password)) return res.status(401).send("Wrong password")
  const token = makeToken(email)
  res.send({token: token, message: "User logged"})
}

function makeToken(email){
    return jwt.sign({ email }, process.env.SECRET, { expiresIn: "24h" })
}

function getUser(email){
    return users.find((user) => user.email === email)
}

function isPasswordCorrect(user, password){
return user.password === password
}


app.post("/auth/login", logUser)

app.listen (port,() => console.log(`Listening on port ${port}`))

