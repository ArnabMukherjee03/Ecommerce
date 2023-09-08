const jwt = require('jsonwebtoken');

exports.getDataFromToken = (req)=>{
    try {

        const token = req.cookies.token || '';
        if(!token){
            throw new Error("Login Required")
        }
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
    } catch (error) {
        throw new Error(error.message)
    }
}