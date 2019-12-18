exports.changePsd = async (req, res, telcodeMap) =>{
    let obj = {}
    if (req.query.verification != telcodeMap.get(req.query.id)) {
        filed();
        return;
    }
    let Sql = "UPDATE User SET password = ? WHERE phone = ?"
    let SqlParams = [req.query.password, req.query.id]
    mysql.anyUpdate(Sql, SqlParams, (ans)=>{
        if (ans == -1) {filed(); return;}
        ok();
    })
    filed = ()=>{
        obj.msg = "修改密码失败！"
        obj.code = -1
        res.json(obj)
        res.end();
    }
    ok = ()=>{
        obj.msg = "修改密码成功！"
        obj.code = 200
        res.json(obj)
        res.end();
    }
}