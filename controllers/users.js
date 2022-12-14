const JWT = require("jsonwebtoken")
const { prisma } = require("../db/db.js")
const bcrypt = require("bcrypt")
const emailRegex = /^[a-zA-Z-_\.]+@[a-zA-Z\.]+[\.]+[a-z]*$/

async function logUser(req, res) {
	const { email, password } = req.body
	try {
		const user = await getUser(email)
		if (user == null) return res.status(404).send({
			error: "Utilisateur Introuvable"
		})
		const isPasswordCorrect = await checkPassword(user, password)
		if (!isPasswordCorrect) return res.status(401).send({
			error: "email et/ou mot de passe incorrect(s)"
		})
		const token = makeToken(email)
		res.send({
			token: token,
			email: user.email
		})
	} catch (error) {
		res.status(500).send({
			error
		})
	}
}

function makeToken(email) {
	return JWT.sign({
		email
	}, process.env.SECRET, {
		expiresIn: "24h"
	})
}

function getUser(email) {
	return prisma.user.findUnique({
		where: {
			email
		}
	})
}

function checkPassword(user, password) {
	return bcrypt.compare(password, user.password)
}


async function signupUser(req, res) {
	const { email, password, confirmPassword } = req.body
	if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "le format de l'email est incorrect"
        });
    }
    try {
	const userInDb = await getUser(email)
	if (userInDb != null) return res.status(400).send({ error: "L'utilisateur existe déja" })
	
    const hash = await hashedPassword(password)
    const user = await saveUser({ email, password: hash })
    res.send({ user })}
    
    catch(error) { 
        res.status(500).send({ error })
    }
}

function saveUser(user) {
	return prisma.user.create({ data: user })
}

function hashedPassword(password) {
	return bcrypt.hash(password, 10)
}
module.exports = {
	logUser,
	signupUser
}