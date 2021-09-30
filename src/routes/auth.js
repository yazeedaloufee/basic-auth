const userModel = require('../models/user.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const base64 = require('base-64');


router.post('/signup', createUser)
async function createUser(req, res) {
    console.log(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);

    try {


        const user = new userModel(req.body);
        const record = await user.save(req.body);

        res.status(200).json(record);
    }
    catch (e) {
        res.status(403).send('Error Creating user');
    }
    //play around with the code here 
}

router.post('/signin', signinUser);

async function signinUser(req, res) {
    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    try {
        const user = await userModel.findOne({ username: username });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        } else {
            throw new Error('invalid User')
        }
    }
    catch (error) { res.status(403).send('Invalid Login') }

}

module.exports = router;