const jsonwebtoken=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    
    //get bearer token
    const bearerToken=req.headers.authorization
    if(!bearerToken){
        return res.send({message:"unauthorized request"})
    }
    const token=bearerToken.split(' ')[1]
    //verify token with th access key
    try{
    let decodedtoken=jsonwebtoken.verify(token,'abcdef')
    next()
    }catch(err){
        next(err)
    }
}



module.exports=verifyToken;