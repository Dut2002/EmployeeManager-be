const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
const { Role, Account } = require('../models');

class LoginController {

    // [Get] /login
    index(req, res) {
        res.status(200).send("Login");
    }

    // [Post] /login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            //Get Account
            const users = await Account.findOne({
                where: {
                    email: email,
                    password: password
                }
            });
            if (users) {
                if (users.actived) {
                    // Create a new JWT for the user
                    const role = await Role.findOne({
                        where:{
                            roleId: users.roleId
                        },
                        atributes: ['roleName']
                    });
                    const payload = { email: email, role: role.roleName };
                    const options = {};
                    const token = jwt.sign(payload, secretKey, options);

                    // Send the JWT back to the client
                    return res.json({ token });
                } else {
                    return res.status(401).json({ message: 'Account is not active' });
                }
            } else {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
        } catch (error) {
            console.error('Error login:', error);
            return res.status(500).json({ error: 'Server error' });
        }
    }

}

module.exports = new LoginController;