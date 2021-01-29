var mysql = require('mysql');
var config = require('./sqlConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, (err, rows) => {
                        if (err) {
                            
                            reject(err)
                        } else {
                           
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
   findUserData: (email) =>{
        let _sql = `select * from user_info where emailinfo="${email}";`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
         let _sql = `insert into user_info(username,password,emailinfo) values("${obj.username}","${obj.password}","${obj.email}");`
         return allServices.query(_sql, obj)
    },
    delData: (obj,status) => {
      //1 单独 2 集合
      var _sql ='';

      if(status==1){
        _sql =`delete from  user_info where username =${obj};`
      } else{
        // let _sql = `delete form  user_info where username in (2,3) ${obj.username};`
        
      }
      
      return allServices.query(_sql, obj)
    },
    updataUserInfo: (username,obj,status) => {
      let _sql =`UPDATE user_info SET password = ${obj.password}  WHERE  username = '${username}';`
      return allServices.query(_sql, obj)
    },
    getContentInfos: (obj) => {
        // let _sql = `select * from diary_description limit ${(obj.page-1)*obj.limit}, ${obj.limit};`
        let _sql =`SELECT * FROM diary_description ORDER BY id ASC limit ${(obj.page-1)*obj.limit} ,${obj.limit}`;
        return allServices.query(_sql, obj)
    },
}

module.exports = allServices;