// Next.js API route support: req.body[i].title,

import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require('crypto-js');

const handler = async(req, res)=> {
    if (req.method == 'POST') {
        console.log(req.body)
        const {name, email} = req.body
        let u = new User({ name, email, password : CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
        await u.save()

        res.status(200).json({Succese: 'Sucesfull'})
    }
    
    else {
        res.status(400).json({Error: 'This Page Can Not Found'})
    }
    
}
export default connectDb(handler);