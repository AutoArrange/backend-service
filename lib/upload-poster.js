const multiparty = require('multiparty');
const form = new multiparty.Form();
const fs = require('fs');
const MYSQL = require('./mysql.js');
mysql = new MYSQL();
let obj = {};
exports.uploadPoster = async(req, res) =>{
    function parseFile(req) {
        return new Promise((resolve) => {
            form.parse(req, async function(err, fields, files) {
                if (err) {
                    throw new Error('parseFile Error', err);
                }
                let token = await require('./parse-taken.js').parseTaken(fields.token[0])
                let title = fields.title[0];
                let file = files.file[0];
                resolve({token:token, title:title, file:file});
            });
        })
    }
    function addSeal(temp) {
        return new Promise((resolve) => {
            let Sql = 'INSERT INTO Seal(`DesignerId`,`ManagerId`,`Address`,`Title`, `Article`) VALUES(?,?,?,?,?)';
            let SqlParams=[temp.token.phone, temp.token.phone, __dirname, temp.title, null];
            mysql.anyUpdate(Sql,SqlParams, (ans)=>{
                if (ans == -1) throw new Error('addSeal Error');
                resolve(ans.insertId);
                // console.log(ans)
            })
        })
    }
    function writeFile(temp, id) {
        return new Promise((resolve) =>{
            const des_file = __dirname + "/../Seal/" + id + "/";
            fs.mkdir(des_file, {
                recursive: true  //是否递归,默认false
            }, (err) => {
                if(err){
                    throw new Error(err)
                }
                fs.readFile( temp.file.path, function (err, data) {
                    if (err) throw new Error(err)
                    fs.writeFile(des_file + temp.file.originalFilename, data, function (err) {
                        if(err) throw new Error(err)
                        resolve(des_file);
                    });
                });
            });
        })
    }
    try {
        temp = await parseFile(req)
        // console.log(temp);
        let id = await addSeal(temp);
        let des_file = await writeFile(temp, id);
        
        let Sql = 'update Seal set Address = ? where Id = ?';
        let SqlParams = [des_file + temp.file.originalFilename, id]
        mysql.anyUpdate(Sql,SqlParams, (ans)=>{
            if (ans == -1) throw new Error('addSeal Error');
            ok();
        })
    } catch(err) {
        console.log(err);
        filed();
    }
    filed = ()=>{
        obj.msg = "上传失败！"
        obj.code = -1
        res.json(obj)
        res.end();
    }
    ok = (id)=>{
        obj.msg = "上传成功！"
        obj.code = 200
        obj.id = id
        res.json(obj)
        res.end();
    }
}