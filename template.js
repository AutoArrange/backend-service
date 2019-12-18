exports.transferPrivilege = async(req, res) =>{
    try {
        let token = await require('./parse-taken.js').parseTaken();
        if (token == -1 || token == -2) throw new Error('Token Error')
        let Sql = ''
        let SqlParams = [];
        mysql.anyUpdate(Sql,SqlParams, (ans)=>{
            if (ans == -1) throw new Error('_ Error');
            ok();
        })
    } catch(err) {
        console.log(err);
        filed();
    }
    let obj = {}
    filed = ()=>{
        obj.msg = "_失败！"
        obj.code = -1
        res.json(obj)
        res.end();
    }
    ok = (id)=>{
        obj.msg = "_成功！"
        obj.code = 200
        obj.id = id
        res.json(obj)
        res.end();
    }
}