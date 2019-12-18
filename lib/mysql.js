function Mysql(){
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
  		password : 'qazxsw321',
  		database : 'oppo'
	});
	this.connect = function(){
		connection.connect();
    };
    this.disconnect = function(){
		connection.end();
	};
    this.anyUpdate = function(sql, parse, solve) {
        connection.query(sql, parse, function (err, result) {
            if (err) {
                console.log('[ERROR] - ',err.message);
                solve(-1);
                return;
            }
            solve(result);
        });
    }
    this.anyQuery = function(sql, solve) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[ERROR] - ',err.message);
                solve(-1);
                return;
            }
            solve(result);
        });
    }
};
module.exports=Mysql;