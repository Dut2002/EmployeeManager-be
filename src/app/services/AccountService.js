const { Account, Role, Student } = require('../models');

class AccountService {

    async isValidUser(email, password) {
        try {
            const users = await Account.findOne({
                include: [{
                    model: Student
                }],
                where: {
                    email: email,
                    password: password
                }
            });
            console.log(users);
            if (users) {
                const role = await Role.findByPk(users.roleId)
                return { valid: true, role: role.roleName};
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