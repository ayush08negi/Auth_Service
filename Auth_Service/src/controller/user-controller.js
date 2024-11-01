const UserService = require('../service/user-service');

const userService = new UserService();

const create = async(req,res)=>{
    try{
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message:'Successfully created a new user',
            data: response,
            err:{}
        })
      
    }catch(error){
        console.log(error);
        return  res.status(500).json({
            data:{},
            success:false,
            message:"something went wrong can't able to create a user ",
            err:error
        })
    }
}

const signIn = async(req,res)=>{
    try{
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
           success:true,
           data:response,
           err:{},
           message:"succesfully signin "
        })

    }catch(error){
        console.log(error);
        return  res.status(500).json({
            data:{},
            success:false,
            message:"something went wrong can't able to create a user ",
            err:error
        })
    }
}

module.exports={
    create,
    signIn
}