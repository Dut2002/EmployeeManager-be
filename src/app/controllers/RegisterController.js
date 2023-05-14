const { request } = require("express");


class RegisteController {

    //[Get] /
    index(req, res){
        res.status(200).send('register');
    }

    //[Post] /
    register(req, res){
        
    }
}

module.exports = new RegisteController;