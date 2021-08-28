const fs = require('fs');
const path = require('path');
const { promisify } = require("util");

// 删除注释
function removeComment(str) {
  const reg =
    /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;

  return str.replace(reg, function (s) {
    return /^\/{2,}/.test(s) || /^\/\*/.test(s) ? '' : s;
  });
}

// 同步创建文件
function mkDirSync(dirPath) {
  let parts = dirPath.split('/');
  for (let index = 0; index < parts.length; index++) {
    let current = parts.slice(0, index).join('/');
    try {
      fs.accessSync(current)
    } catch (err) {
      fs.mkdirSync(current)
    }
    cb && cb()
  }
}

const access = promisify(fs.access)
const mkdir = promisify(fs.mkdir)

// 异步创建文件
async function mkDir(dirPath, cb) {
  let parts = dirPath.split('/');
  for (let index = 0; index < parts.length; index++) {
    let current = parts.slice(0, index).join('/');
    try {
      await access(current)
    } catch (err) {
      await mkdir(current)
    }
    cb && cb()
  }
}

// 异步删除文件
function rmDir(dirPath, cb) {
  // 1 判断当前path类型
  fs.stat(dirPath, (err, data) => {
    // 目录-->继续读取
    if (data.isDirectory()) {
      fs.readdir(dirPath, (err, files) => {
        let dirs = files.map(item => {
          return path.join(dirPath, item);
        });
        let index = 0;

        function next() {
          if (index === dirs.length) return fs.rmdir(dirPath, cb);
          let current = dirs[index++];
          rmDir(current, next);
        }
        next();
      });
    } else {
      // 文件-->直接删除
      fs.unlink(dirPath, cb);
    }
  });
}

module.exports = {
  removeComment,
  rmDir,
  mkDir,
  mkDirSync
};