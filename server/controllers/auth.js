// const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      // console.log([users])
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          // console.log(users[i])
          const authenticated = bcrypt.compareSync(password, users[i].passHash)
          if(authenticated) {
            let userToReturn = {...users[i]}
            delete userToReturn.passHash
            res.status(200).send(users[i])
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        // users.push(req.body)
        res.status(200).send(req.body)

        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)
        
        let userObj = {
          username,
          email,
          firstName,
          lastName,
          passHash
        } 
        // console.log(userObj)
        users.push(userObj)

        let returnUsername = {...userObj}
        delete returnUsername.passHash
        res.status(200).send(returnUsername)
    }
}