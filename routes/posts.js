const express= require ("express")
const { getPosts, createPosts, deletePost, createComment } = require("../controllers/posts")
const { checkToken } = require("../middleware/token")
const { imageUpload } = require ("../middleware/image")

const postRouter = express.Router()

postRouter.use(checkToken)
postRouter.post("/:id", createComment)
postRouter.delete("/:id", deletePost)
postRouter.get("/", getPosts)
postRouter.post("/", imageUpload, createPosts)



module.exports = { postRouter }
