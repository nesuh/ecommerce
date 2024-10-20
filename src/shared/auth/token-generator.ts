import Jwt from "jsonwebtoken";

export const generatedAuthToken=(id:string)=>{
    return Jwt.sign({_id:id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    }),
};