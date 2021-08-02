const chalk = require('chalk');
const { exec } = require('child_process');

module.exports = config => {
	// 脚手架创建的目录

	let commend = 'yarn plop';
	config.forEach(item => {
		commend += ` ${item}`;
	});
	exec(commend, (err, stdout, stderr) => {
		if (err) {
			console.log(stderr);
		} else {
			chalk.green(`${config[0]}命令执行完成`);
		}
	});
};
