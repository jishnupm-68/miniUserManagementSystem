const bcrypt = require("bcryptjs");

const hashGenerator = async (password)=>{
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SECRET))
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

module.exports = hashGenerator