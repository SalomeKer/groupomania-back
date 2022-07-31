const jwt = require("jsonwebtoken")

function checkToken(req,res,next){
    const token = req.headers.authorization.split(" ")[1]
    if (token == null) return res.status(401).send({ error: "Token non présent" })
  
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      console.log("decoded:", decoded)
      if (error) return res.status(401).send({ error: "Le token est invalid" })
      req.email = decoded.email
      next()
    })
  }
  

module.exports = { checkToken }