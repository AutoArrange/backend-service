exports.transferPrivilege = async(req, res) =>{
    try {
        let token = await require('./parse-taken.js').parseTaken(req.query.token);
        if (token == -1 || token == -2) throw new Error('Token Error')
        let idname;
        if (req.query.privilege == 'designer') idname = 'DesignerId'
        if (req.query.privilege == 'manager') idname = 'ManagerId'
        let Sql = 'update Seal set ' + idname + ' = ? where Id = ?';
        let SqlParams = [req.query.to, req.query.id];
        mysql.anyUpdate(Sql,SqlParams, (ans)=>{
            if (ans == -1) throw new Error('UpdateSeal Error');
            ok();
        })
    } catch(err) {
        console.log(err);
        filed();
    }
    let obj = {}
    filed = ()=>{
        obj.msg = "更改失败！"
        obj.code = -1
        res.json(obj)
        res.end();
    }
    ok = (id)=>{
        obj.msg = "更改成功！"
        obj.code = 200
        obj.id = id
        res.json(obj)
        res.end();
    }
}