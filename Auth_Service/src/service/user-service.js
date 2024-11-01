const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig')

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
         try{
           const user = await this.userRepository.create(data);
           return user;
         } catch(error){
            console.log("somthing went wrong in service layer");
            throw error;
         }
    }

     createToken(user){
      try{
        const result = jwt.sign(user,JWT_KEY, {expiresIn:'1d'});
        return result;
      } catch(error){
        console.log("something went wrong in token creation");
        throw error
      }
    }

    verifyToken(token){
      try{
        const response = jwt.verify(token,JWT_KEY)
        return response;

      } catch(error){
        console.log("something went wrong in token validation")
        throw error;
      }
    }

    checkPassword(userInputPlainPassword, encrptedPassword){
       try{
          return bcrypt.compareSync(userInputPlainPassword,encrptedPassword )
       } catch(error){
         console.log("somthing went wrong in password comparision");
         throw error
       }
    }


};

module.exports = UserService;