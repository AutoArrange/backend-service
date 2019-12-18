const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MYSQL = require('./lib/mysql.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.listen(9102);

var telcodeMap = new Map();
mysql = new MYSQL();
mysql.connect();

process.on('SIGINT', () => {
    console.log('node exit');
    mysql.disconnect();
    process.exit(0);
});
app.get('/get-verification', async (req, res) => {
    const postCode = require('./lib/get-verification.js');
    postCode.getVerificationCode(req, res, telcodeMap);
})

app.post('/register', (req, res) => {
    const register = require('./lib/register.js').register;
    register(req, res, telcodeMap);
})

app.get('/login', (req, res) => {
    const login = require('./lib/login.js').login;
    login(req, res);
})

app.get('/change-password', (req, res) =>{
    const changePsd = require('./lib/change-password.js').changePsd;
    changePsd(req, res, telcodeMap);
})

app.post('/update-info', (req, res)=>{
    const updateInfo = require('./lib/update-info.js').updateInfo;
    updateInfo(req, res);
})
app.post('/upload-poster', (req, res)=>{
    const uploadPoster = require('./lib/upload-poster.js').uploadPoster;
    uploadPoster(req, res);
})
app.get('/transfer-privilege', (req, res)=>{
    const transferPrivilege = require('./lib/transfer-privilege.js').transferPrivilege;
    transferPrivilege(req, res);
})
app.post('/upload-notification', (req, res)=>{
    const uploadNotification = require('./lib/upload-notification.js').uploadNotification;
    uploadNotification(req, res);
})