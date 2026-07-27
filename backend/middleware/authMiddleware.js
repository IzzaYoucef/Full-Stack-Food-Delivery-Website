import jwt from "jsonwebtoken" ; 


const authMiddleWare = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }

    try {
        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decode_token.id;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default authMiddleWare;
