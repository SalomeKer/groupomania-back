const JWT = require ("jsonwebtoken")
const { users } = require ("../db/db.js")
const bcrypt = require ("bcrypt")

function logUser (req, res){
    const {email, password} = req.body
    const user = getUser (email)
    if (user == null) return res.status(404).send({error: "Utilisateur Introuvable"})
    
    checkPassword(user, password)
        .then((isPasswordCorrect) =>{
         if (!isPasswordCorrect) return res.status(401).send({error: "Le mot de passe est incorrect"})
         const token = makeToken(email)   
         res.send({token: token, email: user.email})
        })
        .catch((error) => res.status(500).send({ error }))
    
    
    const token = makeToken(email)
}

function makeToken(email){
    return JWT.sign({email}, process.env.SECRET, { expiresIn: "24h" })
}

function getUser(email){
    return users.find((user) => user.email === email)
}

function checkPassword(user, password){
    return bcrypt.compare(password, user.password)
}

function signupUser(req,res) {
    const { email, password, confirmPassword} = req.body
    if (password !== confirmPassword) return res.status(400).send
    ({error: "les mots de pass ne sont pas identiques"})
    const user = getUser (email)
    if (user != null) return res.status(400).send({error: "L'utilisateur existe déja"})
    hashedPassword(password)
        .then((hash) => {
           saveUser({email, password: hash}) 
           res.send({ email: email})
        })
        .catch((error) => res.status(500).send({ error }))
}


function saveUser(user){
    users.push(user)
}


function hashedPassword (password) {
    return bcrypt.hash(password, 10) 
  }


module.exports = { logUser, signupUser }