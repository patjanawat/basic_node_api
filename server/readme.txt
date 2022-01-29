Packages
1.nodemon: 
2.express
3.mysql2
4.cors
5.body-parser
6.fast-csv
7.bcryptjs
8.jsonwebtoken
9.multer
10.json2csv
11.exceljs

nodemon
npm -i --save-dev nodemon

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

Download csv
Reference:
    https://www.bezkoder.com/node-js-download-csv-file/
Package
    npm install json2csv

Download excel
Reference: 
    https://www.bezkoder.com/node-js-download-excel-file/
Package:
    npm install exceljs
You can use browser or a Http client to test download excel to http://localhost/api/excel/download

Upload and download excel API
POST    /api/excel/Upload
GET     /api/excel/tutorials
GET     /api/excel/download

