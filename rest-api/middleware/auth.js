import jwt from "jsonwebtoken";
import ENV from "dotenv";

ENV.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers['auth'];
    if (!token) {
        return res.status(401).send({ status: 401, error: 'No token was provided' });
    }
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).send({ status: 400, error });
    }
    return true;
};

export {
    verifyToken
}