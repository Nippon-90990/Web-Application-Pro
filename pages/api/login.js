// Next.js API route support: req.body[i].title,

import connectDb from '@/middleware/mongoose';
import User from '@/models/User';
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        let user = await User.findOne({ "email": req.body.email })
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        console.log(bytes.toString(CryptoJS.enc.Utf8))
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                var token = jwt.sign({email: user.email, name: user.name }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                });
                res.status(200).json({ Succese: true, succese: "SucceseFull", token})
            }
            else {
                res.status(200).json({ Succese: false, error: "Invalid Credentials" })
            }
        }
        else {
            res.status(200).json({ Succese: false, error: "No User Found" })
        }
    }

    else {
        res.status(400).json({ Error: 'This Page Can Not Found' })
    }

}
export default connectDb(handler);