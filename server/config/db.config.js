module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD:'1111',
    DB: 'testdb',
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idel:10000
    }
}