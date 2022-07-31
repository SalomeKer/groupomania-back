const post1 = {
    user: "salome/k@gmail.com",
    title: "title",
    content: "this is my first post",
    url: "https://picsume.photos/400/200"
}
const post2 = {
    user: "salome/k@gmail.com",
    title: "title",
    content: "this is my second post",
    url: "https://picsume.photos/400/200"
}
const post3 = {
    user: "salome/k@gmail.com",
    title: "title",
    content: "this is my third post",
    url: "https://picsume.photos/400/200"
}

function getPosts(req, res){
   res.send([post1,post2,post3])   
}

module.exports = { getPosts }