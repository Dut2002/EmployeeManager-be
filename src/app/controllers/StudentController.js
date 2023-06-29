const { Student, Account, Role } = require('../models');
const db = require('../models/index');

class StudentController {

  // [Get] /student
  async index(req, res) {
    try {
      let listStudent;
      //Sort (option)
      if (req.query.hasOwnProperty('_sort')) {
        const { column, type } = req.query
        listStudent = await Student.findAll({
          include: [{
            model: Account,
            attributes: ['actived']
          }],
          order: db.Sequelize.literal(`${column} ${type}`)
        });
      } else {
        listStudent = await Student.findAll({
          include: [{
            model: Account,
            attributes: ['actived']
          }],
        });
      }
      return res.json(listStudent);
    } catch (error) {
      console.error('Error viewing student:', error);
      return res.status(500).send('Server error');
    }
  }

  // [Get] /student/get?studentId=
  async getStudent(req, res) {
    try {
      const { studentId } = req.query;
      const student = await Student.findOne({
        include: [{
          model: Account,
          attributes: ['actived']
        }],
        where: {
          studentId: studentId
        }
      });
      if (student) {
        return res.json(student);
      } else {
        return res.status(404).send('Student is not exists!!');
      }
    } catch (error) {
      console.error('Error getting student:', error);
      return res.status(500).send('Server error');
    }
  }

  // [Post] /student/create
  async createStudent(req, res) {
    let t = null;
    try {
      const { student } = req.body;

      // Check email
      const existingAccount = await Account.findByPk(student.email);
      if (existingAccount) {
        return res.status(409).send('Email already in use');
      }

      // Check phone
      const existingStudent = await Student.findOne({
        where: {
          phone: student.phone
        }
      });
      if (existingStudent) {
        return res.status(409).send('Phone number already in use');
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
        email: student.email,
        password: '123',
        roleId: role.roleId,
      }, { transaction: t });

      const newStudent = await Student.create({
        name: student.name,
        birthday: new Date(student.birthday),
        gender: student.gender,
        address: student.address,
        phone: student.phone,
        email: student.email
      }, { transaction: t });

      await t.commit(); // Commit the transaction

      console.log('Account created successfully:', newAccount);
      console.log('Student created successfully:', newStudent);
      return res.json({ status: true, message: 'Create new student successfully!' });
    } catch (error) {
      console.error('Error creating student:', error);
      if (t) await t.rollback();
      return res.status(500).send('Server error');
    }
  }

  // [Post] /student/update
  async updateStudent(req, res) {
    let t = null;
    try {
      const { student, actived } = req.body;

      const existingStudent = await Student.findByPk(student.studentId);
      if (!existingStudent) {
        // Not found
        return res.status(404).send('Student is not exists!!')
      } else {

        // Check email and phone
        const checkResults = await Student.findAll({
          include: [{
            model: Account,
            attributes: ['actived']
          }],
          where: {
            [db.Sequelize.Op.or]: [
              { email: student.email },
              { phone: student.phone }
            ],
            studentId: { [db.Sequelize.Op.not]: student.studentId }
          }
        });
        if (checkResults.length > 0) {
          // Not found
          return res.status(409).send('Email or phone number already in use');
        }

        t = await db.sequelize.transaction();
        const resultAccount = await Account.update({
          email: student.email,
          actived: actived
        }, {
          where: { email: existingStudent.email }
        }, { transaction: t });

        const resultStudent = await Student.update(student, {
          where: { studentId: student.studentId }
        }, { transaction: t });

        await t.commit(); // Commit the transaction

        if (resultStudent[0] === 1 || resultAccount[0] === 1) {
          return res.json({ status: true, message: 'Student updated successfully' });
        } else {
          return res.status(500).send('No changes detected!');
        }
      }
    } catch (error) {
      console.error('Error updating student:', error);
      return res.status(500).send('Server error');
    }
  }

  // [Get] /student/delete?studentId=
  async deleteStudent(req, res) {
    let t = null;
    try {
      const { studentId } = req.query;
      const deletedStudent = await Student.findOne({
        where: {
          studentId: studentId
        }
      });

      if (!deletedStudent) {
        return res.status(404).send('Student is not exists!!');
      }

      t = await db.sequelize.transaction();

      const resultStudent = await Student.destroy({
        where: { studentId: studentId }
      }, { transaction: t });

      const resultAccount = await Account.destroy({
        where: { email: deletedStudent.email }
      }, { transaction: t });

      await t.commit(); // Commit the transaction

      if (resultStudent === 1 || resultAccount === 1) {
        return res.json({status:true,message:'Student deleted successfully'});
      } else {
        t.rollback();
        return res.status(500).send('Unable to delete student and account!!');
      }

    } catch (error) {
      console.error('Error deleting student:', error);
      if (t) t.rollback();
      return res.status(500).send('Server error');
    }
  }
}
module.exports = new StudentController;