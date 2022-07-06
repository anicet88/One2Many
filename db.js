//db.js

const mysql = require('mysql');



const pool = mysql.createPool({
    connectionLimit: 10,    // the number of connections node.js will hold open to our database
    password: "",
    user: "root",
    database: "OneToMany_db" ,
    host: "localhost",
    port: 3306

});


//create Company table
pool.query('create table if not exists Company (' +
    'id int auto_increment primary key,' +
    'name varchar(255) not null)', function (err, result) {
        if (err) throw err;
        console.log("Company table created");
    }
);



//create Employee table
pool.query('create table if not exists Employee (' +
    'id int auto_increment primary key,' +
    'name varchar(255) not null,' +
    'position varchar(255) not null,' +
    'wage int not null,' +
    'company_id int not null,' +
    'foreign key (company_id) references  Company(id))', function (err, result) {
        if (err) throw err;
        console.log("Employee table created");
    }
);


let db = {}; //create an empty object you will use later to write  and export your queries. 


db.companyEmployees = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Employee WHERE company_id = ?', [id], (error, employees) => {
            if (error) {
                return reject(error);
            }
            return resolve(employees);

        })
    })
}


db.employeeCompany = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Company.name FROM Employee, Company WHERE Employee.id= ? and Company.id = Employee.company_id ', [id], (error, employeeCompany) => {
            if (error) {
                return reject(error);
            }
            return resolve(employeeCompany);

        })
    })
}

module.exports = db