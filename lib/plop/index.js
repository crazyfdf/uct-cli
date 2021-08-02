const chalk = require('chalk');
const { exec } = require('child_process');
const { Plop, run } = require('plop');
const path = require('path');

module.exports = config => {
	// 脚手架创建的目录
	Plop.launch(
		{
			configPath: path.resolve(__dirname, '../../plopfile.js'), // 当前依赖包文件路径下的plopfile.js文件
		},
		env => {
			const options = {
				...env,
				dest: process.cwd(), // this will make the destination path to be based on the cwd when calling the wrapper
			};
			console.log(env);
			return run(options, undefined, true);
		},
	);
	// let commend = 'yarn plop';
	// config.forEach(item => {
	// 	commend += ` ${item}`;
	// });
	// exec(commend, (err, stdout, stderr) => {
	// 	if (err) {
	// 		console.log(stderr);
	// 	} else {
	// 		chalk.green(`${config[0]}命令执行完成`);
	// 	}
	// });
};
