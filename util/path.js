const path = require("path");
//console.log(path.dirname(process.cwd()));
module.exports = path.dirname(process.mainModule.filename);
