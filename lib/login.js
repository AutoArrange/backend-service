exports.login = (req, res)=>{
    let obj = {}
    const MYSQL = require('./mysql.js');
    mysql = new MYSQL();
    console.log(req.query);
    let Sql = "SELECT * FROM User WHERE phone = " + req.query.id;
    mysql.anyQuery(Sql, (ans)=>{
        if (ans == -1) {filed(); return;}
        if (ans[0] == undefined) {filed(); return;}
        if (ans[0].password != req.query.password) {filed(); return;}
        obj.msg = "登录成功"
        obj.code = 200
        token = {
            username:ans[0].username,
            password:ans[0].password,
            phone:ans[0].phone,
            time:new Date().getTime()
        }
        obj.token = require('./create-token').createToken(token);
        obj.info = {
            username:ans[0].username,
            description:ans[0].description,
            contact:JSON.parse(ans[0].contact)
        }
        res.json(obj);
        res.end();
    })
    filed = ()=>{
        obj.msg = "登录失败"
        obj.code = -1
        res.json(obj)
        res.end();
    }
}