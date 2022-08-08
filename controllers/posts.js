const { prisma } = require ("../db/db")

async function getPosts(req, res){
    const email = req.email
    const userLogged = await prisma.user.findUnique({ where: { email } });
    const posts = await prisma.post.findMany({
        include: {
            comments: {
            orderBy : {
                createdAt: "asc"
            },
              include: {
                user: {
                    select : {
                       email: true 
                    }
                }
              }  
            },
            user:{
                select: {
                    email: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    res.send({ posts: posts, email, userLogged })   

}

async function createPosts(req, res){
    const content = req.body.content
    const email = req.email

    try {
    
    const user = await prisma.user.findUnique({ where: { email } })
    const userId = user.id
    const post = { content, userId}
    addImageUrlToPost(req, post)
    
    const result = await prisma.post.create({ data: post})
    res.send({ post: result })
 } catch (err){
    res.status(500).send({ error: "Une erreur s'est produite"})
 }
}


async function createComment(req, res) {
    const postId = Number(req.params.id)
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    })
     if (post == null) {
      return res.status(404).send ({ error: "Le post n'existe pas"})
     }
    
     const userCommenting = await prisma.user.findUnique({
     where: { email: req.email }
     })
     const userId = userCommenting.id

    const commentToSend = { userId, postId, content: req.body.comment}
    console.log("commentToSend:", commentToSend)
    const comment = await prisma.comment.create({ data: commentToSend })
    console.log("comment:", comment)
    res.send({ comment })
}
    


function findUniquePost(postId) {
      return prisma.post.findUnique({
        where: { id: postId },
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    }

    async function deletePost(req, res) {
      const postId = Number(req.params.id)
      try {
        const post = await findUniquePostUser(postId);
        if (post == null) {
          return res.status(404).send({ error: "Post introuvable" });
        }
        const email = req.email;
        // Récupéré dans le token
        /* Vérification de l'identité de la personne qui supprime le post */
    
        await prisma.comment.deleteMany({ where: { postId } });
        await prisma.post.delete({ where: { id: postId } });
        res.send({ message: "Post supprimé" });
      } catch (error) {
        res.status(500).send({ error: "Erreur :", error });
      }
    }

    async function modifyPost(req, res) {
      /* Id du post modifié */
      const postId = Number(req.params.id);
      newContent = req.body.content;
    
      try {
        if (req.file != null) {
          const newImageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
          const postModified = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              content: newContent,
              imageUrl: newImageUrl,
            },
          });
          res.send(postModified);
        } else {
          postModified = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              content: newContent,
            },
          });
          res.send(postModified);
        }
      } catch (error) {
        res.status(500).send({ error: "Erreur de modification du post :", error });
      }
    }

    function addImageUrlToPost(req, post){    
      const hasImage = req.file != null
      if (!hasImage) return
      let pathToImage = req.file.path.replace("\\", "/")
      const protocol = req.protocol
      const host = req.get("host")
      const url = `${protocol}://${host}/${pathToImage}`    
      post.imageUrl = url
  
  }

    function findUniquePostUser(postId) {
      return prisma.post.findUnique({
        where: { id: postId },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });
    }



module.exports = { getPosts, createPosts, createComment, deletePost, modifyPost}