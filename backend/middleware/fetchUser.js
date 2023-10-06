var jwt = require('jsonwebtoken');
const JWT_Token = "naman@123$"

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send("Access Is Denied")
    }
    try {
        const data=jwt.verify(token,JWT_Token)
        req.user=data.user
        next();
    } catch (error) {
        res.status(200).send("Token Is Incorrect")

        
    }
    

}
module.exports=fetchUser