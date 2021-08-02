const download = require('download-git-repo');
// 修改控制台字符串的样式
const chalk = require('chalk');
const ora = require('ora');
module.exports = (url, projectName) => {
	// 出现加载图标
	const spinner = ora('Downloading...');
	spinner.start();

	download(url, projectName, { clone: true }, err => {
		if (err) {
			spinner.fail();
			console.log(chalk.red(`创建失败. ${err}`));
			return;
		}
		// 结束加载图标
		spinner.succeed();
		console.log(chalk.green(' 创建完成!'));
		console.log(' To get started');
		console.log(`    cd ${projectName}`);
		console.log('    npm install');
	});
};
