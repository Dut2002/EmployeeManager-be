const { request } = require("express");

class SiteController {

    //[Get] /
    index(req, res){
        res.send('home');
    }
}

module.exports = new SiteController;