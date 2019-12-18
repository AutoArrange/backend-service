exports.register = async (req, res, telcodeMap) =>{
    let obj = {}
    // console.log(req.body);
    if (req.body.verification != telcodeMap.get(req.body.phone)) {
        obj.msg = "注册失败"
        obj.code = -1
        res.json(obj)
        res.end();
        return;
    }
    const MYSQL = require('./mysql.js');
    mysql = new MYSQL();
    let Sql = 'INSERT INTO User(`username`,`password`,`description`,`contact`,`phone`) VALUES(?,?,?,?,?)';
    let SqlParams=[req.body.username,req.body.password,req.body.description,JSON.stringify(req.body.contact),req.body.phone];
    mysql.anyUpdate(Sql,SqlParams, (ans)=>{
        if (ans == -1) {
            obj.msg = "注册失败"
            obj.code = -1
            res.json(obj)
            res.end();
            return;
        }
        obj.msg = "注册成功"
        obj.code = 200
        token = {
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone,
            time:new Date().getTime()
        }
        obj.token = require('./create-token').createToken(token);
        obj.info = req.body.info;
        res.json(obj);
        res.end();
    })
}