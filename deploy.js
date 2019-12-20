var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

console.log('Start deploying to server ...');

var config = {
    user: "time",
    password: "&l4bP65i",
    host: "sainapedia.ir",
    port: 21,
    localRoot: __dirname + "/public",
    remoteRoot: "/",
    include: ["*"],
    deleteRemote: false
};

ftpDeploy.deploy(config)
    .then(res => console.log("finished:", res.length))
    .catch(err => console.log(err));