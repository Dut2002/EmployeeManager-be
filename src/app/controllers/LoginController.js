const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
const accountService = require('../services/AccountService');

class LoginController {

    // [Get] /login
    index(req, res) {
        res.status(200).send("Login");
    }

    // [Post] /login
    login(req, res) {
        const {username, password} = req.body;
        console.log(username + " " + password);
        // Check if username and password are valid
        accountService.isValidUser(username, password)
            .then(result => {
                if (result.valid) {
                    // Create a new JWT for the user
                    const payload = { username: username, role: result.role };
                    const options = {};
                    const token = jwt.sign(payload, secretKey, options);

                    // Send the JWT back to the client
                    return res.json({ token });
                } else {
                    return res.status(401).json({ message: 'Invalid username or password' });
                }
            })
            .catch(err => {
                return res.status(500).json({ error: 'Server error' });
            });
    }

}

module.exports = new LoginController;