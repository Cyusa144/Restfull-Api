import jwt from "jsonwebtoken";
import ENV from "dotenv";

ENV.config();

const generateToken = async (userinfo) => {
    const Issuetoken = await jwt.sign(userinfo, process.env.SECRET, { expiresIn: '1d' });
    return Issuetoken;
};

export {
    generateToken
}
