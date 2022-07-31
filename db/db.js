const mockHash = "$2b$10$ipdt.Sd6pwuWJW4Mr0sHXOuKWw/8h9LgUdMji.mqab806mfXP8NAy"


const user1 = { email: "salome.k@gmail.com", "password": mockHash}
const user2 = { email: "sam.k@gmail.com", "password": mockHash}
const user3 = { email: "sally.k@gmail.com", "password": mockHash}
const users =  [user1, user2, user3]

module.exports = { users }