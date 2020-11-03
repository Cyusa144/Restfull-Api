const jwt = require("jsonwebtoken");
const ENV = require("dotenv");

ENV.config();

const generateToken = async (userinfo) => {
    const Issuetoken = await jwt.sign(userinfo, process.env.SECRET, { expiresIn: '1d' });
    return Issuetoken;
};

module.exports = {
    generateToken
}
