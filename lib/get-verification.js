exports.getVerificationCode = function(req, res, telcodemap) {
    var QcloudSms = require("qcloudsms_js");
    // 短信应用 SDK AppID
    var appid = 1400245942;  // SDK AppID 以1400开头
    // 短信应用 SDK AppKey
    var appkey = "35162c2a62629b67ff1011c2af5b90e8";
    // 需要发送短信的手机号码
    var phoneNumbers = req.query.phone;
    // 短信模板 ID，需要在短信控制台中申请
    var templateId = 400972;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
    // 签名
    var smsSign = "后端与智能算法记录";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
    // 实例化 QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);
    var ssender = qcloudsms.SmsSingleSender();

    // 随机验证码
    var code = Math.ceil(Math.random()*1000000);
    var params = [code, "1"];

    ssender.sendWithParam(86, phoneNumbers, templateId,
        params, smsSign, "", "", (err, resp, resData) =>{
            if (err) {
                console.log("err: ", err);
                res.json({msg:"发送失败", code:-1})
                res.end();   
            } else {
                telcodemap.set(phoneNumbers, code);
                setTimeout(() => {telcodemap.delete(phoneNumbers)}, 600000);
                res.json({msg:"发送成功,有效期十分钟", code:0})
                res.end();   
            }
        }); 
    // console.log(telcodemap.get(phoneNumbers));
}