exports.transferPrivilege = async(req, res) =>{
    try {
        let token = await require('./parse-taken.js').parseTaken(req.body.token);
        if (token == -1 || token == -2) throw new Error('Token Error')
        // 待补充
    } catch(err) {
        console.log(err);
        filed();
    }
    let obj = {}
    filed = ()=>{
        obj.msg = "发送失败！"
        obj.code = -1
        res.json(obj)
        res.end();
    }
    ok = (id)=>{
        obj.msg = "发送成功！"
        obj.code = 200
        obj.id = id
        res.json(obj)
        res.end();
    }
}