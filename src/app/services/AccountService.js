const {Account} = require('../models');

class AccountService {
    
    async getAccounts() {
        try {
            const users = await Account.findAll();
            return users
        } catch (err) {
            console.log('Db not  connected  successfully', err);
            throw err;
        }
    }

    async isValidUser(username, password) {
        try {
            const users = await Account.findAll({ 
                where: {
                    username: username, 
                    password: password
                } 
            });
            if(users.length>0){
                return {valid: true, role: users.roleId};
            } else {
                return {valid: false};
            }
        } catch (err) {
            console.log('Db not  connected  successfully', err);
            throw err;
        }
    }
}

module.exports = new AccountService;