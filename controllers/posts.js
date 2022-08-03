
const comment1 = {
    id: "1comment",
    user: "nom@gmail.com",
    content: "Mon premier commentaire"
}
const comment2 = {
    id: "2comment",
    user: "nom@gmail.com",
    content: "Mon deuxième commentaire"
}



const post1 = {
    id: "1",
    user: "salome.k@gmail.com",
    content: "Mon premier post !",
    url: "https://picsum.photos/600/300",
    comments: [comment1, comment2]
}
const post2 = {
    id: "2",
    user: "salome.k@gmail.com",
    content: "Mon deuxième post !",
    url: "https://picsum.photos/600/300",
    comments: [comment1]
}
const post3 = {
    id: "3",
    user: "salome.k@gmail.com",
    content: "Mon troisième post !",
    url: "https://picsum.photos/600/300",
    comments: []
}

const posts =  [post1, post2, post3]

function getPosts(req, res){
    const email = req.email
    res.send({ posts, email})   
}

function createPosts(req, res){
    console.log("req.body:", req.body)
    console.log("req.file:", req.file)
    const content = req.body.content
    const hasImage = req.file != null
    
    //ON fabrique l'url ou on renvoi null
    const url = hasImage ? createImageUrl(req) : null
    const email = req.email
    const post = { content, user: email, comments: [], imageUrl: url, id: posts.length + 1 }
    //Permet de classer les posts chronologiquement 
    posts.unshift(post)
    res.send({ post })
}

function createImageUrl(req){
    let pathToImage = req.file.path.replace("\\", "/")
    const protocol = req.protocol
    const host = req.get("host")
    return `${protocol}://${host}/${pathToImage}`
}

function createComment(req, res){
    console.log("req.params:", req.params)
    const postId = req.params.id
    const post = posts.find((post) => post.id === postId)
    console.log("post:", post)

    console.log("req.body:", req.body)
    
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const user = req.email
    const commentToSend = { id, user, content: req.body.comment}
    console.log("commentToSend:", commentToSend)
    post.comments.push(commentToSend)
    res.send({ post })
}


module.exports = { getPosts, createPosts, createComment }