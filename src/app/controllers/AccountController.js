const accountService = require('../services/AccountService');

class AccountController {

  // [Get] /account
  index(req, res) {
    accountService.getAccounts(req)
      .then(result => {        
        return res.json(result);
      })
      .catch(err => {
        return res.status(500).json({ error: 'Server error' });
      })
  }
}

module.exports = new AccountController;