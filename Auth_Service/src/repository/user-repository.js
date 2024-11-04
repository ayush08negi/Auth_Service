const {User,Role} = require('../models/index');
const  ValidationError  = require('../utils/validation-error');

class UserRepository{
    
    async create(data){
        try{
            const user = await User.create(data); 
            return user;
        } catch(error){
            if(error.name = 'SequelizeValidationError'){
                throw new ValidationError(error)
            }    
            console.log("something went wrong in repository layer")
            throw error;
        }
    }

    async destroy(userId){
        try{
            await User.destroy({
                where:{
                    id:userId
                }
            });
        } catch(error){
            console.log("something went wrong in repository layer")
            throw error;
        }
    }

    async getById(userId){
        try{
          const user = await User.findByPk(userId,{
            attributes: ['email','id'] // get karte samay kon kon se attribute chahta hu mai
          });
          return user;
        } catch(error){
            console.log("something went wrong in repository layer")
            throw error;
        }
    }

    async getByEmail(userEmail){
        try{
            const user = await User.findOne({
                where:{
                    email : userEmail
                }
            })
            return user;
            
        } catch(error){
            console.log("somthing went wrong in repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
           const user = await User.findByPk(userId);
           const adminRole = await Role.findOne({
               where:{
                name: 'ADMIN'
               }
           })
           console.log(adminRole,user)
           return user.hasRole(adminRole)
        } catch(error){
           console.log("something went wrong in repository layer")
        }
    }
};

module.exports = UserRepository;