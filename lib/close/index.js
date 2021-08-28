const { exec } = require('child_process');
const child_process = require('child_process');
const chalk = require('chalk');
const os = require('os');

module.exports = path => {
  switch (os.type()) {
    case 'Windows_NT':
      const windowChild = child_process.spawn('netstat', ['-ano', path]);
      windowChild.stdout.on('data', rst => {
        let data = rst.toString('utf-8', 0, rst.length);
        let port = null;
        data.split(/[\n|\r]/).forEach(item => {
          if (item.indexOf('LISTENING') !== -1 && item.indexOf(path) !== -1 && !port) {
            let reg = item.split(/\s+/);
            port = reg[reg.length - 1];
            console.log(port);
          }
        });
        if (!port) {
          console.log(chalk.yellow(`端口 ：${path} close!`));
          return;
        }
        exec(`taskkill -f /pid ${port}`, () => {
          console.log(chalk.blue(`关闭端口 ${path} 成功！`));
          return;
        });
      });
      break;
    case 'Linux':
      let linuxChild = child_process.spawn('lsof', ['-i', path]);
      linuxChild.stdout.on('data', rst => {
        let data = rst.toString('utf8', 0, rst.length);
        let port = null;
        data.split(/[\n|\r]/).forEach(item => {
          if (item.indexOf('LISTEN') !== -1 && !port) {
            let reg = item.split(/\s+/);
            if (/\d+/.test(reg[1])) {
              port = reg[1];
            }
          }
        });
        if (!port) {
          console.log(chalk.yellow(`端口 ：${path} close!`));
          return;
        }
        exec(`kill -9 ${port}`, () => {
          console.log(chalk.blue(`关闭端口 ${path} 成功！`));
        });
      });
      child.stderr.on('data', rst => {
        let data = rst.toString('utf8', 0, rst.length);
        console.log(data);
      });
      break;
  }
  setTimeout(() => {
    process.exit();
  }, 1000);

  // child.stderr.on('data', rst => {
  //   let data = rst.toString('utf8', 0, rst.length);
  //   console.log(data);
  // });
};
