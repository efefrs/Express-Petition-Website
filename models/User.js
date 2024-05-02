const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {

  static async findUser(email) {
    try{
      const user = await User.findByPk(email)
      return user ? user : null;
    } catch(error) {
      console.log(error);
      return null;
    }
  }

  static async addUser(firstname, lastname, email) {
    try{
      const user = await User.create({ firstname: firstname, lastname: lastname, email: email })
      return user ? user : null;
    } catch(error) {
      console.log(error);
      return null;
    }
  }
}

User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User

// const { getRow, addRow, getAll, testGetAll } = require('../db')

// class User{
//     constructor(firstname, lastname, email){
//         this.firstname = firstname
//         this.lastname = lastname
//         this.email = email
//     }
//     static async findUser(email){
//         let sql = `SELECT * FROM USER WHERE email=?`;
//         try {
//             let user = await getRow(sql,email)
//             return user ? user : null
//         } catch (error) {
//             console.log(error)
//             return null
//         }
//     }
//     static async addUser(firstname, lastname, email) {
//         let sql = `INSERT INTO USER (firstname, lastname, email) VALUES (?, ?, ?)`;
//         try {
//             let user = await addRow(sql,[firstname, lastname, email])
//             return user ? user : null
//         } catch (error) {
//             console.log(error)
//             return null
//         }
//     }
//     static async getAllUsers() {
//         try {
//             let users = await testGetAll();
//             return users ? users : null;
//         } catch (error) {
//             console.log(error)
//             return null;
//         }
//     }
    
// }

// module.exports = User