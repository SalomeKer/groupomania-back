const comment1 = {
    user: "nom@gmail.com",
    content: "Mon premier commentaire"
}
const comment2 = {
    user: "nom@gmail.com",
    content: "Mon deuxième commentaire"
}



const post1 = {
    user: "salome.k@gmail.com",
    content: "Mon premier post !",
    url: "https://picsum.photos/600/300",
    comments: [comment1, comment2]
}
const post2 = {
    user: "salome.k@gmail.com",
    content: "Mon deuxième post !",
    url: "https://picsum.photos/600/300",
    comments: [comment1]
}
const post3 = {
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
    const content = req.body.content
    const email = req.email
    const post = { content, user: email, comments: [] }
    
    //Permet de classer les posts chronologiquement 
    posts.unshift(post)
    res.send({ post })
}

module.exports = { getPosts, createPosts }