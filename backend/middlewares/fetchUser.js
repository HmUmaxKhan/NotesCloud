var jwt = require("jsonwebtoken");
const jwt_secret = "tuesdaymonday*fridaysunday"

const fetchUser = (req,res,next)=>{
    try {
        let token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({message:"Invalid token"});
        }
            let data = jwt.verify(token,jwt_secret);
            req.user = data.user
            next();
    }  catch (err) {
        res.status(500).json({ err: err.message });
        console.log(err);
      }
}

module.exports = fetchUser