import jwt from "jsonwebtoken";

const generateRefreshToken = async (userId, role) => {

      const token = await jwt.sign(
                    {id: userId, role},
                    process.env.JWT_SECRET,
                    {expiresIn: "30d"}
      )
  
     return token
}

export default generateRefreshToken