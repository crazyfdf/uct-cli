const path = require('path');
const { exec } = require('child_process');

module.exports = name => {
	try {
		// 解析文件路径
		// const filePath = path.join(__dirname, name);
		// console.log(filePath);
		// git克隆远程仓库地址
		const commend = `git clone https://github.com.cnpmjs.org/crazyfdf/uctui-hbuilder-cli.git ${name}`;
		exec(commend, (err, stdout, stderr) => {
			if (err) {
				console.log(stderr);
			} else {
				console.log(`${name}项目创建成功`);
			}
		});
	} catch (error) {
		next(error);
	}
};
