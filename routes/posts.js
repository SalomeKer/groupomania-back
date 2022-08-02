const express= require ("express")
const { checkToken } = require("../middleware/token")
const { getPosts, createPosts } = require("../controllers/posts")
const postRouter = express.Router()

postRouter.use(checkToken)
postRouter.get("/", getPosts)
postRouter.post("/", createPosts)


module.exports = { postRouter }
