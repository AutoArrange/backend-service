exports.updateInfo = async (req, res) =>{
    let obj = {}
    filed = ()=>{
        obj.msg = "修改失败！"
        obj.code = -1
        res.json(obj)
        res.end();
    }
    ok = ()=>{
        obj.msg = "修改成功！"
        obj.code = 200
        res.json(obj)
        res.end();
    }
    var parseTaken = require('./parse-taken.js').parseTaken(req.body.token);
    let token;
    await parseTaken.then((ans)=>{token = ans})
    // console.log(token)
    let Sql = "UPDATE User SET username = ?, description = ?, contact = ? WHERE phone = ?"
    let SqlParams = [req.body.info.username, req.body.info.description, JSON.stringify(req.body.info.contact), token.phone];
    mysql.anyUpdate(Sql, SqlParams, (ans)=>{
        if (ans == -1) {filed(); return;}
        ok();
    })
}