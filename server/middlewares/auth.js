import jwt from "jsonwebtoken"


const auth = async (req, res, next) => {
    try {

        const token =
            req.cookies.refreshToken || 
            req.headers.authorization?.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                error: true,
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({
                message: "Unuthrized access",
                error: true,
                success: false,
            });
        }
  
        req.userId = decode.id
        
        next();
        
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
};

export default auth;
