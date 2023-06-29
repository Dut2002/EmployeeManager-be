const db = require('../models/index');
const { Account, Student, Role } = require('../models');

class RegisteController {

    async index(req, res) {
        res.send('register');
    }

    //[Post] /
    async register(req, res) {
        let t = null;
        try {
            const { account, repassword, student } = req.body;
            console.log(account.password, " ", repassword);
            if (account.password !== repassword) {
                return res.status(400).send('Password and Repassword do not match');
            } else {
                // Check email
                const existingAccount = await Account.findByPk(account.email);
                if (existingAccount) {
                    return res.status(400).send('Email already exists');
                }
                // Check phone
                const existingStudent = await Student.findOne({
                    where: {
                        phone: student.phone
                    }
                });
                if (existingStudent) {
                    return res.status(400).send('Phone number already exists');
                }

                t = await db.sequelize.transaction();

                // Create student and Account
                const role = await Role.findOne({
                    where: {
                        roleName: 'Student'
                    },
                    attributes: ['roleId']
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
                const message = 'Signup new Student Account successfully';
                return res.json({status: true , message});
            }

        } catch (error) {
            console.error('Error register:', error);
            if (t) await t.rollback();
            return res.status(500).send('Server error');
        }
    }
}

module.exports = new RegisteController;