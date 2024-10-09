import jwt from "jsonwebtoken";



export const isLoggedIn = async(req, res, next) => {
    const { token } = req.cookies;
    const tokenDetails = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!token || !tokenDetails){
        res.status(401).send({status: false, message: 'Login required!'});
    }

    req.user = tokenDetails;
    next();
}