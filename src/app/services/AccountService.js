const { Account } = require('../models');

class AccountService {

    async getAccounts(req) {
        try {
            if (req.query.hasOwnProperty('_sort')) {
                const {column, type} = req.query
                return await Account.findAll({
                    order: [[column, type]],
                });
            }
            return await Account.findAll();;
        } catch (err) {
            console.log('Db not connected successfully', err);
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
            if (users.length > 0) {
                return { valid: true, role: users.roleId };
            } else {
                return { valid: false };
            }
        } catch (err) {
            console.log('Db not  connected  successfully', err);
            throw err;
        }
    }
}

module.exports = new AccountService;