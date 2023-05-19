const db = require('../models/index');
const { Account, Student, Role } = require('../models');

class RegisteController {

    //[Get] /
    index(req, res) {
        res.status(200).send('register');
    }

    //[Post] /
    async register(req, res) {
        let t = null;
        try {
            const { account, repassword, student } = req.body;
            console.log(account.password, " ", repassword);
            if (account.password !== repassword) {
                return res.json({ error: 'Password and Repassword do not match' });
            } else {
                // Check email
                const existingAccount = await Account.findByPk(account.email);
                if (existingAccount) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                // Check phone
                const existingStudent = await Student.findOne({
                    where: {
                        phone: student.phone
                    }
                });
                if (existingStudent) {
                    return res.status(400).json({ error: 'Phone number already exists' });
                }

                t = await db.sequelize.transaction();

                // Create student and Account
                const role = await Role.findOne({
                    where: {
                        roleName: 'Student'
                    }
                });

                const newAccount = await Account.create({
                    email: account.email,
                    password: account.password,
                    roleId: role.roleId,
                }, { transaction: t });

                const newStudent = await Student.create({
                    name: student.name,
                    birthday: new Date(student.birthday),
                    gender: student.gender,
                    address: student.address,
                    phone: student.phone,
                    email: account.email
                }, { transaction: t });

                await t.commit(); // Commit the transaction

                console.log('Account created successfully:', newAccount);
                console.log('Student created successfully:', newStudent);
                return res.json({ message: 'Signup new Student Account successfully' });
            }

        } catch (error) {
            console.error('Error register:', error);
            if (t) await t.rollback();
            return res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = new RegisteController;