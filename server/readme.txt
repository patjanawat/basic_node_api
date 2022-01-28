Reference: https://www.bezkoder.com/node-js-express-sequelize-mysql
Sequelize API: https://sequelize.org/master/manual/model-querying-basics.html

jwt: https://www.bezkoder.com/node-js-jwt-authentication-mysql/

API
#1: npm init -y
#2: npm install express sequelize mysql2 cors body-parser --save

JWT
npm install bcryptjs jsonwebtoken --save


vscode extension
sqltools
SQLTools MySQL/MariaDB

Grant permision for authenticate to MySql
Reference:https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server#answers
ALTER USER 'user' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
flush privileges;

Upload CSV file data to Database
    Reference: https://www.bezkoder.com/node-js-upload-csv-file-database/
Package:
    npm instal multer fast-csv

Upload and download excel API
POST    /api/excel/Upload
GET     /api/excel/tutorials
GET     /api/excel/download
