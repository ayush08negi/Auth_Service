const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserRepository = require('../repository/user-repository');
const {JWT_KEY} = require('../config/serverConfig');
const { response } = require('express');
const { useInflection } = require('sequelize');
const AppError = require('../utils/error-handler');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
         try{
           const user = await this.userRepository.create(data);
           return user;
         } catch(error){
            if(error.name == 'SequelizeValidationError'){
              throw error;
            }
            console.log("Something went wrong in the service layer");
            throw new AppError('ServerError',
              'Something went wrong in service',
              'Logical Issue found',
               500
             )

         }
    }
   
    async signIn(email,plainPassword){
       try{
        // step1 - FETCH THE USER USING THE EMAIL;
        const user = await this.userRepository.getByEmail(email);

        // step2 -> if(user gets) then compare the incoming password with the stored encrpted password;
        const passwordsMatch = this.checkPassword(plainPassword,user.password);
        if(!passwordsMatch){
          console.log("password does't match");
          throw {error: "Incorrect password"}
        }

        //step3 -> if password match then create a token and send it to the user
        const newJWT  = this.createToken({email:user.email,id: user.id})
        return newJWT;
        
       } catch(error){
         console.log("something went wrong in sign in process");
         throw error;
       }
    }

    async isAuthenticated(token){
      try{
        const isTokenVerified = this.verifyToken(token);
        if(!isTokenVerified) {
          throw{ error : 'Invalid token'}
        }
        const user = await this.userRepository.getById(response.id);
        if(!user) throw{error: 'No user with the correspondng tokin exists'}
        return user.id;

      } catch(error){
        console.log(error);
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

    isAdmin(userId){
      try{
        return this.userRepository.isAdmin(userId);
      } catch(error){
        console.log("somthing went wrong in service layer")
      }
    }


};

module.exports = UserService;