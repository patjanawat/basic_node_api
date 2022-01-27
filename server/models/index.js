const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Tutorial = require('../models/tutorial.model')(sequelize, Sequelize);

// db.User = require('./user.model')(sequelize,Sequelize)
// db.Role = require('./role.model')(sequelize,Sequelize)

// db.Role.belongsToMany(db.User,{
//     through: "user_roles",
//     foreignKey:"roleId",
//     otherKey: "uesrId"
// })

// db.User.belongsToMany(db.User,{
//     through: "user_roles",
//     foreignKey:"userId",
//     otherKey: "roleId"
// })

// db.ROLES = ["user","admin","moderator"]

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db