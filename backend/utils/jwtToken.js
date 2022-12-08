var jwt = require('jsonwebtoken');
const secret='mynameissubhramoybiswasandimaboy'
const jsonWebToken=async(user,res)=>{
    // return(res)=>{
    let data=user._id;
    let name=user.name;
    const token= jwt.sign({_id:data,name},secret);
    console.log(token);
    res.status(200).cookie('token',token,{expiresIn:new Date(Date.now() + 24*60*60),
        httpOnly:false}).json({
        success:true,
        token
    });
    console.log(token);
// }

}
module.exports=jsonWebToken;