const accountService = require('../services/AccountService');

class AccountController {

  // [Get] /account
  index(req, res) {
    accountService.getAccounts()
      .then(result => {
        if(result.length > 0){
          res.json(result);
        }else{
          res.status(204).json({message: "No Result"})
        }
      })
      .catch((err) => {
        res.status(500).json({ error: 'Server error' });
      });
  }
}

module.exports = new AccountController;